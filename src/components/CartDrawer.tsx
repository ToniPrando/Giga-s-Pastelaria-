import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  Phone,
  Store,
  Truck
} from 'lucide-react';
import { CartItem } from '../types';
import { STORE_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'retirada'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNeighborhood, setCustomerNeighborhood] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [trocoPara, setTrocoPara] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, cartItem) => sum + cartItem.totalPrice, 0);
  const deliveryFee = deliveryType === 'delivery' ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  const formatCurrency = (val: number) => {
    return `R$ ${val.toFixed(2).replace('.', ',')}`;
  };

  const handleSendWhatsAppOrder = () => {
    if (!customerName.trim()) {
      alert('Por favor, informe seu nome para o pedido.');
      return;
    }

    if (deliveryType === 'delivery' && !customerAddress.trim()) {
      alert('Por favor, informe seu endereço em Porto Feliz.');
      return;
    }

    let text = `*NOVO PEDIDO - GIGA'S PASTELARIA (PORTO FELIZ)*\n\n`;
    text += `👤 *Cliente:* ${customerName}\n`;
    text += `🛵 *Tipo:* ${deliveryType === 'delivery' ? 'Entrega em Domicílio' : 'Retirada no Balcão'}\n`;
    
    if (deliveryType === 'delivery') {
      text += `📍 *Endereço:* ${customerAddress}\n`;
      if (customerNeighborhood) {
        text += `🏘️ *Bairro:* ${customerNeighborhood}\n`;
      }
    }

    text += `💳 *Forma de Pagamento:* ${
      paymentMethod === 'pix' ? 'Pix' : paymentMethod === 'cartao' ? 'Cartão (Débito/Crédito na Entrega)' : `Dinheiro ${trocoPara ? `(Troco para R$ ${trocoPara})` : '(Sem troco)'}`
    }\n\n`;

    text += `📋 *ITENS DO PEDIDO:*\n`;
    items.forEach((ci) => {
      text += `\n*${ci.quantity}x ${ci.item.name}* - ${formatCurrency(ci.totalPrice)}\n`;
      if (ci.extras && ci.extras.length > 0) {
        text += `  ➕ Adicionais: ${ci.extras.map(e => `${e.name} (+${formatCurrency(e.price)})`).join(', ')}\n`;
      }
      if (ci.notes) {
        text += `  📝 Obs: ${ci.notes}\n`;
      }
    });

    if (generalNotes) {
      text += `\n📝 *Observações Gerais:* ${generalNotes}\n`;
    }

    text += `\n----------------------------\n`;
    text += `Subtotal: ${formatCurrency(subtotal)}\n`;
    if (deliveryType === 'delivery') {
      text += `Taxa de Entrega: ${formatCurrency(deliveryFee)}\n`;
    }
    text += `*TOTAL: ${formatCurrency(total)}*\n\n`;
    text += `Obrigado! Aguardo a confirmação do pedido pela Giga's Pastelaria. 🥟🔥`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      id="cart-drawer-overlay"
    >
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
        id="cart-drawer"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="font-black text-lg font-heading leading-tight">Sua Sacola de Pedidos</h3>
              <p className="text-xs text-slate-400 font-medium">Giga's Pastelaria • Porto Feliz</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Fechar Sacola"
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            id="cart-drawer-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-black text-slate-800 font-heading text-lg">Sua sacola está vazia</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto font-medium">
                Adicione deliciosos pastéis crocantes, caldo de cana ou porções para fazer seu pedido!
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                Explorar Cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span>Itens Selecionados ({items.length})</span>
                  <button 
                    onClick={onClearCart}
                    className="text-rose-600 hover:underline flex items-center gap-1 text-xs font-semibold lowercase"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    limpar tudo
                  </button>
                </div>

                {items.map((ci, index) => (
                  <div 
                    key={index}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-2.5 shadow-xs"
                    id={`cart-item-${index}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-bold text-slate-900 text-sm font-heading">{ci.item.name}</h5>
                          {ci.item.sizeLabel && (
                            <span className="text-[9px] font-black bg-amber-400 text-rose-950 px-1.5 py-0.5 rounded">
                              {ci.item.sizeLabel}
                            </span>
                          )}
                        </div>

                        {ci.extras && ci.extras.length > 0 && (
                          <div className="text-[11px] text-slate-600 mt-1">
                            <span className="font-medium text-slate-500">Adicionais: </span>
                            {ci.extras.map(e => e.name).join(', ')}
                          </div>
                        )}

                        {ci.notes && (
                          <div className="text-[11px] text-amber-900 bg-amber-100/80 rounded px-2 py-0.5 mt-1 border border-amber-200 inline-block font-medium">
                            Obs: {ci.notes}
                          </div>
                        )}
                      </div>

                      <span className="font-black text-sm text-slate-900">
                        {formatCurrency(ci.totalPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5 shadow-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, ci.quantity - 1)}
                          className="p-1 rounded text-slate-600 hover:bg-slate-100"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">{ci.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, ci.quantity + 1)}
                          className="p-1 rounded text-slate-600 hover:bg-slate-100"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-slate-400 hover:text-rose-600 p-1 text-xs"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery or Pickup Options */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Tipo de Entrega
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      deliveryType === 'delivery'
                        ? 'border-rose-500 bg-rose-50/70 text-rose-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-rose-600" />
                    <div>
                      <div className="text-xs font-bold">Delivery em Casa</div>
                      <div className="text-[10px] text-slate-500 font-medium">Porto Feliz (R$ 5,00)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('retirada')}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      deliveryType === 'retirada'
                        ? 'border-rose-500 bg-rose-50/70 text-rose-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <Store className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="text-xs font-bold">Retirar no Balcão</div>
                      <div className="text-[10px] text-slate-500 font-medium">Sem taxa de entrega</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Customer Information Form */}
              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Dados do Cliente
                </h4>

                <div>
                  <label htmlFor="cart-name" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Seu Nome *
                  </label>
                  <input
                    id="cart-name"
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none text-slate-800"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <>
                    <div>
                      <label htmlFor="cart-address" className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Endereço Completo com Número *
                      </label>
                      <input
                        id="cart-address"
                        type="text"
                        placeholder="Ex: Rua das Flores, 120 - Apto 3"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none text-slate-800"
                      />
                    </div>

                    <div>
                      <label htmlFor="cart-neighborhood" className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Bairro em Porto Feliz
                      </label>
                      <input
                        id="cart-neighborhood"
                        type="text"
                        placeholder="Ex: Centro, Jardim Vante, Vila América..."
                        value={customerNeighborhood}
                        onChange={(e) => setCustomerNeighborhood(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:outline-none text-slate-800"
                      />
                    </div>
                  </>
                )}

                {/* Payment Method */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-[11px] transition-colors ${
                        paymentMethod === 'pix' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      Pix
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cartao')}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-[11px] transition-colors ${
                        paymentMethod === 'cartao' ? 'bg-rose-600 text-white border-rose-600 shadow-xs' : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      Cartão
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('dinheiro')}
                      className={`py-2 px-2 rounded-xl border text-center font-bold text-[11px] transition-colors ${
                        paymentMethod === 'dinheiro' ? 'bg-amber-400 text-rose-950 border-amber-400 shadow-xs' : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      Dinheiro
                    </button>
                  </div>

                  {paymentMethod === 'dinheiro' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Precisa de troco para quanto? (Ex: 50)"
                        value={trocoPara}
                        onChange={(e) => setTrocoPara(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-white border border-slate-200 text-slate-800"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="cart-general-notes" className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Instruções para o entregador / cozinha (opcional)
                  </label>
                  <input
                    id="cart-general-notes"
                    type="text"
                    placeholder="Ex: Tocar o interfone, casa com portão branco..."
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none text-slate-800"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer with Calculations & WhatsApp Send */}
        {items.length > 0 && (
          <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-3 shrink-0">
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal dos Itens:</span>
                <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              {deliveryType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Taxa de Entrega (Porto Feliz):</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200 font-heading">
                <span>Total do Pedido:</span>
                <span className="text-rose-600">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Primary Order Action: WhatsApp Direct */}
            <button
              onClick={handleSendWhatsAppOrder}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-2xl font-black text-sm shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
              id="cart-send-whatsapp-btn"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido pelo WhatsApp</span>
            </button>

            {/* Secondary Option: Open iFood */}
            <div className="text-center">
              <p className="text-[11px] text-slate-500 mb-1">Ou prefere pedir com comodidade pelo aplicativo?</p>
              <a
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600 hover:underline"
                id="cart-drawer-ifood-link"
              >
                <span>Fazer Pedido pelo iFood Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
