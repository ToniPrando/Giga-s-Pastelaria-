import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  Star, 
  ShoppingBag, 
  ArrowDown, 
  ShieldCheck, 
  Utensils,
  ExternalLink,
  Plus
} from 'lucide-react';
import heroPastel from '../assets/images/hero_pastel_banner_1788042133809.jpg';
import { STORE_INFO } from '../data/menuData';

interface HeroProps {
  onScrollToMenu: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToMenu, onOpenCart }) => {
  return (
    <section 
      className="relative pt-28 sm:pt-32 pb-14 lg:pb-20 bg-slate-50 overflow-hidden" 
      id="inicio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Bento Grid matching Vibrant Palette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Vibrant Feature Banner (Top on mobile, Left on desktop - 8 cols) */}
          <div className="lg:col-span-8 bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white relative overflow-hidden shadow-2xl shadow-rose-900/20">
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

            {/* Desktop Logo: pinned neatly to the top-right edge like a stamp */}
            <div className="hidden lg:flex absolute top-2 lg:top-4 lg:right-3 w-80 lg:w-88 xl:w-96 aspect-square pointer-events-none select-none items-center justify-center z-[1] transform rotate-[-4deg] drop-shadow-2xl">
              <img 
                src={STORE_INFO.googleDriveLogoUrl} 
                alt="Logo Giga's Pastelaria" 
                aria-hidden="true"
                className="w-full h-full object-contain pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 max-w-full lg:max-w-[60%] xl:max-w-[64%]">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
                <span className="inline-flex items-center gap-1.5 bg-amber-400 text-rose-950 text-xs font-black uppercase px-3.5 py-1.5 rounded-full shadow-xs tracking-wider">
                  <Flame className="w-3.5 h-3.5 fill-rose-900 text-rose-900" />
                  Porto Feliz - SP
                </span>
                <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Massa Artesanal Frita na Hora
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black font-heading leading-[0.98] sm:leading-[0.95] tracking-tight mb-4 sm:mb-5 drop-shadow-md">
                O PASTEL MAIS <br className="hidden sm:inline" />
                <span className="text-amber-300 underline decoration-white/40 decoration-wavy">CROCANTE</span> DA <br className="hidden sm:inline" />
                CIDADE.
              </h1>

              {/* Subtitle */}
              <p className="text-rose-100 text-sm sm:text-base lg:text-lg max-w-md lg:max-w-lg font-medium leading-relaxed mb-2 sm:mb-6 drop-shadow-sm">
                Massa sequinha de verdade, recheios generosos de ponta a ponta e o sabor inigualável da receita tradicional da <strong className="text-white">Giga's Pastelaria</strong>.
              </p>

              {/* Mobile Logo: Displayed right below subtitle and above buttons, larger and closer to the text */}
              <div className="flex lg:hidden justify-center items-center my-2 sm:my-4 py-1">
                <img 
                  src={STORE_INFO.googleDriveLogoUrl} 
                  alt="Logo Giga's Pastelaria" 
                  className="w-56 sm:w-64 max-w-[82vw] aspect-square object-contain drop-shadow-2xl select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* CTAs & Social Proof */}
            <div className="relative z-10 pt-2 sm:pt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onScrollToMenu}
                className="bg-white text-rose-600 hover:bg-rose-50 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-rose-950/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
                id="hero-view-menu-btn"
              >
                <Utensils className="w-5 h-5 text-rose-600" />
                <span>Ver Cardápio</span>
              </button>

              <a
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-amber-400 hover:bg-amber-300 text-rose-950 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-black text-base shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 w-full sm:w-auto"
                id="hero-ifood-primary-btn"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Peça no iFood</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20na%20Giga's%20Pastelaria`}
                target="_blank"
                rel="noreferrer"
                className="bg-white/15 hover:bg-white/25 text-white px-5 py-3.5 sm:py-4 rounded-2xl font-bold text-sm backdrop-blur-xs border border-white/20 transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto"
                id="hero-whatsapp-btn"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>

              {/* Social Proof */}
              <div className="flex items-center gap-3 sm:ml-auto justify-center sm:justify-start pt-2 sm:pt-0">
                <div className="flex -space-x-2">
                  <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full border-2 border-rose-600 bg-amber-300 flex items-center justify-center text-xs font-black text-rose-950 shadow-xs">5k</div>
                  <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full border-2 border-rose-600 bg-white flex items-center justify-center text-xs font-black text-rose-600 shadow-xs">★</div>
                </div>
                <div className="text-left">
                  <span className="block text-xs font-black text-white leading-tight">+5.000</span>
                  <span className="block text-[11px] font-medium text-rose-200 leading-tight">Clientes Felizes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Destaque do Dia: Warm Amber Card (Right - 4 cols) */}
          <div className="lg:col-span-4 bg-amber-400 rounded-[2.5rem] p-7 sm:p-8 flex flex-col justify-between shadow-xl shadow-amber-300/40 relative overflow-hidden border border-amber-300">
            {/* Background pattern glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-amber-900/10 text-amber-950 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-amber-900/10">
                  Destaque do Dia
                </span>
                <span className="text-xs font-black text-amber-900 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-900 text-amber-900" />
                  Top 1
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-amber-950 font-heading leading-tight mb-2">
                O Favorito da Galera!
              </h3>
              <p className="text-amber-900/80 text-xs sm:text-sm font-medium mb-5">
                O pastel mais pedido e elogiado de Porto Feliz.
              </p>

              {/* Product Spotlight Box */}
              <div className="bg-white/60 backdrop-blur-xs p-4 rounded-2xl border border-white/60 shadow-xs mb-4">
                <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                  <img 
                    src={heroPastel} 
                    alt="Pastel Giga Especial 30cm" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                    30cm
                  </span>
                </div>
                <span className="text-amber-950 font-black text-base block font-heading">
                  Giga Especial (30cm)
                </span>
                <p className="text-amber-950/80 text-xs leading-relaxed mt-1">
                  Carne moída fresca, bacon crocante, ovos, presunto, queijo mussarela farto e Catupiry original.
                </p>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-[11px] uppercase font-bold text-amber-900/70 block">Valor Especial</span>
                <span className="text-3xl font-black text-amber-950 font-heading">
                  R$ 26,90
                </span>
              </div>

              <button
                onClick={onScrollToMenu}
                className="w-12 h-12 bg-amber-950 hover:bg-amber-900 text-amber-400 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
                aria-label="Ver pastel no cardápio"
              >
                <Plus className="w-6 h-6 stroke-[3]" />
              </button>
            </div>
          </div>

        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-slate-900 text-lg">
                <span>{STORE_INFO.rating}</span>
                <span className="text-xs text-amber-500 font-bold">★★★★★</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Mais de 800 avaliações positivas</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-slate-900 text-lg block">{STORE_INFO.deliveryTime}</span>
              <p className="text-xs text-slate-500 font-medium">Entrega rápida em Porto Feliz</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-slate-900 text-lg block">100% Crocante & Sequinho</span>
              <p className="text-xs text-slate-500 font-medium">Fritura no ponto certo, sem óleo acumulado</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
