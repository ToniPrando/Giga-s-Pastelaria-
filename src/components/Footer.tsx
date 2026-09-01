import React from 'react';
import { 
  Instagram, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Heart, 
  Flame, 
  ShieldCheck,
  Lock,
  Code
} from 'lucide-react';
import { Logo } from './Logo';
import { STORE_INFO } from '../data/menuData';

interface FooterProps {
  onOpenCodeExport?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCodeExport, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-3 font-medium">
              A melhor e mais crocante pastelaria de Porto Feliz - SP. Recheios generosos, massa artesanal sequinha e sabor inconfundível.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-rose-600 to-amber-400 text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
                aria-label="Instagram da Giga's Pastelaria"
                id="footer-instagram-btn"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-md"
                aria-label="WhatsApp da Giga's Pastelaria"
                id="footer-whatsapp-btn"
              >
                <Phone className="w-5 h-5" />
              </a>

              <a
                href={STORE_INFO.ifoodUrl}
                target="_blank"
                rel="noreferrer"
                className="h-10 px-4 rounded-xl bg-rose-600 text-white flex items-center justify-center gap-1.5 font-bold text-xs hover:bg-rose-700 transition-colors shadow-lg shadow-rose-900/30"
                aria-label="iFood Oficial da Giga's Pastelaria"
                id="footer-ifood-btn"
              >
                <span className="font-extrabold tracking-tight">Peça pelo iFood</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-heading">Navegação</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#inicio" className="hover:text-amber-400 transition-colors">Início</a></li>
              <li><a href="#cardapio" className="hover:text-amber-400 transition-colors">Cardápio Completo</a></li>
              <li><a href="#sobre" className="hover:text-amber-400 transition-colors">Sobre a Giga's</a></li>
              <li><a href="#avaliacoes" className="hover:text-amber-400 transition-colors">Depoimentos</a></li>
              <li><a href="#contato" className="hover:text-amber-400 transition-colors">Contato & Localização</a></li>
              {onOpenAdmin && (
                <li className="pt-1">
                  <button
                    onClick={onOpenAdmin}
                    className="text-amber-400/90 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-left"
                    id="footer-nav-restricted-area-btn"
                  >
                    <Lock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>Área Restrita (Administrador)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-heading">Especialidades</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>🥟 Pastéis Tradicionais (22cm)</li>
              <li>👑 Pastéis Giga Especiais (30cm)</li>
              <li>🍫 Pastéis Doces Gourmet</li>
              <li>🥤 Caldo de Cana Geladinho com Limão</li>
              <li>🍟 Porções de Boteco & Mini Pastéis</li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-heading">Atendimento</h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.hours}</span>
              </p>
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{STORE_INFO.phone}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Payment Methods & Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-400">Formas de Pagamento:</span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[11px] font-bold">PIX</span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[11px]">Cartão de Crédito</span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[11px]">Cartão de Débito</span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[11px]">Dinheiro</span>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[11px]">iFood Pay</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors text-xs font-semibold cursor-pointer"
                id="footer-bottom-restricted-area-btn"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Área Restrita (Administrador)</span>
              </button>
            )}

            {onOpenCodeExport && (
              <button
                onClick={onOpenCodeExport}
                className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
                id="footer-export-code-btn"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Código HTML Único</span>
              </button>
            )}
            <p className="text-slate-500">
              © {new Date().getFullYear()} Giga's Pastelaria. Todos os direitos reservados.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
