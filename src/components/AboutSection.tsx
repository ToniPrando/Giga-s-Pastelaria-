import React from 'react';
import { Heart, Sparkles, Award, Users, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import pastelGiga from '../assets/images/pastel_giga_especial_1788042144050.jpg';
import porcaoMini from '../assets/images/porcao_mini_pasteis_1788042202319.jpg';
import { STORE_INFO } from '../data/menuData';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white border-y border-slate-100 relative overflow-hidden" id="sobre">
      {/* Background soft glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story Images & Highlights */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
                  <img
                    src={pastelGiga}
                    alt="Pastel Giga recheado e frito na hora"
                    className="w-full h-56 sm:h-72 object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Stats badge */}
                <div className="bg-rose-600 text-white p-5 rounded-3xl shadow-xl shadow-rose-200 flex flex-col justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-black font-heading leading-none">50k+</span>
                  <span className="text-xs font-bold text-rose-100 uppercase tracking-wider mt-1">Pastéis Saboreados</span>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-amber-400 text-rose-950 p-5 rounded-3xl shadow-xl shadow-amber-200 flex flex-col justify-center text-center border border-amber-300">
                  <span className="text-3xl sm:text-4xl font-black font-heading leading-none">4.9 ★</span>
                  <span className="text-xs font-black text-rose-950 uppercase tracking-wider mt-1">Avaliação em Porto Feliz</span>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
                  <img
                    src={porcaoMini}
                    alt="Porções e pastéis artesanais"
                    className="w-full h-56 sm:h-72 object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2 whitespace-nowrap">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-xs sm:text-sm font-bold">Tradição & Amor em Cada Pastel</span>
            </div>
          </div>

          {/* Right Column: Story & Mission */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider mb-4">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              Nossa História & Paixão
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading tracking-tight leading-tight">
              A história por trás da <span className="text-rose-600 underline decoration-amber-400 decoration-wavy">Giga's Pastelaria</span>
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Nascida no coração de <strong>Porto Feliz - SP</strong>, a <strong>Giga's Pastelaria</strong> foi criada com um propósito simples e delicioso: oferecer pastéis artesanais com a verdadeira crocância brasileira e recheios incrivelmente fartos, sem economizar nos ingredientes.
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              O grande segredo da nossa casa está na receita exclusiva da massa artesanal, desenvolvida com técnica cuidadosa para que cada mordida seja super leve, sequinha e crocante. Aqui, nada de "pastel de vento" — cada pastel é pesado e recheado de ponta a ponta com carnes nobres temperadas na medida certa, queijos selecionados e o autêntico Catupiry.
            </p>

            {/* 3 Pillars */}
            <div className="mt-8 space-y-4 w-full">
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-heading">Fritura na Temperatura Ideal</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Óleo sempre renovado e rigorosamente controlado para garantir que o pastel não fique oleoso.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-heading">Ingredientes Frescos do Dia</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Carnes moídas frescas, frango desfiado com ervas naturais e legumes rigorosamente selecionados.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-heading">Atendimento Acolhedor & Delivery Ágil</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Preparamos tudo com muito carinho para que sua experiência em casa ou na loja seja inesquecível.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#cardapio"
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-rose-200 transition-all"
              >
                Conhecer Nossos Sabores
              </a>
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
              >
                Seguir no Instagram
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
