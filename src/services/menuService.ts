import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MenuItem } from '../types';
import { MENU_ITEMS as DEFAULT_MENU_ITEMS } from '../data/menuData';
import { resolveMenuItemImage } from '../utils/imageUtils';

const COLLECTION_NAME = 'menuItems';
const LOCAL_STORAGE_CACHE_KEY = 'gigas_pastelaria_menu_cache';

let isQuotaExceeded = false;
let quotaListeners: ((isExceeded: boolean) => void)[] = [];

export function getQuotaStatus(): boolean {
  return isQuotaExceeded;
}

export function subscribeToQuotaStatus(listener: (isExceeded: boolean) => void): () => void {
  quotaListeners.push(listener);
  listener(isQuotaExceeded);
  return () => {
    quotaListeners = quotaListeners.filter(l => l !== listener);
  };
}

function setQuotaExceededState(exceeded: boolean) {
  if (isQuotaExceeded !== exceeded) {
    isQuotaExceeded = exceeded;
    quotaListeners.forEach(fn => fn(isQuotaExceeded));
  }
}

/**
 * Get items from localStorage cache or default items
 */
export function getCachedMenuItems(): MenuItem[] {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(item => ({
          ...item,
          image: resolveMenuItemImage(item.image, item.category, item.id)
        }));
      }
    }
  } catch (e) {
    console.warn('Could not read menu cache:', e);
  }
  return DEFAULT_MENU_ITEMS;
}

/**
 * Save items to localStorage cache
 */
export function saveCachedMenuItems(items: MenuItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_CACHE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Could not write to menu cache:', e);
  }
}

/**
 * Listen to real-time updates for all menu items with automatic quota and offline fallback
 */
export function subscribeToMenuItems(
  onSuccess: (items: MenuItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  // Immediately provide cached data for instantaneous render
  const initialCache = getCachedMenuItems();
  onSuccess(initialCache);

  try {
    const menuCollection = collection(db, COLLECTION_NAME);

    const unsubscribe = onSnapshot(
      menuCollection,
      (snapshot) => {
        setQuotaExceededState(false);

        if (snapshot.empty) {
          onSuccess(initialCache);
          return;
        }

        const items: MenuItem[] = [];

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const rawImage = data.image || '';
          const resolvedImg = resolveMenuItemImage(rawImage, data.category, docSnap.id);

          items.push({
            id: docSnap.id,
            name: data.name || '',
            category: data.category || 'tradicionais',
            price: typeof data.price === 'number' ? data.price : parseFloat(data.price) || 0,
            description: data.description || '',
            ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
            image: resolvedImg,
            popular: Boolean(data.popular),
            isGiga: Boolean(data.isGiga),
            isSweet: Boolean(data.isSweet),
            isVegetarian: Boolean(data.isVegetarian),
            sizeLabel: data.sizeLabel || '',
            badge: data.badge || '',
            available: data.available !== false, // default to true
            orderIndex: typeof data.orderIndex === 'number' ? data.orderIndex : 0
          });
        });

        // Sort by orderIndex, then name
        items.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
        
        saveCachedMenuItems(items);
        onSuccess(items);
      },
      (error) => {
        const errorMsg = error?.message || String(error);
        if (errorMsg.includes('resource-exhausted') || errorMsg.includes('Quota exceeded')) {
          setQuotaExceededState(true);
          console.warn('Firestore Quota reached: serving from resilient local cache.');
        } else {
          console.warn('Firestore subscription fallback to cache:', error);
        }

        // Seamless fallback to cached items
        onSuccess(getCachedMenuItems());
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (err: any) {
    console.error('Error initializing menu subscription:', err);
    onSuccess(getCachedMenuItems());
    return () => {};
  }
}

/**
 * Check if the Firestore database is connected and working
 */
export async function checkDatabaseHealth(): Promise<{ status: 'connected' | 'quota-exceeded' | 'error'; count: number; error?: string }> {
  try {
    const menuCollection = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(menuCollection);
    setQuotaExceededState(false);
    return {
      status: 'connected',
      count: snapshot.size
    };
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('resource-exhausted') || msg.includes('Quota exceeded')) {
      setQuotaExceededState(true);
      return {
        status: 'quota-exceeded',
        count: getCachedMenuItems().length,
        error: 'A cota diária gratuita do Firebase foi atingida. Ela será reiniciada automaticamente.'
      };
    }
    return {
      status: 'error',
      count: getCachedMenuItems().length,
      error: msg
    };
  }
}

/**
 * Add a new item to Firestore (with optimistic local cache update)
 */
export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<string> {
  const tempId = 'item_' + Date.now();
  const newItem: MenuItem = {
    ...item,
    id: tempId,
    available: item.available !== false,
    orderIndex: item.orderIndex ?? Date.now()
  };

  // Optimistic local update
  const current = getCachedMenuItems();
  saveCachedMenuItems([...current, newItem]);

  try {
    const menuCollection = collection(db, COLLECTION_NAME);
    const newDocRef = doc(menuCollection);
    
    const newItemData = {
      ...item,
      available: item.available !== false,
      orderIndex: item.orderIndex ?? Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    await setDoc(newDocRef, newItemData);
    return newDocRef.id;
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('resource-exhausted') || msg.includes('Quota exceeded')) {
      setQuotaExceededState(true);
      console.warn('Item saved locally due to Firestore daily quota limit.');
      return tempId;
    }
    throw err;
  }
}

/**
 * Update an existing menu item (with optimistic local cache update)
 */
export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<void> {
  // Optimistic local update
  const current = getCachedMenuItems();
  const updated = current.map(item => item.id === id ? { ...item, ...updates } : item);
  saveCachedMenuItems(updated);

  try {
    const itemDocRef = doc(db, COLLECTION_NAME, id);
    const dataToUpdate: Record<string, any> = {
      ...updates,
      updatedAt: Date.now()
    };
    
    // Clean undefined values
    Object.keys(dataToUpdate).forEach(key => {
      if (dataToUpdate[key] === undefined) {
        delete dataToUpdate[key];
      }
    });

    await updateDoc(itemDocRef, dataToUpdate);
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('resource-exhausted') || msg.includes('Quota exceeded')) {
      setQuotaExceededState(true);
      console.warn('Item update saved locally due to Firestore daily quota limit.');
      return;
    }
    throw err;
  }
}

/**
 * Delete a menu item from Firestore (with optimistic local cache update)
 */
export async function deleteMenuItem(id: string): Promise<void> {
  // Optimistic local update
  const current = getCachedMenuItems();
  saveCachedMenuItems(current.filter(item => item.id !== id));

  try {
    const itemDocRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(itemDocRef);
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('resource-exhausted') || msg.includes('Quota exceeded')) {
      setQuotaExceededState(true);
      console.warn('Item deletion saved locally due to Firestore daily quota limit.');
      return;
    }
    throw err;
  }
}

/**
 * Toggle item availability
 */
export async function toggleItemAvailability(id: string, currentStatus: boolean = true): Promise<void> {
  await updateMenuItem(id, { available: !currentStatus });
}

/**
 * Seed initial default items into Firestore if collection is empty
 */
export async function seedInitialMenuIfEmpty(): Promise<boolean> {
  try {
    const menuCollection = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(menuCollection);
    
    if (snapshot.empty) {
      const batch = writeBatch(db);
      DEFAULT_MENU_ITEMS.forEach((item, index) => {
        const itemDoc = doc(db, COLLECTION_NAME, item.id);
        batch.set(itemDoc, {
          ...item,
          available: true,
          orderIndex: index + 1,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      });
      await batch.commit();
      return true;
    }
    return false;
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('resource-exhausted') || msg.includes('Quota exceeded')) {
      setQuotaExceededState(true);
    }
    console.warn('Seeding skipped or throttled:', err);
    return false;
  }
}

/**
 * Reset and reload all default items
 */
export async function resetToDefaultMenu(): Promise<void> {
  // Local reset immediately
  saveCachedMenuItems(DEFAULT_MENU_ITEMS);

  try {
    const menuCollection = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(menuCollection);
    const batch = writeBatch(db);

    // Delete current
    snapshot.docs.forEach((d) => {
      batch.delete(d.ref);
    });

    // Re-populate defaults
    DEFAULT_MENU_ITEMS.forEach((item, index) => {
      const itemDoc = doc(db, COLLECTION_NAME, item.id);
      batch.set(itemDoc, {
        ...item,
        available: true,
        orderIndex: index + 1,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    });

    await batch.commit();
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('resource-exhausted') || msg.includes('Quota exceeded')) {
      setQuotaExceededState(true);
      console.warn('Reset applied to local storage due to quota.');
      return;
    }
    throw err;
  }
}
