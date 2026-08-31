import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Clock, 
  MapPin, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Logo } from './Logo';
import { STORE_INFO } from '../data/menuData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenCodeExport?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onOpenCart,
  onOpenCodeExport,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Cardápio', href: '#cardapio' },
    { name: 'Mais Pedidos', href: '#destaques' },
    { name: 'Sobre Nós', href: '#sobre' },
    { name: 'Avaliações', href: '#avaliacoes' },
    { name: 'Localização', href: '#contato' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300" id="main-header">
      {/* Top announcement bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Aberto Hoje • 18:00 às 23:30
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              {STORE_INFO.city}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-xs font-medium">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-bold bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700 hover:border-amber-400/50"
                id="header-top-admin-btn"
              >
                <span>⚙️ Gerenciar Cardápio</span>
              </button>
            )}
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a 
              href={STORE_INFO.instagramUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors hidden sm:flex items-center gap-1 text-slate-300"
              id="header-top-instagram-link"
            >
              <span>{STORE_INFO.instagramHandle}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20na%20Giga's%20Pastelaria`} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold flex items-center gap-1"
              id="header-top-whatsapp-link"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Delivery
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50 py-2.5 border-b border-slate-100' 
            : 'bg-white py-3.5 shadow-xs'
        }`}
        aria-label="Menu Principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="focus:outline-none focus:ring-2 focus:ring-rose-500 rounded-2xl" id="nav-brand-link">
            <Logo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-rose-600 font-bold text-sm transition-colors py-1 relative group"
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Management Button (Desktop) */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-200"
                title="Cadastrar e editar pastéis, fotos e preços no banco de dados"
                id="header-admin-menu-btn"
              >
                <span>⚙️ Gerenciar</span>
              </button>
            )}

            {/* iFood Button */}
            <a
              href={STORE_INFO.ifoodUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-rose-200 transition-all active:scale-95 select-none"
              id="header-ifood-cta-button"
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping"></span>
              <span className="font-extrabold tracking-tight">Peça pelo iFood</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="Ver sacola de pedidos"
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 shadow-xs"
              id="header-cart-toggle-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-rose-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-slate-800">Sacola</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden focus:outline-none"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-x-0 top-[102px] bg-white border-b border-slate-200 shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
          id="mobile-nav-drawer"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-slate-800 font-bold text-base py-2.5 px-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors"
                id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-full font-bold text-sm shadow-md hover:bg-slate-800"
                id="mobile-drawer-admin-btn"
              >
                <span>⚙️ Gerenciar Cardápio (Banco de Dados)</span>
              </button>
            )}

            <a
              href={STORE_INFO.ifoodUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-full font-black text-sm shadow-lg shadow-rose-200"
              id="mobile-drawer-ifood-btn"
            >
              <ExternalLink className="w-4 h-4" />
              Pedir pelo iFood Oficial
            </a>

            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20pedir%20um%20pastel%20na%20Giga's%20Pastelaria`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-full font-bold text-sm shadow-md hover:bg-emerald-700"
              id="mobile-drawer-whatsapp-btn"
            >
              <Phone className="w-4 h-4" />
              Chamar no WhatsApp Delivery
            </a>

            {onOpenCodeExport && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCodeExport();
                }}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-1"
                id="mobile-drawer-export-html-btn"
              >
                Exportar Código HTML Único
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
