import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOTORCYCLES_DATA } from '../data';
import { Motorcycle } from '../types';
import { Landmark, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react';

interface FinancingCalculatorProps {
  selectedBikeId?: string;
  onBikeChange?: (bikeId: string) => void;
}

export default function FinancingCalculator({ selectedBikeId: externalBikeId, onBikeChange }: FinancingCalculatorProps) {
  const [internalBikeId, setInternalBikeId] = useState<string>(MOTORCYCLES_DATA[0].id);
  
  const selectedBikeId = externalBikeId || internalBikeId;
  const setSelectedBikeId = (id: string) => {
    if (onBikeChange) {
      onBikeChange(id);
    } else {
      setInternalBikeId(id);
    }
  };

  const selectedBike = useMemo(() => {
    return MOTORCYCLES_DATA.find(b => b.id === selectedBikeId) || MOTORCYCLES_DATA[0];
  }, [selectedBikeId]);

  // Initial values setup
  const originalPrice = selectedBike.price;
  const [entrada, setEntrada] = useState<number>(Math.round(originalPrice * 0.3));
  const [parcelas, setParcelas] = useState<number>(36);

  // Sync downpayment whenever of selected bike changes
  useEffect(() => {
    setEntrada(Math.round(selectedBike.price * 0.3));
  }, [selectedBikeId]);

  // Safeguard: make sure down payment stays valid if manually adjusted too high
  useMemo(() => {
    if (entrada > originalPrice) {
      setEntrada(Math.round(originalPrice * 0.9));
    }
  }, [selectedBikeId, originalPrice]);

  // Premium financing math parameters (estimated bank rates for high-performance bikes)
  const jurosMensal = 0.0159; // 1.59% a.m. (super competitive luxury bank rates)

  // Calcule o valor financiamento real
  const saldoAFinanciar = useMemo(() => {
    const s = originalPrice - entrada;
    return s > 0 ? s : 0;
  }, [originalPrice, entrada]);

  // PMT (Payment formula): PMT = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const valorParcela = useMemo(() => {
    if (saldoAFinanciar <= 0) return 0;
    const r = jurosMensal;
    const n = parcelas;
    const pmt = (saldoAFinanciar * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(pmt);
  }, [saldoAFinanciar, parcelas, jurosMensal]);

  // Dynamic Whatsapp construct
  const sendSimulationWhatsApp = () => {
    const formattedPrice = originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const formattedEntrada = entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const formattedParcela = valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const text = `Olá, Guh Veiga! Acabo de simular um financiamento no site da Chelipa Motos.

🏍️ *Moto dos Sonhos:* ${selectedBike.brand} ${selectedBike.name}
💰 *Preço:* ${formattedPrice}
💵 *Entrada:* ${formattedEntrada}
📊 *Plano Escolhido:* ${parcelas} parcelas de ${formattedParcela} mensais (Estimativa)

Gostaria de rodar uma aprovação cadastral e dar continuidade!`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/555597356963?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      {/* Decorative Blur Backing */}
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[120%] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: SIMULATION CONTROLS */}
          <div className="lg:col-span-7 bg-zinc-900/40 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-600/10 text-red-500 rounded-2xl border border-red-500/20">
                  <Landmark size={20} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  Simulador de Parcelas
                </span>
              </div>

              <h3 className="font-display text-3xl font-extrabold tracking-tight text-white mb-6">
                Descubra sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Simulação Personalizada</span>
              </h3>

              {/* Step 1: Select Motorcycle */}
              <div className="mb-8">
                <label className="block font-mono text-xs uppercase text-zinc-400 tracking-wider mb-3">
                  1. Escolha a sua Máquina
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MOTORCYCLES_DATA.map((bike) => (
                    <button
                      key={bike.id}
                      onClick={() => {
                        setSelectedBikeId(bike.id);
                        // automatically adjust downpayment within safe bounds
                        const targetEntrada = Math.round(bike.price * 0.3);
                        setEntrada(targetEntrada);
                      }}
                      className={`text-left p-3 rounded-2xl border transition-all duration-300 ${
                        selectedBikeId === bike.id
                          ? 'bg-red-600/10 border-red-500 text-white shadow-lg shadow-red-600/5'
                          : 'bg-zinc-950/20 border-zinc-800 text-zinc-400 hover:border-zinc-700/50 hover:text-zinc-200'
                      }`}
                    >
                      <p className="text-[10px] font-mono uppercase text-zinc-500">{bike.brand}</p>
                      <p className="text-sm font-bold truncate tracking-tight">{bike.name}</p>
                      <p className="text-xs font-semibold text-red-500 mt-1">
                        {bike.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Slider Down Payment */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <label className="block font-mono text-xs uppercase text-zinc-400 tracking-wider">
                    2. Entrada (Mínimo de 20%)
                  </label>
                  <span className="text-lg font-bold text-white font-mono">
                    {entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(originalPrice * 0.2)}
                  max={Math.round(originalPrice * 0.85)}
                  step={1000}
                  value={entrada}
                  onChange={(e) => setEntrada(Number(e.target.value))}
                  className="w-full accent-red-600 bg-zinc-800 h-1.5 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1.5">
                  <span>20% ({(originalPrice * 0.2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })})</span>
                  <span>85% ({(originalPrice * 0.85).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })})</span>
                </div>
              </div>

              {/* Step 3: Select Contract Length */}
              <div>
                <label className="block font-mono text-xs uppercase text-zinc-400 tracking-wider mb-3">
                  3. Prazo do Financiamento
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[12, 24, 36, 48, 60].map((meses) => (
                    <button
                      key={meses}
                      onClick={() => setParcelas(meses)}
                      className={`py-3 px-2 rounded-xl text-center border font-mono font-bold text-sm transition-all duration-300 ${
                        parcelas === meses
                          ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                          : 'bg-zinc-950/20 border-zinc-800 text-zinc-400 hover:border-zinc-700/50 hover:text-zinc-200'
                      }`}
                    >
                      {meses}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center gap-3 text-xs text-zinc-400 leading-relaxed">
              <HelpCircle size={16} className="text-zinc-500 shrink-0" />
              <span>*Esta é uma estimativa preliminar baseada em taxas de financiamento padrão. Sujeito à análise cadastral bancária conduzida pessoalmente pelo nosso time de vendas.</span>
            </div>
          </div>

          {/* RIGHT: RESULTS DISPLAY */}
          <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-800 rounded-3xl p-6 md:p-10 flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient Accent Light */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[120px] transition-all duration-500" 
              style={{ backgroundColor: `${selectedBike.accentColor}20` }}
            />
            
            <div>
              <div className="flex items-center gap-4 mb-8">
                <img
                  src={selectedBike.image}
                  alt={selectedBike.name}
                  className="w-20 h-16 object-cover rounded-xl border border-zinc-800"
                />
                <div>
                  <span className="font-mono text-[10px] uppercase text-zinc-500 block font-bold leading-none mb-1">
                    Modelo Selecionado
                  </span>
                  <h4 className="font-display text-lg font-bold text-white tracking-tight leading-solid">
                    {selectedBike.brand} {selectedBike.name}
                  </h4>
                  <p className="font-sans text-xs text-zinc-400">
                    Ano {selectedBike.year} • {selectedBike.km.toLocaleString()} km
                  </p>
                </div>
              </div>

              {/* Dynamic summary metric card */}
              <div className="space-y-4 mb-8">
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/80 flex justify-between items-center text-sm">
                  <span className="font-sans text-zinc-400">Valor à vista</span>
                  <span className="font-mono font-bold text-white">
                    {originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/80 flex justify-between items-center text-sm">
                  <span className="font-sans text-zinc-400">Entrada sugerida</span>
                  <span className="font-mono font-bold text-red-550">
                    {entrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/80 flex justify-between items-center text-sm">
                  <span className="font-sans text-zinc-400">Saldo a financiar</span>
                  <span className="font-mono font-bold text-zinc-300">
                    {saldoAFinanciar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </div>

              {/* GIGANTIC PREMIER MONTHLY INSTALMENT RESULTS */}
              <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-zinc-800 flex flex-col justify-center items-center text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-1 font-bold">
                  Estimativa de Parcela
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedBikeId}-${entrada}-${parcelas}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col items-center"
                  >
                    <p className="font-display text-4xl sm:text-5xl font-black text-red-500 tracking-tight">
                      {parcelas}x <span className="text-2xl sm:text-3xl font-extrabold text-white">de</span>
                    </p>
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-1">
                      {valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="w-full mt-4 pt-4 border-t border-zinc-800/50 flex justify-between items-center text-[11px] font-mono text-zinc-400">
                  <span>Taxa a partir de</span>
                  <span className="text-white font-bold ml-1">1.59% a.m.</span>
                </div>
              </div>
            </div>

            {/* DIRECT CALL-TO-ACTION WHATSAPP */}
            <div className="mt-8">
              <button
                onClick={sendSimulationWhatsApp}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-sans font-bold text-base py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-red-650/10 cursor-pointer"
              >
                <MessageCircle size={20} className="fill-white" />
                <span>Enviar Simulação no Whatsapp</span>
                <ArrowRight size={18} />
              </button>
              <p className="text-center font-mono text-[10px] text-zinc-500 uppercase mt-3 tracking-widest font-bold">
                Falar com consultor Guh Veiga
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
