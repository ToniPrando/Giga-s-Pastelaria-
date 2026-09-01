import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  RotateCcw, 
  Search, 
  Flame, 
  Eye, 
  EyeOff, 
  Sparkles,
  Database,
  Tag,
  DollarSign,
  Layers,
  Image as ImageIcon,
  Save,
  AlertTriangle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { MenuItem, MenuCategory } from '../types';
import { 
  addMenuItem, 
  updateMenuItem, 
  deleteMenuItem, 
  toggleItemAvailability,
  resetToDefaultMenu 
} from '../services/menuService';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  onShowToast: (msg: string) => void;
}

const CATEGORIES: { id: MenuCategory; label: string; icon: string }[] = [
  { id: 'giga-especiais', label: 'Especiais & Giga', icon: '👑' },
  { id: 'tradicionais', label: 'Salgados Tradicionais', icon: '🥟' },
  { id: 'doces', label: 'Pastéis Doces', icon: '🍫' },
  { id: 'bebidas', label: 'Caldo de Cana & Bebidas', icon: '🥤' },
  { id: 'porcoes', label: 'Porções & Combos', icon: '🍟' },
];

const PRESET_SAMPLE_IMAGES = [
  { label: 'Pastel Giga Dourado', url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pastel de Carne & Queijo', url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80' },
  { label: 'Pastel Doce / Chocolate', url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Caldo de Cana Gelado', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Porção de Mini Pastéis', url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80' }
];

export const AdminManagerModal: React.FC<AdminManagerModalProps> = ({
  isOpen,
  onClose,
  items,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'form'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('todos');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    category: MenuCategory;
    price: string;
    description: string;
    ingredientsText: string;
    image: string;
    popular: boolean;
    isGiga: boolean;
    isSweet: boolean;
    isVegetarian: boolean;
    sizeLabel: string;
    badge: string;
    available: boolean;
  }>({
    name: '',
    category: 'tradicionais',
    price: '',
    description: '',
    ingredientsText: '',
    image: '',
    popular: false,
    isGiga: false,
    isSweet: false,
    isVegetarian: false,
    sizeLabel: '',
    badge: '',
    available: true
  });

  if (!isOpen) return null;

  const handleOpenAddForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'tradicionais',
      price: '',
      description: '',
      ingredientsText: '',
      image: '',
      popular: false,
      isGiga: false,
      isSweet: false,
      isVegetarian: false,
      sizeLabel: '22cm',
      badge: '',
      available: true
    });
    setActiveTab('form');
  };

  const handleOpenEditForm = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description || '',
      ingredientsText: (item.ingredients || []).join(', '),
      image: item.image || '',
      popular: Boolean(item.popular),
      isGiga: Boolean(item.isGiga),
      isSweet: Boolean(item.isSweet),
      isVegetarian: Boolean(item.isVegetarian),
      sizeLabel: item.sizeLabel || '',
      badge: item.badge || '',
      available: item.available !== false
    });
    setActiveTab('form');
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, informe o nome do pastel/item.');
      return;
    }
    const numPrice = parseFloat(formData.price.replace(',', '.'));
    if (isNaN(numPrice) || numPrice < 0) {
      alert('Por favor, informe um preço válido.');
      return;
    }

    setIsSaving(true);
    try {
      const ingredientsArray = formData.ingredientsText
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);

      const itemPayload: Omit<MenuItem, 'id'> = {
        name: formData.name.trim(),
        category: formData.category,
        price: numPrice,
        description: formData.description.trim(),
        ingredients: ingredientsArray,
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
        popular: formData.popular,
        isGiga: formData.isGiga,
        isSweet: formData.isSweet,
        isVegetarian: formData.isVegetarian,
        sizeLabel: formData.sizeLabel.trim(),
        badge: formData.badge.trim(),
        available: formData.available
      };

      if (editingItem) {
        await updateMenuItem(editingItem.id, itemPayload);
        onShowToast(`Item "${formData.name}" atualizado no Firestore!`);
      } else {
        await addMenuItem(itemPayload);
        onShowToast(`Item "${formData.name}" cadastrado com sucesso!`);
      }

      setActiveTab('list');
    } catch (err: any) {
      console.error('Error saving item:', err);
      alert('Erro ao salvar no banco de dados: ' + (err?.message || 'Tente novamente'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const newStatus = !(item.available !== false);
      await toggleItemAvailability(item.id, item.available !== false);
      onShowToast(newStatus ? `"${item.name}" agora está disponível!` : `"${item.name}" marcado como esgotado`);
    } catch (err) {
      console.error('Error toggling availability:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await deleteMenuItem(itemToDelete.id);
      onShowToast(`Item "${itemToDelete.name}" removido do cardápio.`);
      setItemToDelete(null);
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Erro ao excluir item do banco.');
    }
  };

  const handleResetDefaults = async () => {
    const confirmReset = window.confirm('Deseja recarregar o cardápio padrão completo da Giga\'s Pastelaria no banco de dados?');
    if (!confirmReset) return;

    setIsResetting(true);
    try {
      await resetToDefaultMenu();
      onShowToast('Cardápio padrão restaurado com sucesso no Firebase!');
    } catch (err) {
      console.error('Error resetting menu:', err);
      alert('Erro ao restaurar cardápio padrão.');
    } finally {
      setIsResetting(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategoryFilter !== 'todos' && item.category !== selectedCategoryFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(q);
      const matchesDesc = (item.description || '').toLowerCase().includes(q);
      if (!matchesName && !matchesDesc) return false;
    }
    return true;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      id="admin-manager-modal"
    >
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">Painel de Gerenciamento do Cardápio</h3>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Firebase Firestore Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Cadastre, altere preços, fotos e descrições em tempo real.
              </p>
            </div>
          </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
                title="Sair do modo administrativo"
              >
                <span>Encerrar Sessão</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                id="admin-modal-close-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
        </div>

        {/* Tab Selector & Quick Action Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'list'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
              id="admin-tab-list-btn"
            >
              <Layers className="w-4 h-4" />
              Itens Cadastrados ({items.length})
            </button>

            <button
              onClick={handleOpenAddForm}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'form' && !editingItem
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
              }`}
              id="admin-tab-add-btn"
            >
              <Plus className="w-4 h-4" />
              Novo Pastel / Item
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetDefaults}
              disabled={isResetting}
              className="text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-2 rounded-xl font-medium flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
              title="Recarrega todos os 20+ pastéis originais no banco de dados"
              id="admin-reset-defaults-btn"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              Restaurar Padrões
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100/50">
          
          {/* TAB 1: LIST OF ITEMS */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrar por nome ou ingrediente..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                    id="admin-search-input"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setSelectedCategoryFilter('todos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      selectedCategoryFilter === 'todos'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Todos
                  </button>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategoryFilter(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 ${
                        selectedCategoryFilter === c.id
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Items Table/Cards */}
              {filteredItems.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
                  <p className="text-base font-bold text-slate-700">Nenhum item encontrado com esse filtro.</p>
                  <p className="text-xs text-slate-500 mt-1">Tente mudar o termo de busca ou adicione um novo produto.</p>
                  <button
                    onClick={handleOpenAddForm}
                    className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Cadastrar Primeiro Item
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredItems.map((item) => (
                    <div 
                      key={item.id}
                      className={`bg-white rounded-2xl p-4 border transition-all shadow-xs flex flex-col justify-between gap-3 ${
                        item.available === false 
                          ? 'opacity-60 bg-slate-50 border-dashed border-slate-300' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                      id={`admin-item-card-${item.id}`}
                    >
                      <div className="flex gap-3.5">
                        {/* Thumb */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 relative border border-slate-100">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80');
                            }}
                          />
                          {item.badge && (
                            <span className="absolute top-1 left-1 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-extrabold text-sm text-slate-900 truncate">
                              {item.name}
                            </h4>
                            <span className="font-black text-rose-600 text-sm whitespace-nowrap">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                            {item.description || (item.ingredients || []).join(', ')}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.isGiga && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                Giga
                              </span>
                            )}
                            {item.popular && (
                              <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                Mais Pedido
                              </span>
                            )}
                            {item.isSweet && (
                              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                Doce
                              </span>
                            )}
                            {item.sizeLabel && (
                              <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-1.5 py-0.5 rounded-md">
                                {item.sizeLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
                        <button
                          onClick={() => handleToggleAvailability(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-bold transition-colors ${
                            item.available !== false
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                          title="Alternar disponibilidade no cardápio"
                        >
                          {item.available !== false ? (
                            <>
                              <Eye className="w-3.5 h-3.5" /> Disponível
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" /> Esgotado
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditForm(item)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-colors"
                            id={`admin-edit-btn-${item.id}`}
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Editar
                          </button>

                          <button
                            onClick={() => setItemToDelete(item)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-lg transition-colors"
                            title="Excluir item"
                            id={`admin-delete-btn-${item.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CREATE / EDIT FORM */}
          {activeTab === 'form' && (
            <form onSubmit={handleSaveForm} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-black text-base text-slate-900 flex items-center gap-2">
                  {editingItem ? <Edit3 className="w-4 h-4 text-rose-600" /> : <Plus className="w-4 h-4 text-rose-600" />}
                  {editingItem ? `Editar "${editingItem.name}"` : 'Cadastrar Novo Pastel / Produto'}
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  Voltar para a Lista
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Nome do Item *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Giga Costela com Catupiry (30cm)"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    id="form-item-name"
                  />
                </div>

                {/* Categoria */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Categoria *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuCategory })}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    id="form-item-category"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preço */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Preço (R$) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">R$</span>
                    <input
                      type="text"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="24,90"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none font-bold text-slate-900"
                      id="form-item-price"
                    />
                  </div>
                </div>

                {/* Descrição */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Descrição Detalhada
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva o sabor, generosidade do recheio ou diferencial..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    id="form-item-description"
                  />
                </div>

                {/* Ingredientes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Ingredientes (separados por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formData.ingredientsText}
                    onChange={(e) => setFormData({ ...formData, ingredientsText: e.target.value })}
                    placeholder="Carne moída, Mussarela, Catupiry, Bacon, Azeitonas..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    id="form-item-ingredients"
                  />
                </div>

                {/* URL da Foto */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                      URL da Foto do Pastel / Produto
                    </label>
                    <span className="text-[11px] text-slate-500">Link direto ou escolha uma foto padrão</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://exemplo.com/foto-do-pastel.jpg"
                      className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                      id="form-item-image-url"
                    />
                  </div>

                  {/* Preset Photos Quick Select */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400">Sugestões de Fotos:</span>
                    {PRESET_SAMPLE_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mt-3 p-2 bg-slate-50 rounded-2xl border border-slate-200 inline-flex items-center gap-3">
                      <img 
                        src={formData.image} 
                        alt="Pré-visualização"
                        className="w-16 h-16 rounded-xl object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80');
                        }}
                      />
                      <span className="text-xs text-slate-600 font-medium">Pré-visualização da imagem</span>
                    </div>
                  )}
                </div>

                {/* Tamanho e Badge */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Etiqueta de Tamanho
                  </label>
                  <input
                    type="text"
                    value={formData.sizeLabel}
                    onChange={(e) => setFormData({ ...formData, sizeLabel: e.target.value })}
                    placeholder="Ex: Giga 30cm, 22cm, 500ml..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    id="form-item-size"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Selo / Badge Destaque
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ex: O Campeão ⭐, Novo 🔥..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    id="form-item-badge"
                  />
                </div>

                {/* Flags / Checkboxes */}
                <div className="sm:col-span-2 pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="w-4 h-4 text-rose-600 rounded-md focus:ring-rose-500"
                    />
                    🔥 Mais Pedido
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isGiga}
                      onChange={(e) => setFormData({ ...formData, isGiga: e.target.checked })}
                      className="w-4 h-4 text-rose-600 rounded-md focus:ring-rose-500"
                    />
                    👑 É Especial Giga
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSweet}
                      onChange={(e) => setFormData({ ...formData, isSweet: e.target.checked })}
                      className="w-4 h-4 text-rose-600 rounded-md focus:ring-rose-500"
                    />
                    🍫 Pastel Doce
                  </label>

                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isVegetarian}
                      onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
                      className="w-4 h-4 text-rose-600 rounded-md focus:ring-rose-500"
                    />
                    🌱 Vegetariano
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-rose-200 transition-all"
                  id="form-submit-save-btn"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Salvando no Banco...' : editingItem ? 'Salvar Alterações' : 'Cadastrar Pastel'}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Delete Confirmation Dialog */}
        {itemToDelete && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h4 className="text-base font-extrabold text-slate-900">Excluir Item?</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Tem certeza que deseja excluir o item <strong className="text-slate-800 font-bold">"{itemToDelete.name}"</strong>? Essa ação atualizará o cardápio em tempo real.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-200"
                  id="confirm-delete-btn"
                >
                  Sim, Excluir
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
