import React from 'react';
import { MapPin, Clock, Phone, Send, ExternalLink, Navigation, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-white relative" id="contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-600" />
            Localização & Atendimento
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Venha nos Visitar ou Peça em Casa
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Estamos localizados no coração de Porto Feliz - SP e entregamos quentinho na sua porta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info cards: Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-600 text-white rounded-2xl shrink-0 shadow-md shadow-rose-200">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-heading text-lg">Nosso Endereço</h3>
                  <p className="text-sm text-slate-600 mt-1">{STORE_INFO.address}</p>
                  <span className="inline-block mt-2 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
                    Porto Feliz - SP
                  </span>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-400 text-rose-950 rounded-2xl shrink-0 shadow-md shadow-amber-200">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-heading text-lg">Horários de Funcionamento</h3>
                  <p className="text-sm text-slate-700 mt-1 font-medium">{STORE_INFO.hours}</p>
                  <p className="text-xs text-slate-500 mt-1">Sexta e Sábado: Atendimento especial para toda a família!</p>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-600 text-white rounded-2xl shrink-0 shadow-md shadow-emerald-200">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-heading text-lg">Telefone & WhatsApp</h3>
                  <p className="text-sm text-slate-700 mt-1 font-semibold">{STORE_INFO.phone}</p>
                  <a 
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-2 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Chamar no WhatsApp Direto
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Map Preview & Action Box: Right Column */}
          <div className="lg:col-span-7 bg-slate-900 text-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-4 border border-amber-400/30">
                <span>📍 Entrega Rápida em Porto Feliz</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-heading leading-tight">
                Bateu a fome? Peça agora e receba quentinho!
              </h3>

              <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed max-w-lg">
                Utilizamos embalagens térmicas especiais com tecnologia anti-vapor para que os pastéis cheguem à sua mesa com a mesma crocância de quando saem do tacho.
              </p>

              {/* Delivery coverage checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Entrega em todos os bairros de Porto Feliz</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tempo médio: 30 a 45 minutos</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pastéis fritos na hora do pedido</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Pagamento fácil (Pix, Cartão ou Dinheiro)</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center gap-4 mt-8">
              <a
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-4 px-6 rounded-2xl font-black text-sm shadow-xl shadow-rose-950/40 transition-all"
                id="location-ifood-cta"
              >
                <span>Fazer Pedido no iFood</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(STORE_INFO.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-4 px-6 rounded-2xl font-bold text-sm border border-slate-700 transition-all"
                id="location-maps-cta"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Ver no Google Maps</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
