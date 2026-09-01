import { MenuItem, Testimonial, FaqItem } from '../types';

import heroPastel from '../assets/images/hero_pastel_banner_1788042133809.jpg';
import pastelGiga from '../assets/images/pastel_giga_especial_1788042144050.jpg';
import pastelDoce from '../assets/images/pastel_doce_nutella_1788042155409.jpg';
import caldoCana from '../assets/images/caldo_cana_limao_1788042165432.jpg';
import pastelCarne from '../assets/images/pastel_carne_queijo_1788042191487.jpg';
import porcaoMini from '../assets/images/porcao_mini_pasteis_1788042202319.jpg';
import logoGigasPhotos from '../assets/images/gigas_logo_photos.png';

export const STORE_INFO = {
  name: "Giga's Pastelaria",
  slogan: "Os Melhores Pastéis Artesanais de Porto Feliz - SP",
  subtitle: "Massa super crocante, sequinha e recheios generosos de ponta a ponta!",
  city: "Porto Feliz - SP",
  address: "Rua Cardoso Pimentel, 1791, Porto Feliz - SP",
  phone: "(15) 99617-4295",
  whatsappNumber: "5515996174295",
  instagramUrl: "https://www.instagram.com/pastelaria_gigas",
  instagramHandle: "@pastelaria_gigas",
  ifoodUrl: "https://www.ifood.com.br/delivery/porto-feliz-sp/gigas-pastelaria-conjunto-habitacional-fortunato-fioravante-angelieri/dbd9385e-2bda-4022-8e91-468826add643?UTM_Medium=share&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAafeDDy-e_sijXIDocatUtzPdqEDvAW6rqm7S7ipUthN0rxDl96VdbX8QXRBSA_aem_9b4yHhogIKEYhv81k0JoNA",
  googleDriveLogoUrl: logoGigasPhotos,
  logoUrl: logoGigasPhotos,
  googlePhotosShareUrl: "https://photos.app.goo.gl/PewLPBo7EG44JN7KA",
  googleDriveRawUrl: "https://drive.google.com/file/d/1OPg8403M7Xa2okR8BO22O0ET9Uqw-wE5/view?usp=drivesdk",
  hours: "Terça a Domingo: 18h00 às 23h30 (Segunda fechado)",
  deliveryTime: "30 a 45 min",
  deliveryFee: "A partir de R$ 5,00",
  rating: "4.9",
  reviewsCount: "840+"
};

export const MENU_ITEMS: MenuItem[] = [
  // --- GIGA & ESPECIAIS ---
  {
    id: "giga-tudo",
    name: "Giga Monstro Especial (30cm)",
    category: "giga-especiais",
    price: 26.90,
    description: "O campeão da casa! Pastel gigante recheado com carne moída temperada, frango desfiado, mussarela derretida, Catupiry original, bacon crocante, palmito, milho, azeitonas e ovo.",
    ingredients: ["Carne temperada", "Frango desfiado", "Mussarela", "Catupiry Original", "Bacon crocante", "Palmito", "Milho", "Ovo", "Azeitonas"],
    image: pastelGiga,
    popular: true,
    isGiga: true,
    badge: "O Mais Famoso ⭐",
    sizeLabel: "Giga 30cm"
  },
  {
    id: "giga-costela",
    name: "Giga Costela Desfiada com Barbecue e Cream Cheese",
    category: "giga-especiais",
    price: 24.50,
    description: "Costela bovina premium desfiada bem suculenta, molho barbecue artesanal, generosa camada de cream cheese e cebola crispy.",
    ingredients: ["Costela bovina desfiada", "Molho Barbecue", "Cream Cheese", "Cebola Crispy", "Cheiro verde"],
    image: pastelGiga,
    popular: true,
    isGiga: true,
    badge: "Super Recheado 🔥",
    sizeLabel: "Giga 30cm"
  },
  {
    id: "giga-quatro-queijos-bacon",
    name: "Giga 4 Queijos com Bacon Crocante",
    category: "giga-especiais",
    price: 23.90,
    description: "Mussarela selecionada, queijo prato, provolone defumado e Catupiry Original com cubinhos de bacon douradinho.",
    ingredients: ["Mussarela", "Queijo Prato", "Provolone", "Catupiry Original", "Bacon em cubos", "Orégano"],
    image: pastelGiga,
    popular: false,
    isGiga: true,
    badge: "Explosão de Queijo 🧀",
    sizeLabel: "Giga 30cm"
  },
  {
    id: "giga-camarao-catupiry",
    name: "Giga Camarão ao Molho com Catupiry",
    category: "giga-especiais",
    price: 28.90,
    description: "Camarões selecionados refogados no azeite, alho e tomate com o autêntico Catupiry cremoso e cheiro verde fresco.",
    ingredients: ["Camarões refogados", "Catupiry Original", "Tomate", "Alho e Azeite", "Cebolinha"],
    image: pastelGiga,
    popular: true,
    isGiga: true,
    badge: "Especial do Chef 🍤",
    sizeLabel: "Giga 30cm"
  },

  // --- SALGADOS TRADICIONAIS ---
  {
    id: "trad-carne-especial",
    name: "Pastel de Carne com Queijo e Ovo",
    category: "tradicionais",
    price: 15.90,
    description: "Carne bovina de primeira bem refogadinha com tempero caseiro da Giga's, mussarela derretida, ovo cozido e azeitonas fatiadas.",
    ingredients: ["Carne moída especial", "Mussarela", "Ovo", "Azeitonas", "Tempero verde"],
    image: pastelCarne,
    popular: true,
    badge: "Mais Pedido 🏆",
    sizeLabel: "Tradicional 22cm"
  },
  {
    id: "trad-carne-seca-catupiry",
    name: "Carne Seca Desfiada com Catupiry",
    category: "tradicionais",
    price: 18.50,
    description: "Carne seca dessalgada e desfiada no azeite com cebola fininha e generoso recheio de Catupiry legítimo.",
    ingredients: ["Carne seca desfiada", "Catupiry", "Cebola refogada", "Azeite", "Orégano"],
    image: pastelCarne,
    popular: true,
    sizeLabel: "Tradicional 22cm"
  },
  {
    id: "trad-frango-catupiry",
    name: "Frango Desfiado com Catupiry Original",
    category: "tradicionais",
    price: 15.00,
    description: "Peito de frango selecionado, desfiado e cozido com tempero artesanal de ervas finas e muito Catupiry.",
    ingredients: ["Frango desfiado temperado", "Catupiry Original", "Salsinha fresca"],
    image: pastelCarne,
    popular: true,
    badge: "Clássico 🌟",
    sizeLabel: "Tradicional 22cm"
  },
  {
    id: "trad-queijo-dobrado",
    name: "Queijo Mussarela Dobrado com Orégano",
    category: "tradicionais",
    price: 14.50,
    description: "Dose dupla de queijo mussarela de altíssima qualidade que estica a cada mordida, finalizado com orégano aromático.",
    ingredients: ["Mussarela dupla", "Orégano selecionado"],
    image: pastelCarne,
    popular: false,
    isVegetarian: true,
    sizeLabel: "Tradicional 22cm"
  },
  {
    id: "trad-pizza-suprema",
    name: "Pizza Suprema",
    category: "tradicionais",
    price: 15.50,
    description: "Mussarela, presunto fatiado, rodelas de tomate fresco, orégano chileno e azeitonas pretas.",
    ingredients: ["Mussarela", "Presunto de qualidade", "Tomate fresco", "Azeitonas", "Orégano"],
    image: pastelCarne,
    popular: false,
    sizeLabel: "Tradicional 22cm"
  },
  {
    id: "trad-palmito-cremoso",
    name: "Palmito Nobre com Requeijão Cremoso",
    category: "tradicionais",
    price: 16.00,
    description: "Palmito nobre em rodelas macias envolvido em molho branco cremoso artesanal e toque de ervas finas.",
    ingredients: ["Palmito nobre", "Requeijão cremoso", "Ervas finas", "Azeite"],
    image: pastelCarne,
    popular: false,
    isVegetarian: true,
    sizeLabel: "Tradicional 22cm"
  },

  // --- PASTÉIS DOCES ---
  {
    id: "doce-nutella-morango",
    name: "Pastel de Nutella com Morangos Frescos",
    category: "doces",
    price: 17.90,
    description: "Massa crocante salpicada com açúcar de confeiteiro e canela, recheada com pura Nutella italiana e morangos frescos picados.",
    ingredients: ["Pura Nutella", "Morangos frescos", "Açúcar e canela"],
    image: pastelDoce,
    popular: true,
    isSweet: true,
    badge: "Sobremesa Favorita 🍓",
    sizeLabel: "Doce 20cm"
  },
  {
    id: "doce-romeu-julieta",
    name: "Romeu & Julieta Especial",
    category: "doces",
    price: 14.90,
    description: "Goiabada cascão cremosa derretida abraçada por generosa fatia de queijo mussarela ou queijo minas.",
    ingredients: ["Goiabada cascão artesanal", "Queijo mussarela derretido"],
    image: pastelDoce,
    popular: false,
    isSweet: true,
    sizeLabel: "Doce 20cm"
  },
  {
    id: "doce-banana-canela-leite-condensado",
    name: "Banana Flambada com Doce de Leite e Canela",
    category: "doces",
    price: 15.00,
    description: "Bananas fatiadas no ponto certo, doce de leite artesanal cremoso de Minas e toque perfumado de canela.",
    ingredients: ["Banana", "Doce de leite mineiro", "Canela em pó", "Açúcar"],
    image: pastelDoce,
    popular: false,
    isSweet: true,
    sizeLabel: "Doce 20cm"
  },
  {
    id: "doce-prestigio-especial",
    name: "Prestígio Gourmet (Chocolate & Coco)",
    category: "doces",
    price: 15.90,
    description: "Chocolate ao leite cremoso com coco ralado fresco em abundância e leite condensado.",
    ingredients: ["Chocolate ao leite", "Coco ralado úmido", "Leite condensado"],
    image: pastelDoce,
    popular: false,
    isSweet: true,
    sizeLabel: "Doce 20cm"
  },

  // --- BEBIDAS & CALDO DE CANA ---
  {
    id: "bebida-caldo-cana-limao-500",
    name: "Caldo de Cana Geladinho com Limão (500ml)",
    category: "bebidas",
    price: 9.00,
    description: "Moído na hora de cana selecionada e higienizada. Servido trincando de gelado com toque cítrico de limão taiti ou abacaxi.",
    ingredients: ["Garapa fresca da hora", "Gelo filtrado", "Limão Taiti"],
    image: caldoCana,
    popular: true,
    badge: "Par Perfeito com Pastel 🥤",
    sizeLabel: "Copo 500ml"
  },
  {
    id: "bebida-caldo-cana-1l",
    name: "Caldo de Cana Puro da Hora (Garrafa 1 Litro)",
    category: "bebidas",
    price: 16.00,
    description: "Garrafa pet de 1L com caldo de cana super gelado e puro, ideal para acompanhar o pedido da família toda.",
    ingredients: ["Garapa natural 100% pura"],
    image: caldoCana,
    popular: false,
    sizeLabel: "Garrafa 1L"
  },
  {
    id: "bebida-refrigerante-lata",
    name: "Refrigerante em Lata (350ml)",
    category: "bebidas",
    price: 6.50,
    description: "Coca-Cola Original, Coca Zero, Guaraná Antarctica, Fanta Laranja ou Sprite. Bem geladinho!",
    ingredients: ["Refrigerante lata 350ml"],
    image: caldoCana,
    popular: false,
    sizeLabel: "Lata 350ml"
  },
  {
    id: "bebida-suco-natural-polpa",
    name: "Suco Natural da Fruta (500ml)",
    category: "bebidas",
    price: 10.00,
    description: "Sabores refrescantes: Maracujá, Laranja, Abacaxi com Hortelã ou Morango batido na hora.",
    ingredients: ["Fruta natural", "Água mineral ou leite", "Gelo"],
    image: caldoCana,
    popular: false,
    sizeLabel: "Copo 500ml"
  },

  // --- PORÇÕES & COMBOS ---
  {
    id: "porcao-mini-pasteis",
    name: "Porção de Mini Pastéis de Boteco (12 unidades)",
    category: "porcoes",
    price: 32.00,
    description: "Mini pastéis sortidos super crocantes (4 de carne, 4 de queijo e 4 de frango com catupiry). Acompanha nosso molho de alho picante da casa e vinagrete.",
    ingredients: ["12 mini pastéis", "Molho da casa", "Vinagrete artesanal"],
    image: porcaoMini,
    popular: true,
    badge: "Ideal pra Compartilhar 👥",
    sizeLabel: "12 un + 2 molhos"
  },
  {
    id: "combo-casal-giga",
    name: "Combo Casal Giga (2 Giga + 1 Caldo de Cana 1L)",
    category: "porcoes",
    price: 59.90,
    description: "2 Pastéis Giga Especiais (30cm) à sua escolha + 1 Garrafa de Caldo de Cana 1 Litro super gelado!",
    ingredients: ["2 Pastéis Giga 30cm", "1L Caldo de cana"],
    image: heroPastel,
    popular: true,
    badge: "Combo Econômico 💰",
    sizeLabel: "Serve 2 a 3 pessoas"
  },
  {
    id: "porcao-batata-frita-cheddar-bacon",
    name: "Batata Frita Especial Giga (500g) com Cheddar & Bacon",
    category: "porcoes",
    price: 29.90,
    description: "Batata frita crocante e sequinha coberta com muito molho cheddar cremoso e farta chuva de bacon crocante.",
    ingredients: ["Batata frita especial", "Cheddar derretido", "Bacon frito"],
    image: porcaoMini,
    popular: false,
    sizeLabel: "500g bem servido"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Mariana Souza",
    neighborhood: "Jardim Vante - Porto Feliz",
    rating: 5,
    comment: "Melhor pastel de Porto Feliz com certeza! A massa é sequinha, não fica oleosa e o recheio é de verdade de ponta a ponta. O Giga de Carne com Catupiry é surreal de bom.",
    date: "Há 3 dias",
    avatar: "MS"
  },
  {
    id: "t2",
    name: "Carlos Eduardo Ribeiro",
    neighborhood: "Centro - Porto Feliz",
    rating: 5,
    comment: "Pedi pelo WhatsApp e chegou em menos de 35 minutos estalando de quente! O caldo de cana com limão trincando de gelado fechou a noite. Virei cliente fiel da Giga's!",
    date: "Há 1 semana",
    avatar: "CR"
  },
  {
    id: "t3",
    name: "Patrícia Helena",
    neighborhood: "Vila América - Porto Feliz",
    rating: 5,
    comment: "O pastel de Nutella com morango é dos deuses! O tamanho dos pastéis é impressionante, valem cada centavo. Atendimento nota 10!",
    date: "Há 2 semanas",
    avatar: "PH"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Vocês entregam em todos os bairros de Porto Feliz?",
    answer: "Sim! Fazemos entregas para todos os bairros de Porto Feliz - SP, com embalagens térmicas especiais que conservam a crocância e o calor do pastel até a sua mesa."
  },
  {
    question: "Como posso fazer meu pedido?",
    answer: "Você pode pedir diretamente pelo nosso botão do iFood ou montar seu pedido aqui no site e enviar no WhatsApp da Giga's Pastelaria com um só clique!"
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos Pix, cartões de crédito e débito (levamos a maquininha na entrega), dinheiro (com troco facilitado) e vales refeição no iFood."
  },
  {
    question: "Qual a diferença do pastel tradicional para o Pastel Giga?",
    answer: "O pastel tradicional tem 22cm e já é bem recheado. O Pastel Giga Especial tem 30cm com recheio duplo e combinações nobres de ingredientes, ideal para quem tem muita fome ou para dividir!"
  }
];

export const AVAILABLE_EXTRAS = [
  { name: "Bacon Crocante Extra", price: 3.50 },
  { name: "Catupiry Original Extra", price: 4.00 },
  { name: "Queijo Mussarela Dobrado", price: 4.00 },
  { name: "Cheddar Cremoso Extra", price: 3.50 },
  { name: "Ovo Cozido Extra", price: 2.00 },
  { name: "Milho Doce", price: 1.50 },
  { name: "Palmito Picado", price: 3.00 },
  { name: "Molho Especial de Alho da Casa", price: 2.50 }
];
