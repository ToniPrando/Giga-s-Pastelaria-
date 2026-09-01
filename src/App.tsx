import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BenefitsBar } from './components/BenefitsBar';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ItemModal } from './components/ItemModal';
import { CartDrawer } from './components/CartDrawer';
import { SingleHtmlExportModal } from './components/SingleHtmlExportModal';
import { AdminManagerModal } from './components/AdminManagerModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { MenuItem, CartItem, CartExtra } from './types';
import { MENU_ITEMS as DEFAULT_MENU_ITEMS } from './data/menuData';
import { subscribeToMenuItems } from './services/menuService';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gigas_pastelaria_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAuthenticatedAdmin, setIsAuthenticatedAdmin] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenAdmin = () => {
    if (isAuthenticatedAdmin) {
      setIsAdminModalOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAuthenticatedAdmin(true);
    setIsAdminModalOpen(true);
    showToast('Login de Administrador realizado com sucesso!');
  };

  // Subscribe to real-time menu items from Firestore
  useEffect(() => {
    const unsubscribe = subscribeToMenuItems((items) => {
      if (items && items.length > 0) {
        setMenuItems(items);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gigas_pastelaria_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const existingIndex = cartItems.findIndex(
      ci => ci.item.id === item.id && ci.extras.length === 0 && !ci.notes
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].totalPrice = updated[existingIndex].quantity * item.price;
      setCartItems(updated);
    } else {
      setCartItems(prev => [
        ...prev,
        {
          item,
          quantity: 1,
          extras: [],
          notes: '',
          totalPrice: item.price
        }
      ]);
    }
    showToast(`Adicionado: ${item.name}`);
  };

  const handleCustomAddToCart = (
    item: MenuItem, 
    quantity: number, 
    extras: CartExtra[], 
    notes: string
  ) => {
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
    const unitPrice = item.price + extrasTotal;
    const totalPrice = unitPrice * quantity;

    setCartItems(prev => [
      ...prev,
      {
        item,
        quantity,
        extras,
        notes,
        totalPrice
      }
    ]);
    showToast(`${quantity}x ${item.name} adicionado à sacola!`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems(prev => {
      const updated = [...prev];
      const item = updated[index];
      const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
      const unitPrice = item.item.price + extrasTotal;
      item.quantity = newQty;
      item.totalPrice = unitPrice * newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  const scrollToMenu = () => {
    const menuEl = document.getElementById('cardapio');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-rose-500 selection:text-white relative">
      {/* Toast notification */}
      {toastMessage && (
        <div 
          className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 animate-in fade-in slide-in-from-top-3 duration-200"
          id="toast-notification"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header 
        onOpenCodeExport={() => setIsExportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero 
          onScrollToMenu={scrollToMenu}
          onOpenCart={() => setIsCartOpen(true)}
        />
        <BenefitsBar />
        <MenuSection 
          items={menuItems}
          onSelectItem={(item) => setSelectedItemForModal(item)}
          onQuickAdd={handleQuickAdd}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalCartCount}
        />
        <AboutSection />
        <TestimonialsSection />
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenCodeExport={() => setIsExportModalOpen(true)} 
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Item Customization Modal */}
      <ItemModal 
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleCustomAddToCart}
      />

      {/* Shopping Bag / WhatsApp Order Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* HTML Single-File Code Export Modal */}
      <SingleHtmlExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Admin Login Modal (Protection Gate) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Real-time Firebase Firestore Admin Manager Modal */}
      <AdminManagerModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setIsAuthenticatedAdmin(false); // require login on each fresh opening for strict security
        }}
        items={menuItems}
        onShowToast={showToast}
      />
    </div>
  );
}
