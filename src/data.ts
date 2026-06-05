import { Motorcycle, Recommendation, PartnerBrand } from './types';

export const MOTORCYCLES_DATA: Motorcycle[] = [
  {
    id: 'ducati-panigale-v4s',
    name: 'Panigale V4 S',
    brand: 'Ducati',
    year: 2024,
    price: 154900,
    category: 'Carenadas',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
    km: 2400,
    engine: '1103 cc Desmosedici Stradale V4',
    power: '215 cv',
    description: 'A verdadeira obra de arte italiana das pistas para a sua garagem. Equipada com suspensões eletrônicas Öhlins, rodas forjadas Marchesini e o ronco indescritível do motor V4. Estado de zero quilômetro com vitrificação de pintura.',
    accentColor: '#E30613' // Ducati Red
  },
  {
    id: 'bmw-r1250-gs-adv',
    name: 'R 1250 GS Adventure Premium',
    brand: 'BMW',
    year: 2023,
    price: 114900,
    category: 'Adventure',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1200&auto=format&fit=crop',
    km: 8900,
    engine: '1254 cc Boxer Bicilíndrico ShiftCam',
    power: '136 cv',
    description: 'A rainha absoluta de qualquer terreno. Pronta para cruzar continentes com o máximo conforto. Equipada com malas de alumínio originais BMW, protetores completos e aquecedor de bancos e manoplas. Todas as revisões na concessionária.',
    accentColor: '#0066B2' // BMW Blue
  },
  {
    id: 'honda-cb1000r-black',
    name: 'CB 1000R Neo Sports Café Black Edition',
    brand: 'Honda',
    year: 2024,
    price: 84900,
    category: 'Naked',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=1200&auto=format&fit=crop',
    km: 1200,
    engine: '998 cc Quadricilíndrico em linha',
    power: '141.4 cv',
    description: 'Completamente preta, agressiva e sofisticada. A Black Edition traz acabamento premium anodizado escurecido, Quickshifter bidirecional, painel TFT com conectividade completa e o estilo icônico Neo Sports Café. Impecável e exclusiva.',
    accentColor: '#1A1A1A' // Dark Charcoal
  },
  {
    id: 'kawasaki-zx10r',
    name: 'Ninja ZX-10R KRT Edition',
    brand: 'Kawasaki',
    year: 2023,
    price: 99800,
    category: 'Carenadas',
    image: 'https://images.unsplash.com/photo-1558981855-401d683947eb?q=80&w=1200&auto=format&fit=crop',
    km: 4500,
    engine: '998 cc Quadricilíndrico DOHC 16V',
    power: '203 cv',
    description: 'Desenvolvida em conjunto com o Kawasaki Racing Team do WorldSBK. Controle de tração ultra-preciso, controle de largada, freios Brembo M50 topo de linha e aerodinâmica integrada com asas funcionais para máxima estabilidade.',
    accentColor: '#39FF14' // Kawasaki Green
  },
  {
    id: 'harley-low-rider-s',
    name: 'Low Rider S 117ci',
    brand: 'Harley-Davidson',
    year: 2023,
    price: 94900,
    category: 'Custom',
    image: 'https://images.unsplash.com/photo-1558981427-3fc3349de911?q=80&w=1200&auto=format&fit=crop',
    km: 3100,
    engine: '1923 cc Milwaukee-Eight® 117 V-Twin',
    power: '105 cv / 17.1 kgfm torque',
    description: 'Estilo Cruiser agressivo da Costa Oeste com o colossal motor Milwakee-Eight 117. Torque bruto imediato, suspensão dianteira invertida de alta tecnologia e uma pilotagem visceral. Escapamento esportivo instalado (acompanha original).',
    accentColor: '#FF6600' // Harley Orange
  },
  {
    id: 'yamaha-mt09-sp',
    name: 'MT-09 SP Monster Energy',
    brand: 'Yamaha',
    year: 2023,
    price: 68900,
    category: 'Naked',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=1200&auto=format&fit=crop',
    km: 6700,
    engine: '890 cc CP3 Tricilíndrico Crossplane',
    power: '119 cv',
    description: 'A rainha do torque imediato e agilidade urbana. A versão SP vem com garfos KYB com revestimento DLC, amortecedor traseiro Öhlins totalmente ajustável, piloto automático e acabamento em alumínio escovado anodizado. Puro divertimento.',
    accentColor: '#002FA7' // Yamaha Racing Blue
  }
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec1',
    name: 'Lucas Dorneles',
    city: 'Passo Fundo - RS',
    text: 'Entrei em contato com o Guh Veiga com o sonho de comprar uma GS Adventure. Desde o primeiro zap, o atendimento foi impecável. Conseguiu a melhor taxa de financiamento e entregou a moto perfeita, impecável e revisada aqui na minha casa. Recomendo de olhos fechados a Chelipa Motos!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    motorcycle: 'BMW R 1250 GS'
  },
  {
    id: 'rec2',
    name: 'Carolina Mendes de Souza',
    city: 'Panambi - RS',
    text: 'Melhor atendimento que já tive em uma revenda. O Guh te ajuda em toda a jornada de escolha da moto, tira todas as dúvidas sobre procedência e as parcelas do financiamento couberam perfeitamente no orçamento. Muito feliz com a minha MT-03!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    motorcycle: 'Yamaha MT-03'
  },
  {
    id: 'rec3',
    name: 'Rodrigo Silveira',
    city: 'Cruz Alta - RS',
    text: 'Dei minha moto antiga na troca com uma avaliação super justa que nenhuma concessionária quis fazer. O processo foi 100% digital, transparente e rápido. Guh é um consultor sério que foca em realizar um sonho, não só em empurrar venda.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    motorcycle: 'Honda CB 1000R'
  }
];

export const STATS = [
  { value: '+ 1.500', label: 'Clientes Atendidos pelo Guh' },
  { value: '100%', label: 'Procedência e Satisfação' },
  { value: 'VIP', label: 'Assinatura Guh Veiga' },
  { value: 'RS Inteiro', label: 'Entrega Segura na Portaria' }
];

export const PARTNER_BRANDS: PartnerBrand[] = [
  { name: 'BMW Motorrad' },
  { name: 'Ducati' },
  { name: 'Honda' },
  { name: 'Yamaha' },
  { name: 'Kawasaki' },
  { name: 'Harley-Davidson' },
  { name: 'Triumph' },
  { name: 'Suzuki' }
];
