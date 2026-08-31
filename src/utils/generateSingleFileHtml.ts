import { STORE_INFO } from '../data/menuData';

export function generateSingleFileHtml(): string {
  return `<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Giga's Pastelaria | Os Melhores Pastéis Artesanais de Porto Feliz - SP</title>
  <meta name="description" content="Pastéis artesanais crocantes, sequinhos e super recheados em Porto Feliz - SP. Peça pelo iFood ou WhatsApp!" />
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }
    h1, h2, h3, h4, h5, h6, .font-heading {
      font-family: 'Outfit', sans-serif;
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); }
      50% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.7); }
    }
    .animate-glow {
      animation: pulseGlow 2s infinite ease-in-out;
    }
  </style>
</head>
<body class="bg-stone-50 text-stone-800 antialiased selection:bg-amber-500 selection:text-white">

  <!-- TOP BAR -->
  <div class="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 border-b border-stone-800">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5 text-amber-400 font-semibold">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Aberto Hoje • 18:00 às 23:30
        </span>
        <span class="hidden sm:inline text-stone-400">📍 Porto Feliz - SP</span>
      </div>
      <div class="flex items-center gap-4 ml-auto font-medium">
        <a href="https://www.instagram.com/pastelaria_gigas" target="_blank" class="hover:text-amber-400">@pastelaria_gigas</a>
        <a href="https://wa.me/5515998765432" target="_blank" class="text-emerald-400 font-bold hover:underline">WhatsApp Delivery</a>
      </div>
    </div>
  </div>

  <!-- HEADER -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      <!-- Logo -->
      <a href="#inicio" class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-red-600 to-amber-700 flex items-center justify-center p-0.5 shadow-md border border-amber-400">
          <img src="https://lh3.googleusercontent.com/d/1OPg8403M7Xa2okR8BO22O0ET9Uqw-wE5" alt="Giga's Logo" class="w-full h-full object-cover rounded-xl" onerror="this.src='https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=100&auto=format&fit=crop&q=80'" />
        </div>
        <div>
          <div class="flex items-center gap-1">
            <span class="font-black text-xl font-heading text-stone-900 tracking-tight">GIGA'S</span>
            <span class="font-extrabold text-xl font-heading text-red-600 tracking-tight">PASTELARIA</span>
          </div>
          <span class="text-[10px] font-bold text-amber-700 uppercase tracking-widest block">Porto Feliz - SP</span>
        </div>
      </a>

      <!-- Navigation -->
      <nav class="hidden lg:flex items-center gap-6 font-semibold text-sm text-stone-700">
        <a href="#inicio" class="hover:text-red-600 transition-colors">Início</a>
        <a href="#cardapio" class="hover:text-red-600 transition-colors">Cardápio</a>
        <a href="#sobre" class="hover:text-red-600 transition-colors">Sobre Nós</a>
        <a href="#avaliacoes" class="hover:text-red-600 transition-colors">Avaliações</a>
        <a href="#contato" class="hover:text-red-600 transition-colors">Contato</a>
      </nav>

      <!-- CTAs -->
      <div class="flex items-center gap-3">
        <a href="https://www.ifood.com.br/delivery/porto-feliz-sp/gigas-pastelaria-conjunto-habitacional-fortunato-fioravante-angelieri/dbd9385e-2bda-4022-8e91-468826add643?UTM_Medium=share&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafeDDy-e_sijXIDocatUtzPdqEDvAW6rqm7S7ipUthN0rxDl96VdbX8QXRBSA_aem_9b4yHhogIKEYhv81k0JoNA" target="_blank" class="bg-[#EA1D2C] hover:bg-[#c91825] text-white px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all">
          Pedir no iFood
        </a>
        <a href="https://wa.me/5515998765432" target="_blank" class="hidden sm:inline-flex bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all">
          WhatsApp
        </a>
      </div>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section class="relative pt-16 pb-20 bg-gradient-to-b from-amber-500/10 via-amber-50/40 to-stone-50" id="inicio">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        <div class="lg:col-span-7 text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 text-xs sm:text-sm font-bold tracking-wide mb-5 border border-red-200">
            <span>🔥 O Mais Famoso de Porto Feliz - SP</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 font-heading tracking-tight leading-[1.1] mb-5">
            Pastéis <span class="text-red-600 underline decoration-amber-400">artesanais</span>, crocantes e <span class="text-amber-600">recheados</span> de verdade!
          </h1>

          <p class="text-base sm:text-lg text-stone-600 mb-8 max-w-xl leading-relaxed">
            A autêntica receita da massa sequinha e crocante, frita na hora com recheios nobres de ponta a ponta. Peça agora pelo iFood ou WhatsApp!
          </p>

          <div class="flex flex-wrap items-center gap-3.5 mb-10">
            <a href="${STORE_INFO.ifoodUrl}" target="_blank" class="bg-[#EA1D2C] hover:bg-[#c91825] text-white px-7 py-4 rounded-2xl font-black text-base shadow-lg transition-transform hover:-translate-y-0.5">
              🛵 Peça pelo iFood
            </a>
            <a href="#cardapio" class="bg-amber-500 hover:bg-amber-600 text-stone-950 px-7 py-4 rounded-2xl font-bold text-base shadow-md transition-transform hover:-translate-y-0.5">
              🥟 Ver Cardápio
            </a>
          </div>

          <div class="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 text-center sm:text-left">
            <div>
              <p class="text-stone-900 font-black text-base">★ 4.9</p>
              <p class="text-xs text-stone-500">Mais de 800 avaliações</p>
            </div>
            <div>
              <p class="text-stone-900 font-black text-base">30-45 min</p>
              <p class="text-xs text-stone-500">Entrega rápida</p>
            </div>
            <div>
              <p class="text-stone-900 font-black text-base">100% Sequinho</p>
              <p class="text-xs text-stone-500">Frito na hora</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900">
            <img src="https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&auto=format&fit=crop&q=80" alt="Pastel Giga Especial" class="w-full h-[400px] object-cover" />
            <div class="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
              <span class="text-xs font-bold text-amber-400 uppercase">Destaque</span>
              <h3 class="text-xl font-bold font-heading">Pastel Giga Especial (30cm)</h3>
              <p class="text-xs text-stone-300">Recheio generoso com Catupiry Original</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- CARDÁPIO -->
  <section class="py-20 bg-white" id="cardapio">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl sm:text-4xl font-black text-stone-900 font-heading">Cardápio de Destaques</h2>
        <p class="mt-2 text-stone-600">Pastéis salgados tradicionais, os famosos gigantes Giga e opções doces irresistíveis.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Item 1 -->
        <div class="bg-stone-50 rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold bg-red-600 text-white px-2.5 py-1 rounded-full uppercase">Campeão de Vendas</span>
            <h3 class="text-xl font-bold font-heading text-stone-900 mt-3">Giga Monstro Especial (30cm)</h3>
            <p class="text-xs text-stone-600 mt-2">Carne moída, frango, mussarela, Catupiry legítimo, bacon, palmito, milho, ovo e azeitonas.</p>
          </div>
          <div class="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
            <span class="text-xl font-black text-red-600">R$ 26,90</span>
            <a href="${STORE_INFO.ifoodUrl}" target="_blank" class="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Pedir</a>
          </div>
        </div>

        <!-- Item 2 -->
        <div class="bg-stone-50 rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold bg-amber-500 text-stone-950 px-2.5 py-1 rounded-full uppercase">Tradicional</span>
            <h3 class="text-xl font-bold font-heading text-stone-900 mt-3">Carne com Queijo & Ovo (22cm)</h3>
            <p class="text-xs text-stone-600 mt-2">Carne bovina de primeira bem temperadinha, queijo mussarela derretido, ovo cozido e azeitonas.</p>
          </div>
          <div class="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
            <span class="text-xl font-black text-red-600">R$ 15,90</span>
            <a href="${STORE_INFO.ifoodUrl}" target="_blank" class="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Pedir</a>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="bg-stone-50 rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <span class="text-xs font-bold bg-pink-600 text-white px-2.5 py-1 rounded-full uppercase">Sobremesa</span>
            <h3 class="text-xl font-bold font-heading text-stone-900 mt-3">Nutella com Morangos Frescos</h3>
            <p class="text-xs text-stone-600 mt-2">Massa crocante com açúcar de confeiteiro e canela, recheada com pura Nutella e morangos selecionados.</p>
          </div>
          <div class="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
            <span class="text-xl font-black text-red-600">R$ 17,90</span>
            <a href="${STORE_INFO.ifoodUrl}" target="_blank" class="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl">Pedir</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SOBRE NÓS -->
  <section class="py-20 bg-stone-100" id="sobre">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
      <h2 class="text-3xl sm:text-4xl font-black font-heading text-stone-900">Sobre a Giga's Pastelaria</h2>
      <p class="mt-4 text-stone-600 leading-relaxed">
        Localizada em Porto Feliz - SP, a Giga's Pastelaria nasceu da paixão em fazer o pastel perfeito: massa fininha, crocante e sequinha, com recheio de verdade do começo ao fim. Todos os nossos pastéis são montados na hora e fritos com óleo fresco em temperatura rigorosamente controlada.
      </p>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="bg-stone-950 text-stone-400 py-12 border-t border-stone-800" id="contato">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 class="text-2xl font-black font-heading text-white mb-2">GIGA'S PASTELARIA</h3>
      <p class="text-xs text-stone-400 mb-6">Porto Feliz - SP • Terça a Domingo das 18h às 23h30</p>
      
      <div class="flex justify-center gap-4 mb-8">
        <a href="https://www.instagram.com/pastelaria_gigas" target="_blank" class="bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Instagram @pastelaria_gigas</a>
        <a href="${STORE_INFO.ifoodUrl}" target="_blank" class="bg-[#EA1D2C] hover:bg-[#c91825] text-white px-4 py-2 rounded-xl text-xs font-bold">Delivery no iFood</a>
      </div>

      <p class="text-[11px] text-stone-600">© 2026 Giga's Pastelaria. Todos os direitos reservados.</p>
    </div>
  </footer>

  <script>
    lucide.createIcons();
  </script>
</body>
</html>`;
}
