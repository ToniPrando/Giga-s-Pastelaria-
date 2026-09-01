import React, { useState } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, Flame, Sparkles, ExternalLink } from 'lucide-react';
import { MenuItem, CartExtra } from '../types';
import { AVAILABLE_EXTRAS, STORE_INFO } from '../data/menuData';
import { handleImageError, resolveMenuItemImage } from '../utils/imageUtils';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, extras: CartExtra[], notes: string) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<CartExtra[]>([]);
  const [notes, setNotes] = useState('');

  const toggleExtra = (extra: CartExtra) => {
    if (selectedExtras.some(e => e.name === extra.name)) {
      setSelectedExtras(selectedExtras.filter(e => e.name !== extra.name));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const unitPrice = item.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedExtras, notes);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200" 
      onClick={onClose}
      id="item-detail-modal-overlay"
    >
      <div 
        className="bg-white rounded-[2.5rem] max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="item-detail-modal"
      >
        {/* Modal Header / Image */}
        <div className="relative h-56 sm:h-64 bg-slate-900 shrink-0">
          <img 
            src={resolveMenuItemImage(item.image, item.category, item.id)} 
            alt={item.name} 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, item.category)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button 
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {item.badge && (
            <span className="absolute top-4 left-4 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
              {item.badge}
            </span>
          )}

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              {item.sizeLabel && (
                <span className="text-[11px] font-black bg-amber-400 text-rose-950 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {item.sizeLabel}
                </span>
              )}
              {item.isVegetarian && (
                <span className="text-[11px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-md uppercase">
                  Vegetariano 🌿
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading leading-tight">{item.name}</h3>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Descrição</h4>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">{item.description}</p>
          </div>

          {/* Ingredients list */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ingredientes Inclusos</h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing, i) => (
                  <span key={i} className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200/60">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Optional extras / adicionais */}
          {item.category !== 'bebidas' && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Deseja Adicionais? (Opcional)</span>
                <span className="text-[11px] text-amber-700 font-semibold">Turbine seu pastel</span>
              </h4>
              <div className="space-y-2">
                {AVAILABLE_EXTRAS.map((extra) => {
                  const isSelected = selectedExtras.some(e => e.name === extra.name);
                  return (
                    <button
                      key={extra.name}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-sm transition-all ${
                        isSelected 
                          ? 'border-rose-500 bg-rose-50/60 text-rose-900 font-bold' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                      id={`extra-option-${extra.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">+ R$ {extra.price.toFixed(2).replace('.', ',')}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Observations */}
          <div>
            <label htmlFor="item-notes" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Observações do Pedido (Ex: sem azeitona, bem passado, etc.)
            </label>
            <textarea
              id="item-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Por favor tirar o orégano, caprichar no limão..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none bg-slate-50 text-slate-800"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 disabled:opacity-30"
              aria-label="Diminuir quantidade"
              id="modal-qty-minus"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-slate-900 text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700"
              aria-label="Aumentar quantidade"
              id="modal-qty-plus"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to order button */}
          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-between bg-rose-600 hover:bg-rose-700 text-white py-3.5 px-5 rounded-2xl font-black text-sm shadow-lg shadow-rose-200 transition-all active:scale-95 cursor-pointer"
            id="modal-add-to-cart-btn"
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              Adicionar à Sacola
            </span>
            <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
