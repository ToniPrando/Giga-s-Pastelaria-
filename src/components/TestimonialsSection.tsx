import React, { useState } from 'react';
import { Star, MessageSquare, ChevronDown, ChevronUp, Quote, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS, FAQ_ITEMS } from '../data/menuData';

export const TestimonialsSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-24 bg-slate-100/60 border-t border-slate-200" id="avaliacoes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-rose-950 text-xs font-black uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-rose-950 fill-rose-950" />
            Opinião de Quem Já Provou
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Amado por Porto Feliz
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Veja o que nossos clientes dizem sobre a crocância, o sabor e a rapidez da Giga's Pastelaria.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="bg-white rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between relative"
              id={`testimonial-${t.id}`}
            >
              <Quote className="w-8 h-8 text-amber-400/40 absolute top-5 right-5" />
              
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{t.neighborhood}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-heading text-slate-900">Perguntas Frequentes (FAQ)</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">Tire suas dúvidas antes de fazer o seu pedido</p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className={`rounded-2xl border transition-all ${
                    isOpen ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200/80 bg-white'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-800 hover:text-rose-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-rose-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-rose-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
