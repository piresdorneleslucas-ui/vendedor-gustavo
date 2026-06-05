import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOTORCYCLES_DATA } from '../data';
import { Motorcycle } from '../types';
import { Info, MessageCircle, Calendar, Gauge, Bolt, CornerDownRight, X, Sparkles, Sliders } from 'lucide-react';

interface ShowroomProps {
  onSimulateSelect: (bikeId: string) => void;
}

export default function Showroom({ onSimulateSelect }: ShowroomProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedBike, setSelectedBike] = useState<Motorcycle | null>(null);

  const categories = ['Todos', 'Carenadas', 'Naked', 'Adventure', 'Custom'];

  const filteredBikes = useMemo(() => {
    if (activeCategory === 'Todos') return MOTORCYCLES_DATA;
    return MOTORCYCLES_DATA.filter(bike => bike.category === activeCategory);
  }, [activeCategory]);

  const handleWhatsAppInquire = (bike: Motorcycle) => {
    const text = `Olá Guh Veiga! Vi a máquina ${bike.brand} ${bike.name} (${bike.year}) no showroom digital.

Fiquei extremamente interessado e gostaria de mais fotos, vídeos de detalhes e saber quais são as formas de pagamento disponíveis. Obrigado!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/555597356963?text=${encoded}`, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      {/* Header Description */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 font-black block mb-3">
            Explorar Máquinas
          </span>
          <h2 id="catalogo-titulo" className="font-display text-4xl md:text-5xl font-black text-white tracking-tight">
            Nossa Seleção <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Premium</span>
          </h2>
        </div>

        {/* Categories Tab navigation */}
        <div className="flex flex-wrap gap-2 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800/80">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono select-none transition-all duration-300 rounded-xl relative ${
                activeCategory === cat ? 'text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategoryBg"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-red-600 rounded-lg text-white"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredBikes.map((bike) => (
            <motion.div
              layout
              key={bike.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-zinc-950/40 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl relative group flex flex-col justify-between"
            >
              {/* Card visual showcase */}
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                
                {/* Brand watermark background */}
                <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800 text-[10px] font-mono tracking-wider font-bold text-zinc-300">
                  {bike.category}
                </div>

                <div 
                  className="absolute top-4 right-4 z-20 w-3 h-3 rounded-full blur-[4px]"
                  style={{ backgroundColor: bike.accentColor }}
                />

                <img
                  src={bike.image}
                  alt={bike.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs uppercase tracking-dark text-zinc-500 font-bold">
                      {bike.brand}
                    </span>
                    <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5 bg-zinc-900/60 px-2 py-0.5 rounded-lg border border-zinc-800">
                      <Calendar size={13} className="text-red-550/70" />
                      {bike.year}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white mb-4">
                    {bike.name}
                  </h3>

                  {/* Micro Specs */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-zinc-950/50 p-3 rounded-2xl border border-zinc-900 flex items-center gap-2.5">
                      <Gauge size={16} className="text-zinc-500" />
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-600 block">Km Rodados</span>
                        <span className="font-sans text-xs font-semibold text-zinc-300">{bike.km.toLocaleString()} km</span>
                      </div>
                    </div>
                    <div className="bg-zinc-950/50 p-3 rounded-2xl border border-zinc-900 flex items-center gap-2.5">
                      <Bolt size={16} className="text-zinc-500" />
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-600 block">Potência</span>
                        <span className="font-sans text-xs font-semibold text-zinc-300">{bike.power}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive action triggers */}
                <div>
                  <div className="flex justify-between items-end border-t border-zinc-900 pt-5 mb-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-zinc-500 block leading-none">Oportunidade</span>
                      <span className="font-display text-2xl font-extrabold text-red-500 mt-1 block">
                        {bike.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[9px] text-zinc-500 block uppercase">Est. Parcela</span>
                      <span className="font-mono text-xs font-semibold text-zinc-400">
                        36x R$ {(bike.price * 0.038).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedBike(bike)}
                      className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white py-3.5 px-3 rounded-2xl text-xs font-sans font-bold border border-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Info size={14} />
                      Ficha Completa
                    </button>
                    <button
                      onClick={() => handleWhatsAppInquire(bike)}
                      className="bg-red-600 hover:bg-red-500 text-white py-3.5 px-3 rounded-2xl text-xs font-sans font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-600/5 cursor-pointer"
                    >
                      <MessageCircle size={14} className="fill-white" />
                      Garantir Moto
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* DRAWER / SPECIFICATION OVERLAY MODAL */}
      <AnimatePresence>
        {selectedBike && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none bg-black/80 backdrop-blur-md">
            {/* Modal backdrop closer clicker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={() => setSelectedBike(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-zinc-950 border border-zinc-800 max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              {/* Visual header */}
              <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
                <button
                  onClick={() => setSelectedBike(null)}
                  className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white border border-zinc-800 hover:scale-105 transition-transform"
                >
                  <X size={20} />
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/10 z-10" />

                <div className="absolute bottom-6 left-6 md:left-10 z-20">
                  <span className="font-mono text-xs uppercase tracking-widest text-red-500 font-black block mb-2">
                    {selectedBike.brand}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {selectedBike.name}
                  </h3>
                </div>

                <img
                  src={selectedBike.image}
                  alt={selectedBike.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Technical breakdown */}
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Copy description */}
                  <div className="md:col-span-2">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold mb-3 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-500" />
                      Histórico & Apresentação
                    </h4>
                    <p className="font-sans text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
                      {selectedBike.description}
                    </p>

                    <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4">
                      Especificações Técnicas
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/80">
                        <span className="font-mono text-[10px] text-zinc-600 block uppercase">Motor</span>
                        <span className="font-sans text-sm font-semibold text-white mt-1 block">{selectedBike.engine}</span>
                      </div>
                      <div className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/80">
                        <span className="font-mono text-[10px] text-zinc-600 block uppercase">Potência Máxima</span>
                        <span className="font-sans text-sm font-semibold text-white mt-1 block">{selectedBike.power}</span>
                      </div>
                      <div className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/80">
                        <span className="font-mono text-[10px] text-zinc-600 block uppercase">Ano / Modelo</span>
                        <span className="font-sans text-sm font-semibold text-white mt-1 block">{selectedBike.year}</span>
                      </div>
                      <div className="bg-zinc-900/30 p-4 rounded-2xl border border-zinc-800/80">
                        <span className="font-mono text-[10px] text-zinc-600 block uppercase">Status de Rodagem</span>
                        <span className="font-sans text-sm font-semibold text-white mt-1 block">
                          {selectedBike.km === 0 ? 'Zero Km' : `${selectedBike.km.toLocaleString()} Km originais`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Pricing */}
                  <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wide text-zinc-500 block">Investimento</span>
                      <p className="font-display text-3xl font-extrabold text-red-500 mt-1 mb-6">
                        {selectedBike.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                      </p>

                      <div className="space-y-4 mb-6 border-b border-zinc-800/80 pb-6 text-xs text-zinc-400 font-sans">
                        <div className="flex items-center gap-2">
                          <CornerDownRight size={13} className="text-red-500" />
                          <span>Procedência Cautelar de Elite</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CornerDownRight size={13} className="text-red-500" />
                          <span>100% revisada com garantia premium</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CornerDownRight size={13} className="text-red-500" />
                          <span>Entregamos em todo o RS</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleWhatsAppInquire(selectedBike)}
                        className="w-full bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-2xl text-xs font-sans font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <MessageCircle size={16} className="fill-white" />
                        Garantir Máquina
                      </button>
                      <button
                        onClick={() => {
                          onSimulateSelect(selectedBike.id);
                          setSelectedBike(null);
                        }}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 px-4 rounded-2xl text-xs font-sans font-bold flex items-center justify-center gap-2 border border-zinc-700/50 transition-colors cursor-pointer"
                      >
                        <Sliders size={16} />
                        Simular Financiamento
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
