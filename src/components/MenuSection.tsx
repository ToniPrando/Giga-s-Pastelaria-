import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Plus, 
  ShoppingBag, 
  Utensils, 
  ExternalLink,
  ChevronRight,
  Filter,
  CheckCircle,
  X
} from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS, STORE_INFO } from '../data/menuData';
import { handleImageError, resolveMenuItemImage } from '../utils/imageUtils';

interface MenuSectionProps {
  items?: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ 
  items,
  onSelectItem, 
  onQuickAdd,
  onOpenCart,
  cartCount
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [gigaOnly, setGigaOnly] = useState(false);

  const allItems = items && items.length > 0 ? items : MENU_ITEMS;

  const categories: { id: MenuCategory; label: string; icon: string }[] = [
    { id: 'todos', label: 'Todos os Itens', icon: '🍽️' },
    { id: 'mais-pedidos', label: 'Mais Pedidos', icon: '🔥' },
    { id: 'giga-especiais', label: 'Especiais & Giga', icon: '👑' },
    { id: 'tradicionais', label: 'Salgados Tradicionais', icon: '🥟' },
    { id: 'doces', label: 'Pastéis Doces', icon: '🍫' },
    { id: 'bebidas', label: 'Caldo de Cana & Bebidas', icon: '🥤' },
    { id: 'porcoes', label: 'Porções & Combos', icon: '🍟' },
  ];

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Check availability
      if (item.available === false) return false;

      // Category check
      if (selectedCategory === 'mais-pedidos') {
        if (!item.popular) return false;
      } else if (selectedCategory !== 'todos') {
        if (item.category !== selectedCategory) return false;
      }

      // Dietary & Type filters
      if (vegetarianOnly && !item.isVegetarian) return false;
      if (gigaOnly && !item.isGiga) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = (item.description || '').toLowerCase().includes(q);
        const matchesIng = (item.ingredients || []).some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }

      return true;
    });
  }, [allItems, selectedCategory, searchQuery, vegetarianOnly, gigaOnly]);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative" id="cardapio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider mb-3">
            <Utensils className="w-3.5 h-3.5 text-rose-600" />
            Cardápio Completo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Escolha seu Pastel Favorito
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Mais de 30 opções com massa sequinha, frita na hora e com recheio abundante. Peça pelo iFood ou WhatsApp!
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-slate-100 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por sabor ou ingrediente (ex: carne, queijo, catupiry, nutella, caldo de cana...)"
                className="w-full pl-11 pr-10 py-3 text-sm rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all text-slate-800"
                id="menu-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpar busca"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Toggle Filters */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setGigaOnly(!gigaOnly)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-tight whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  gigaOnly 
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                id="filter-giga-btn"
              >
                <span>👑 Giga 30cm</span>
              </button>

              <button
                type="button"
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-tight whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  vegetarianOnly 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                id="filter-vegetarian-btn"
              >
                <span>🌿 Vegetarianos</span>
              </button>
            </div>
          </div>

          {/* Category Navigation Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-slate-100" id="category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-200 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
                id={`category-tab-${cat.id}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            Exibindo <span className="text-slate-900 font-bold">{filteredItems.length}</span> {filteredItems.length === 1 ? 'item' : 'opções'}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Frito na hora</span>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-items-grid">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 ${
                  item.popular 
                    ? 'border-2 border-rose-500' 
                    : 'border border-slate-100'
                }`}
                id={`menu-card-${item.id}`}
              >
                {/* Card Image Area */}
                <div 
                  className="relative h-48 bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={resolveMenuItemImage(item.image, item.category, item.id)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, item.category)}
                  />

                  {/* Gradient bottom shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Badge tags */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {item.badge && (
                      <span className="bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md">
                        {item.badge}
                      </span>
                    )}
                    {item.sizeLabel && (
                      <span className="bg-amber-400 text-rose-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {item.sizeLabel}
                      </span>
                    )}
                  </div>

                  {/* Vegetarian badge */}
                  {item.isVegetarian && (
                    <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                      🌿 Veggie
                    </span>
                  )}

                  {/* Price Tag in Image */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-xl shadow-md border border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 mr-1">R$</span>
                    <span className="text-base font-black text-rose-600 font-heading">
                      {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="font-bold text-slate-900 font-heading text-lg leading-snug group-hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Ingredients summary pills */}
                    {item.ingredients && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.ingredients.slice(0, 3).map((ing, idx) => (
                          <span 
                            key={idx} 
                            className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-md border border-slate-200/50"
                          >
                            {ing}
                          </span>
                        ))}
                        {item.ingredients.length > 3 && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-semibold">
                            +{item.ingredients.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Action CTAs */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectItem(item)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      id={`btn-customize-${item.id}`}
                    >
                      <span>Ver Detalhes</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onQuickAdd(item)}
                      className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-rose-200 active:scale-95 cursor-pointer"
                      aria-label={`Adicionar ${item.name} à sacola`}
                      id={`btn-add-${item.id}`}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Pedir</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 max-w-lg mx-auto shadow-sm">
            <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-slate-800 font-heading">Nenhum item encontrado</h3>
            <p className="text-sm text-slate-500 mt-1">Tente pesquisar com outro termo ou limpe os filtros de busca.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
                setVegetarianOnly(false);
                setGigaOnly(false);
              }}
              className="mt-4 px-5 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Quick bottom floating bar if cart has items */}
        {cartCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4 animate-in slide-in-from-bottom-6 duration-300">
            <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                  {cartCount}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Sacola de Pedidos</p>
                  <p className="text-sm font-bold text-white">Itens selecionados</p>
                </div>
              </div>

              <button
                onClick={onOpenCart}
                className="bg-amber-400 hover:bg-amber-300 text-rose-950 px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-colors shadow-md"
                id="floating-cart-view-btn"
              >
                <span>Finalizar Pedido</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
