import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MOTORCYCLES_DATA, 
  RECOMMENDATIONS, 
  STATS, 
  PARTNER_BRANDS 
} from './data';
import BentoDifferentials from './components/BentoDifferentials';
import Showroom from './components/Showroom';
import FinancingCalculator from './components/FinancingCalculator';
// @ts-ignore
import vendedorHero from './assets/images/vendedor_hero_1780620686213.png';
import { 
  Instagram, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  MessageCircle, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Menu, 
  X,
  Map 
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedSimulationId, setSelectedSimulationId] = useState<string>(MOTORCYCLES_DATA[0].id);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % RECOMMENDATIONS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + RECOMMENDATIONS.length) % RECOMMENDATIONS.length);
  };

  // Selection link from Showroom to Financing Simulator
  const handleSimulateSelect = (bikeId: string) => {
    setSelectedSimulationId(bikeId);
    scrollToSection('simulador');
    // We let the FinancingCalculator pick this up via state sync inside template container
  };

  return (
    <div className="min-h-screen bg-[#050507] text-white overflow-x-hidden selection:bg-red-650 selection:text-white">
      
      {/* 1. GLASSMORPHISM NAVBAR */}
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-900/80 transition-all duration-300">
         <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-lg blur-[8px] opacity-40 animate-pulse" />
              <div className="relative bg-black text-red-500 font-display font-black text-xl italic px-3 py-1.5 rounded-lg border border-red-600/30">
                GUH VEIGA
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-widest text-zinc-100 block">CHELIPA MOTOS</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-zinc-500 block">Consultor Exclusivo • RS</span>
            </div>
          </div>

          {/* Desktop navigation items */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider font-bold text-zinc-400">
            <button onClick={() => scrollToSection('showroom')} className="hover:text-red-500 transition-colors uppercase cursor-pointer">Showroom</button>
            <button onClick={() => scrollToSection('diferenciais')} className="hover:text-red-500 transition-colors uppercase cursor-pointer">Diferenciais</button>
            <button onClick={() => scrollToSection('simulador')} className="hover:text-red-500 transition-colors uppercase cursor-pointer">Simulador</button>
            <button onClick={() => scrollToSection('quem-somos')} className="hover:text-red-500 transition-colors uppercase cursor-pointer">Guh Veiga</button>
            <button onClick={() => scrollToSection('localizacao')} className="hover:text-red-500 transition-colors uppercase cursor-pointer">Contato</button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://instagram.com/guh_veiga01" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all"
            >
              <Instagram size={18} />
            </a>
            <button 
              onClick={() => scrollToSection('simulador')}
              className="bg-red-600 hover:bg-red-500 text-white font-sans font-extrabold text-xs py-2.5 px-5 rounded-xl transition-all shadow-md shadow-red-600/10 cursor-pointer"
            >
              Simular Parcelas
            </button>
          </div>

          {/* Mobile hamburger icon menu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] bottom-0 bg-[#060608] z-30 flex flex-col p-6 border-b border-zinc-900 justify-between md:hidden"
          >
            <div className="space-y-6 flex flex-col text-center pt-8">
              <button onClick={() => scrollToSection('showroom')} className="font-display text-2xl font-bold text-zinc-300 hover:text-red-500 transition-colors">SHOWROOM</button>
              <button onClick={() => scrollToSection('diferenciais')} className="font-display text-2xl font-bold text-zinc-300 hover:text-red-500 transition-colors">DIFERENCIAIS</button>
              <button onClick={() => scrollToSection('simulador')} className="font-display text-2xl font-bold text-zinc-300 hover:text-red-500 transition-colors">SIMULADOR</button>
              <button onClick={() => scrollToSection('quem-somos')} className="font-display text-2xl font-bold text-zinc-300 hover:text-red-500 transition-colors">O CONSULTOR</button>
              <button onClick={() => scrollToSection('localizacao')} className="font-display text-2xl font-bold text-zinc-300 hover:text-red-500 transition-colors">CONTATO & LOCALIZAÇÃO</button>
            </div>
            
            <div className="space-y-4 pb-12">
              <a 
                href="https://wa.me/555597356963" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-red-600 text-white font-sans font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-red-600/10"
              >
                <Phone size={18} />
                <span>Conversar via WhatsApp</span>
              </a>
              <div className="flex gap-4 justify-center items-center">
                <a href="https://instagram.com/guh_veiga01" target="_blank" rel="noreferrer" className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full">
                  <Instagram size={18} />
                </a>
                <span className="text-zinc-500 text-xs font-mono font-bold">@chelipa_oficial</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DYNAMICAL PREMIER HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16">
        {/* Cinematic Backdrop with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/50 to-black/40 z-10" />
          <div className="absolute inset-0 bg-[#050507] opacity-75 z-10" />
          {/* Subtle warm red glow from right side */}
          <div className="absolute right-0 bottom-0 top-1/4 w-[60%] bg-red-600/10 rounded-full blur-[140px] z-10 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=1920&auto=format&fit=crop"
            alt="Chelipa Motos Showroom Background"
            className="w-full h-full object-cover scale-102 filter brightness-[0.35] contrast-[1.05] grayscale-[20%]"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 w-full animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-650/10 border border-red-600/20 mb-6 backdrop-blur-md"
              >
                <Sparkles size={14} className="text-red-500 animate-spin-slow animate-pulse" />
                <span className="font-mono text-[9px] md:text-xs uppercase tracking-widest text-red-400 font-extrabold">
                  CONSULTORIA EXCLUSIVA GUH VEIGA
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight mb-6 text-white"
              >
                SUA MOTO PREMIUM <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700">
                  POR GUH VEIGA
                </span> <br />
                O TOPO DO RS
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="font-sans text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10"
              >
                Bem-vindo ao canal exclusivo de <span className="text-red-500 font-bold">Guh Veiga</span>, especialista em curadoria de alta cilindrada na <span className="text-white font-bold">Chelipa Motos</span>. Planeje sua conquista com atendimento VIP, menores taxas de financiamento do RS e entrega em casa.
              </motion.p>

              {/* Pulsing CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() => scrollToSection('showroom')}
                  className="bg-red-600 hover:bg-red-500 text-white font-sans font-extrabold text-base py-4.5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-102 shadow-lg shadow-red-650/20 active:scale-98 cursor-pointer group"
                >
                  <span>Explorar Showroom Digital</span>
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('simulador')}
                  className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white py-4.5 px-8 rounded-2xl text-base font-sans font-bold border border-zinc-800/80 backdrop-blur-md transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Compass size={18} className="text-red-500" />
                  Simular Financiamento
                </button>
              </motion.div>
            </div>

            {/* Hero Right Visual Card - Featuring Guh Veiga Directly */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 w-full">
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 120, delay: 0.2 }}
                className="relative bg-zinc-950/40 p-4 rounded-[36px] border border-zinc-900 backdrop-blur-md overflow-hidden group shadow-2xl max-w-md mx-auto"
              >
                {/* Visual Accent Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-red-650/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-zinc-900 border border-zinc-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/5 to-transparent z-15" />
                  
                  <img
                    src={vendedorHero}
                    alt="Guh Veiga - Seu Consultor Premium"
                    className="w-full h-full object-cover filter saturate-[1.05] brightness-[1.0] group-hover:scale-102 transition-transform duration-700"
                  />

                  {/* Absolute info banner overlay */}
                  <div className="absolute bottom-5 left-5 right-5 z-20 bg-black/75 backdrop-blur-md p-4 rounded-2xl border border-zinc-800">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#E30613] font-black block mb-1">
                      CONSULTOR PREMIUM OFICIAL
                    </span>
                    <h4 className="font-display text-xl font-bold tracking-tight text-white mb-1 leading-none">
                      Guh Veiga
                    </h4>
                    <p className="font-sans text-xs text-zinc-400">
                      Curadoria vip e soluções de crédito feitas sob medida para você acelerar no Rio Grande do Sul.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PARTNER BRAND INFINITE MARQUEE */}
      <section className="bg-zinc-950 border-y border-zinc-900/80 py-8 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050507] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050507] to-transparent z-10 pointer-events-none" />

        <div className="flex select-none">
          {/* Running loop */}
          <div className="flex gap-16 whitespace-nowrap animate-marquee pr-16 items-center">
            {Array(3).fill(PARTNER_BRANDS).flat().map((brand, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <span className="text-red-500 font-extrabold text-[15px] italic font-display">★</span>
                <span className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-default text-lg font-display tracking-wider font-extrabold uppercase">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATISTICS AND METRICS */}
      <section className="py-16 border-b border-zinc-900/60 relative bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center relative">
                <p className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                  {stat.value}
                </p>
                <div className="w-10 h-[3px] bg-red-600 mx-auto mb-4 rounded-full" />
                <p className="font-sans text-xs md:text-sm text-zinc-500 uppercase font-bold tracking-widest leading-none">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SHOWROOM CATALOG */}
      <section id="showroom" className="py-24 md:py-32 relative">
        <Showroom onSimulateSelect={handleSimulateSelect} />
      </section>

      {/* 6. BUSINESS DIFFERENTIALS BENTO GRID */}
      <section id="diferenciais" className="py-24 md:py-32 bg-gradient-to-b from-[#050507] to-zinc-950/60 border-y border-zinc-900/60 relative">
        <BentoDifferentials />
      </section>

      {/* 7. DYNAMIC SIMULATOR SECTION */}
      <section id="simulador" className="py-24 md:py-32 relative">
        <div className="text-center mb-16 px-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 font-bold block mb-3">
            O Ponto de Partida
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Planeje o Próximo <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Acelere</span>
          </h2>
          <p className="font-sans text-zinc-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Personalize os termos de financiamento simulando a entrada e o plano de parcelamento para ver qual plano se adequa aos seus objetivos.
          </p>
        </div>
        
        {/* Directly mount calculator with synced selectable model */}
        <FinancingCalculator selectedBikeId={selectedSimulationId} onBikeChange={setSelectedSimulationId} />
      </section>

      {/* 8. EXPERT GUIDANCE ABOUT PROFILE (Guh Veiga) */}
      <section id="quem-somos" className="py-24 md:py-32 bg-zinc-950/40 relative border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Profile Pix */}
            <div className="lg:col-span-5 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-650/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative border border-zinc-800 p-4 rounded-[40px] bg-zinc-950/80 shadow-2xl overflow-hidden group">
                <div className="absolute top-6 left-6 z-20 bg-red-600 text-white font-mono text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                  Consultor de Sonhos
                </div>

                <div className="relative aspect-[3/4] rounded-[28px] overflow-hidden bg-zinc-900 border border-zinc-800">
                  <img
                    src={vendedorHero}
                    alt="Guh Veiga - Consultor de Vendas Chelipa Motos"
                    className="w-full h-full object-cover filter saturate-[0.8] contrast-[1.05] brightness-[0.9] group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />

                  {/* Absolute visual profile stats badge */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/60 backdrop-blur-xl border border-zinc-800/80 p-5 rounded-2xl">
                    <p className="font-display text-white font-extrabold text-lg tracking-tight mb-1">Guh Veiga</p>
                    <p className="font-sans text-xs text-red-500 font-semibold mb-3">@guh_veiga01</p>
                    <div className="flex justify-between border-t border-zinc-800 pt-3 text-[10px] font-mono uppercase text-zinc-400 font-bold">
                      <span>15 posts</span>
                      <span>1.690 segs</span>
                      <span>Panambi - RS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column copy presentation elements */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 font-black block mb-3">
                Conheça quem te atende
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                Sua Parceria com o <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Guh Veiga</span>
              </h2>
              
              <div className="space-y-6 text-zinc-400 font-sans text-base md:text-lg leading-relaxed mb-8">
                <p>
                  Comprar uma motocicleta premium é muito mais do que assinar um contrato; é a coroação de uma meta, a materialização de um ideal de liberdade. Por isso, você merece um atendimento que valoriza o seu tempo e o seu esforço.
                </p>
                <p>
                  Sou <span className="text-white font-semibold">Guh Veiga</span>, consultor estratégico especialista em alta cilindrada e importadas na <span className="text-white font-semibold">Chelipa Motos (@chelipa_oficial)</span>. Minha missão é entender as suas necessidades e mediar uma negociação clara, rápida e 100% segura. 
                </p>
                <p>
                  Garantimos avaliações honestas no seu seminovo, assessoria total de documentação tributária e trabalhamos ativamente com bancos líderes de mercado para arrancar as menores taxas de financiamento possíveis para você.
                </p>
              </div>

              {/* Direct Link Options details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://wa.me/555597356963"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 p-5 rounded-2xl flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block font-bold">whatsapp oficial</span>
                      <span className="font-sans text-sm font-extrabold text-white">(55) 9735-6963</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://instagram.com/guh_veiga01"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 p-5 rounded-2xl flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl">
                      <Instagram size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase block font-bold">perfil instagram</span>
                      <span className="font-sans text-sm font-extrabold text-white">@guh_veiga01</span>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. REAL REVIEWS CAROUSEL SOCIAL PROOF */}
      <section className="py-24 md:py-32 bg-[#050507] border-y border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 font-bold block mb-3">
            Histórias de Sucesso
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white mb-12">
            O Que Dizem Nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Clientes</span>
          </h2>

          <div className="relative bg-zinc-950/40 border border-zinc-900 rounded-[32px] p-8 md:p-14 backdrop-blur-md overflow-hidden min-h-[300px] flex flex-col justify-between">
            {/* Background glowing quote icon */}
            <span className="absolute top-6 right-10 text-8xl font-black font-display text-zinc-900/40 pointer-events-none select-none">
              “
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                {/* Rating Stars stars */}
                <div className="flex gap-1 mb-6 text-red-500">
                  {Array(RECOMMENDATIONS[activeTestimonial].rating).fill(null).map((_, i) => (
                    <Star key={i} size={16} className="fill-red-500" />
                  ))}
                </div>

                <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 italic leading-relaxed mb-8 max-w-2xl">
                  "{RECOMMENDATIONS[activeTestimonial].text}"
                </p>

                <div className="flex items-center gap-4 text-left">
                  <img
                    src={RECOMMENDATIONS[activeTestimonial].avatar}
                    alt={RECOMMENDATIONS[activeTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover border border-zinc-800"
                  />
                  <div>
                    <h4 className="font-display font-extrabold text-white text-base leading-none mb-1">
                      {RECOMMENDATIONS[activeTestimonial].name}
                    </h4>
                    <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold leading-none block">
                      {RECOMMENDATIONS[activeTestimonial].city} • Moto comprada: <span className="text-red-500">{RECOMMENDATIONS[activeTestimonial].motorcycle}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider navigations */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-zinc-900 gap-4">
              <span className="font-mono text-[11px] text-zinc-600 font-bold uppercase tracking-wider">
                Depoimento {activeTestimonial + 1} de {RECOMMENDATIONS.length}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-850 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:bg-zinc-850 active:scale-95 transition-all cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. LOCALIZATION, ADDRESS, AND OPENING HOURS */}
      <section id="localizacao" className="py-24 md:py-32 relative bg-[#050507]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            
            {/* Left information list details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 font-bold block mb-3">
                  Venha nos visitar
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
                  Visite Nosso <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Showroom</span> Físico
                </h2>
                <p className="font-sans text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                  Estamos localizados no coração de Panambi - RS, com uma estrutura moderna, climatizada e equipada com cafezinho quente para te receber e debater ideias.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-2xl shrink-0 h-12 w-12 flex items-center justify-center">
                    <MapPin size={20} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block font-bold leading-none mb-1">Localização</span>
                    <p className="font-sans text-sm text-zinc-100 font-bold">Chelipa Motos</p>
                    <p className="font-sans text-xs text-zinc-400">Avenida 7 de Setembro, 885 • Centro</p>
                    <p className="font-sans text-xs text-zinc-400">Panambi - RS, 98280-000 • Brasil</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-2xl shrink-0 h-12 w-12 flex items-center justify-center">
                    <Clock size={20} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block font-bold leading-none mb-1">Horário de Atendimento</span>
                    <p className="font-sans text-xs text-zinc-300 font-bold">Segunda a Sexta:</p>
                    <p className="font-sans text-xs text-zinc-400 mb-1">08:00 às 12:00 • 13:30 às 18:00</p>
                    <p className="font-sans text-xs text-zinc-300 font-bold">Sábados:</p>
                    <p className="font-sans text-xs text-zinc-400">08:00 às 12:00</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-2xl shrink-0 h-12 w-12 flex items-center justify-center">
                    <Phone size={20} className="text-red-500" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block font-bold leading-none mb-1">Canais de Contato</span>
                    <p className="font-sans text-xs text-zinc-400">WhatsApp: <span className="font-bold text-zinc-300">+55 55 9735-6963</span></p>
                    <p className="font-sans text-xs text-zinc-400">Falar com: Guh Veiga</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information Interactive Embed Map container */}
            <div className="lg:col-span-7 relative h-[380px] lg:h-auto rounded-3xl overflow-hidden border border-zinc-900/60 bg-zinc-950 shadow-2xl flex flex-col justify-center items-center text-center p-6 group">
              {/* Modern Ambient Glowing Backdrop */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#050507]/90 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=900&auto=format&fit=crop"
                  alt="Store front blurred map background"
                  className="w-full h-full object-cover filter blur-[4px] opacity-15"
                />
              </div>

              {/* Centered Directions card to open in Google Maps */}
              <div className="relative z-20 max-w-md mx-auto space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-red-650/10 text-red-500 flex items-center justify-center mx-auto border border-red-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Map size={32} />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-display text-xl font-bold text-white tracking-tight">Rota Facilitada para Panambi - RS</h4>
                  <p className="font-sans text-xs text-zinc-400 line-clamp-2">
                    Clique abaixo para traçar a melhor rota usando Waze ou Google Maps e venha conferir nossa vitrine pessoalmente no Centro de Panambi.
                  </p>
                </div>

                <button
                  onClick={() => window.open('https://maps.google.com/?q=Avenida+7+de+Setembro,+885,+Panambi+RS,+98280-000', '_blank')}
                  className="inline-flex bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-300 font-sans font-bold text-xs py-3 px-6 rounded-2xl items-center gap-2 transition-all cursor-pointer"
                >
                  <MapPin size={14} className="text-red-500" />
                  Como Chegar no Google Maps
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER MINIMALIST WITH ZERO AI CREDIT LINES */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-900 pb-12 mb-12 gap-8">
            <div className="flex items-center gap-3">
              <div className="bg-black text-red-500 font-display font-black text-lg italic px-2 py-1 rounded border border-red-500/20">
                CHELIPA
              </div>
              <div>
                <span className="font-display font-bold text-xs tracking-widest text-zinc-200 block">CHELIPA MOTOS</span>
                <span className="font-mono text-[7px] uppercase tracking-widest text-zinc-600 block">Compra, Venda e Financiamentos</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">
              <button onClick={() => scrollToSection('navbar')} className="hover:text-zinc-300 cursor-pointer">Início</button>
              <button onClick={() => scrollToSection('showroom')} className="hover:text-zinc-300 cursor-pointer">Showroom</button>
              <button onClick={() => scrollToSection('diferenciais')} className="hover:text-zinc-300 cursor-pointer">Diferenciais</button>
              <button onClick={() => scrollToSection('simulador')} className="hover:text-zinc-300 cursor-pointer">Simulador</button>
              <button onClick={() => scrollToSection('quem-somos')} className="hover:text-zinc-300 cursor-pointer">O Consultor</button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-zinc-600 font-mono gap-4">
            <div className="space-y-1">
              <p>© {new Date().getFullYear()} Chelipa Motos. Todos os direitos reservados.</p>
              <p className="text-[10px] text-zinc-700">CNPJ sob consulta • Avenida 7 de Setembro, 885, Panambi RS, 98280-000, Brasil</p>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://wa.me/555597356963" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-zinc-400 flex items-center gap-1 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Atendimento Rápido WhatsApp
              </a>
              <span className="text-zinc-800">|</span>
              <a 
                href="https://instagram.com/guh_veiga01" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-zinc-400 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
