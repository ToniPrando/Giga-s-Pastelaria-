import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  X, 
  Utensils, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  Sparkles, 
  Layers,
  LayoutGrid
} from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { handleImageError, resolveMenuItemImage } from '../utils/imageUtils';

interface MenuSectionProps {
  items?: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

interface CategorySectionDef {
  id: MenuCategory;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
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
  const [viewMode, setViewMode] = useState<'full' | 'grid'>('full');

  const categoryBarRef = useRef<HTMLDivElement>(null);
  const [canScrollCatLeft, setCanScrollCatLeft] = useState(false);
  const [canScrollCatRight, setCanScrollCatRight] = useState(false);

  const allItems = items && items.length > 0 ? items : MENU_ITEMS;

  const categories: { id: MenuCategory; label: string; icon: string }[] = [
    { id: 'todos', label: 'Cardápio Completo', icon: '📑' },
    { id: 'mais-pedidos', label: 'Mais Pedidos', icon: '🔥' },
    { id: 'giga-especiais', label: 'Giga 30cm', icon: '👑' },
    { id: 'tradicionais', label: 'Tradicionais', icon: '🥟' },
    { id: 'doces', label: 'Doces', icon: '🍫' },
    { id: 'bebidas', label: 'Caldo & Bebidas', icon: '🥤' },
    { id: 'porcoes', label: 'Porções & Combos', icon: '🍟' },
  ];

  const sectionDefinitions: CategorySectionDef[] = [
    {
      id: 'giga-especiais',
      title: 'Pastéis Especiais & Giga (30cm)',
      subtitle: 'Nossos famosos pastéis gigantes de 30cm, recheio generoso de ponta a ponta e combinações consagradas.',
      icon: '👑',
      badge: '30cm de Puro Sabor'
    },
    {
      id: 'tradicionais',
      title: 'Pastéis Salgados Tradicionais (22cm)',
      subtitle: 'Massa fininha e sequinha frita na hora, recheada com ingredientes de primeira qualidade selecionados.',
      icon: '🥟',
      badge: 'Massa Artesanal'
    },
    {
      id: 'doces',
      title: 'Pastéis Doces & Sobremesas',
      subtitle: 'Recheios fartos de Nutella pura, chocolates especiais, banana com canela e muito mais.',
      icon: '🍫',
      badge: 'Sobremesa Irresistível'
    },
    {
      id: 'bebidas',
      title: 'Caldo de Cana & Bebidas Geladas',
      subtitle: 'Caldo de cana fresquinho moído na hora (com limão ou abacaxi), sucos naturais e refrigerantes.',
      icon: '🥤',
      badge: 'Moído na Hora'
    },
    {
      id: 'porcoes',
      title: 'Porções & Combos para Compartilhar',
      subtitle: 'Mini pastéis sequinhos e combos ideais para dividir com a família ou amigos.',
      icon: '🍟',
      badge: 'Para Compartilhar'
    },
  ];

  const checkCategoryScroll = () => {
    const el = categoryBarRef.current;
    if (!el) return;
    setCanScrollCatLeft(el.scrollLeft > 4);
    setCanScrollCatRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = categoryBarRef.current;
    if (!el) return;
    checkCategoryScroll();
    el.addEventListener('scroll', checkCategoryScroll, { passive: true });
    window.addEventListener('resize', checkCategoryScroll);
    return () => {
      el.removeEventListener('scroll', checkCategoryScroll);
      window.removeEventListener('resize', checkCategoryScroll);
    };
  }, []);

  const scrollCategory = (direction: 'left' | 'right') => {
    if (!categoryBarRef.current) return;
    const delta = direction === 'left' ? -220 : 220;
    categoryBarRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (item.available === false) return false;

      if (selectedCategory === 'mais-pedidos') {
        if (!item.popular) return false;
      } else if (selectedCategory !== 'todos') {
        if (item.category !== selectedCategory) return false;
      }

      if (vegetarianOnly && !item.isVegetarian) return false;
      if (gigaOnly && !item.isGiga) return false;

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

  const handleCategorySelect = (catId: MenuCategory) => {
    setSelectedCategory(catId);

    if (catId === 'todos') {
      setViewMode('full');
      const menuEl = document.getElementById('cardapio');
      if (menuEl) {
        menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (viewMode === 'full') {
      const sectionEl = document.getElementById(`secao-${catId}`);
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        setViewMode('grid');
      }
    }
  };

  const isSearchOrFilterActive = searchQuery.trim() !== '' || vegetarianOnly || gigaOnly;

  // Render item card with full uncropped photo and full descriptions
  const renderItemCard = (item: MenuItem) => (
    <div
      key={item.id}
      className={`bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 ${
        item.popular 
          ? 'border-2 border-rose-500' 
          : 'border border-slate-200/80'
      }`}
      id={`menu-card-${item.id}`}
    >
      {/* Card Image Area: 100% visible without cropping */}
      <div 
        className="relative h-52 sm:h-56 bg-slate-900/5 overflow-hidden cursor-pointer flex items-center justify-center group"
        onClick={() => onSelectItem(item)}
      >
        <img
          src={resolveMenuItemImage(item.image, item.category, item.id)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-125 pointer-events-none select-none"
          referrerPolicy="no-referrer"
        />

        <img
          src={resolveMenuItemImage(item.image, item.category, item.id)}
          alt={item.name}
          className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain p-3 group-hover:scale-105 transition-transform duration-300 drop-shadow-md select-none"
          referrerPolicy="no-referrer"
          onError={(e) => handleImageError(e, item.category)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none z-10" />

        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-20">
          {item.badge && (
            <span className="bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md">
              {item.badge}
            </span>
          )}
          {item.sizeLabel && (
            <span className="bg-amber-400 text-rose-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider font-bold">
              {item.sizeLabel}
            </span>
          )}
        </div>

        {item.isVegetarian && (
          <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md z-20">
            🌿 Veggie
          </span>
        )}

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-xl shadow-md border border-slate-100 z-20">
          <span className="text-xs font-semibold text-slate-500 mr-1">R$</span>
          <span className="text-base font-black text-rose-600 font-heading">
            {item.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 
            onClick={() => onSelectItem(item)}
            className="font-bold text-slate-900 font-heading text-lg leading-snug group-hover:text-rose-600 transition-colors cursor-pointer"
          >
            {item.name}
          </h3>
          
          <p className="text-xs text-slate-600 mt-2 leading-relaxed font-normal">
            {item.description}
          </p>

          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {item.ingredients.map((ing, idx) => (
                <span 
                  key={idx} 
                  className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded-md border border-slate-200/60"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>

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
  );

  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative" id="cardapio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider mb-3">
            <Utensils className="w-3.5 h-3.5 text-rose-600" />
            Cardápio Completo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Cardápio Oficial da Giga's
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Mais de 30 opções com massa sequinha, frita na hora e com recheio abundante de ponta a ponta.
          </p>
        </div>

        {/* Search, Filter Bar & Controls */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-slate-200/80 mb-8 space-y-4">
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Toggle Filters & View Mode */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setGigaOnly(!gigaOnly)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-tight whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
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
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-tight whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
                  vegetarianOnly 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                id="filter-vegetarian-btn"
              >
                <span>🌿 Vegetarianos</span>
              </button>

              <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('full');
                    setSelectedCategory('todos');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'full' && !isSearchOrFilterActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Exibir cardápio completo organizado por categorias"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Por Seções</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'grid' || isSearchOrFilterActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Exibir em grade"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grade</span>
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              CATEGORY BUTTONS BAR WITH DEDICATED SCROLLBAR & COMPACT ADJUSTED FONT
              ========================================================================= */}
          <div className="pt-2 border-t border-slate-100 relative">
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Optional scroll arrow left for smaller viewports */}
              {canScrollCatLeft && (
                <button
                  type="button"
                  onClick={() => scrollCategory('left')}
                  aria-label="Rolar botões para a esquerda"
                  className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-xs shrink-0 cursor-pointer transition-colors"
                  id="cat-scroll-left-btn"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {/* Scrollable buttons container with visible, dedicated scrollbar */}
              <div 
                ref={categoryBarRef}
                className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto category-buttons-scrollbar pb-2.5 pt-1 px-0.5 flex-1 scroll-smooth"
                id="category-pills"
              >
                {categories.map((cat) => {
                  const isActive = (viewMode === 'full' && selectedCategory === cat.id) || 
                                   (viewMode === 'grid' && selectedCategory === cat.id);

                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs md:text-sm font-semibold sm:font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-200 scale-[1.02]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      id={`category-tab-${cat.id}`}
                    >
                      <span className="text-sm sm:text-base leading-none">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Optional scroll arrow right for smaller viewports */}
              {canScrollCatRight && (
                <button
                  type="button"
                  onClick={() => scrollCategory('right')}
                  aria-label="Rolar botões para a direita"
                  className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 shadow-xs shrink-0 cursor-pointer transition-colors"
                  id="cat-scroll-right-btn"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter & Overview Strip */}
        <div className="flex items-center justify-between mb-8 px-1">
          <div className="flex items-center gap-3">
            <p className="text-xs sm:text-sm font-bold text-slate-700">
              {isSearchOrFilterActive ? (
                <>Encontrados <span className="text-rose-600">{filteredItems.length}</span> itens correspondentes</>
              ) : viewMode === 'full' ? (
                <>Cardápio Completo • <span className="text-slate-900">{allItems.length} opções artesanais</span></>
              ) : (
                <>Exibindo <span className="text-slate-900">{filteredItems.length}</span> opções</>
              )}
            </p>

            {isSearchOrFilterActive && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVegetarianOnly(false);
                  setGigaOnly(false);
                  setSelectedCategory('todos');
                  setViewMode('full');
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 underline cursor-pointer"
              >
                Ver Cardápio Completo
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Frito na hora
            </span>
            <span className="hidden sm:flex items-center gap-1 text-amber-600 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Massa Artesanal
            </span>
          </div>
        </div>

        {/* MAIN MENU DISPLAY */}
        {filteredItems.length === 0 ? (
          /* Empty search state */
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
                setViewMode('full');
              }}
              className="mt-4 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
            >
              Exibir Todo o Cardápio
            </button>
          </div>
        ) : viewMode === 'full' && !isSearchOrFilterActive && selectedCategory === 'todos' ? (
          /* FULL MENU BY CATEGORIES */
          <div className="space-y-16" id="menu-full-sections">
            {sectionDefinitions.map((sec) => {
              const secItems = allItems.filter((item) => {
                if (item.available === false) return false;
                return item.category === sec.id;
              });

              if (secItems.length === 0) return null;

              return (
                <div key={sec.id} id={`secao-${sec.id}`} className="scroll-mt-28">
                  {/* Section Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-6 border-b-2 border-slate-200">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-2xl sm:text-3xl">{sec.icon}</span>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                          {sec.title}
                        </h3>
                        <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2.5 py-0.5 rounded-full">
                          {secItems.length} {secItems.length === 1 ? 'opção' : 'opções'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
                        {sec.subtitle}
                      </p>
                    </div>

                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider hidden sm:block bg-slate-100 px-3 py-1 rounded-full">
                      {sec.badge}
                    </span>
                  </div>

                  {/* Section Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {secItems.map(renderItemCard)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* FILTERED OR ISOLATED CATEGORY GRID */
          <div>
            {selectedCategory !== 'todos' && !isSearchOrFilterActive && (
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-lg">
                    {categories.find(c => c.id === selectedCategory)?.icon}
                  </span>
                  Categoria: {categories.find(c => c.id === selectedCategory)?.label}
                </span>

                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    setViewMode('full');
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas as seções</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-items-grid">
              {filteredItems.map(renderItemCard)}
            </div>
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
                className="bg-amber-400 hover:bg-amber-300 text-rose-950 px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
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
