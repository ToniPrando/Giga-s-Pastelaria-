import React from 'react';
import { Flame, Sparkles, PackageCheck, Zap } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      title: "Massa Artesanal Secreta",
      description: "Super crocante, douradinha e sequinha sem gordura acumulada."
    },
    {
      icon: <Flame className="w-6 h-6 text-rose-600" />,
      title: "Recheio Sem Vento",
      description: "Recheios fartos de ponta a ponta com carnes e queijos de primeira."
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-amber-600" />,
      title: "Embalagem Anti-Vapor",
      description: "Projetada para manter a crocância intacta até a sua casa em Porto Feliz."
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: "Frito na Hora",
      description: "Seu pastel entra no tacho apenas quando o pedido é confirmado."
    }
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-10 shadow-xs relative z-10" id="beneficios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 hover:bg-rose-50/40 border border-slate-100 hover:border-rose-200 transition-all duration-200 shadow-xs"
              id={`benefit-card-${index}`}
            >
              <div className="p-3 rounded-2xl bg-white shadow-xs shrink-0 border border-slate-100">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 font-heading text-base leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
