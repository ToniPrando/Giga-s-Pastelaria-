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

const COLLECTION_NAME = 'menuItems';

/**
 * Listen to real-time updates for all menu items
 */
export function subscribeToMenuItems(
  onSuccess: (items: MenuItem[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const menuCollection = collection(db, COLLECTION_NAME);

    const unsubscribe = onSnapshot(
      menuCollection,
      (snapshot) => {
        if (snapshot.empty) {
          // If empty, return default items and trigger auto-seed in background
          onSuccess(DEFAULT_MENU_ITEMS);
          seedInitialMenuIfEmpty();
          return;
        }

        const items: MenuItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          items.push({
            id: docSnap.id,
            name: data.name || '',
            category: data.category || 'tradicionais',
            price: typeof data.price === 'number' ? data.price : parseFloat(data.price) || 0,
            description: data.description || '',
            ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
            image: data.image || '',
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
        onSuccess(items);
      },
      (error) => {
        console.warn('Firestore subscription warning, fallback to default:', error);
        onSuccess(DEFAULT_MENU_ITEMS);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error('Error initializing menu subscription:', err);
    onSuccess(DEFAULT_MENU_ITEMS);
    return () => {};
  }
}

/**
 * Add a new item to Firestore
 */
export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<string> {
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
}

/**
 * Update an existing menu item
 */
export async function updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<void> {
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
}

/**
 * Delete a menu item from Firestore
 */
export async function deleteMenuItem(id: string): Promise<void> {
  const itemDocRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(itemDocRef);
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
  } catch (err) {
    console.error('Error seeding initial menu:', err);
    return false;
  }
}

/**
 * Reset and reload all default items
 */
export async function resetToDefaultMenu(): Promise<void> {
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
}
