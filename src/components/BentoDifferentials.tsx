import { motion } from 'motion/react';
import { ShieldCheck, Percent, Truck, ClipboardCheck, Award } from 'lucide-react';

export default function BentoDifferentials() {
  const cards = [
    {
      id: 1,
      title: 'Melhor Atendimento do RS',
      description: 'Consultoria exclusiva de vendas conduzida por Guh Veiga, focada no seu sonho. Atendimento humanizado, transparente e focado na sua total satisfação, do primeiro clique até a entrega das chaves.',
      icon: Award,
      size: 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-zinc-900/90 to-zinc-950/95 border-red-600/30',
      tag: 'Destaque',
      highlight: true
    },
    {
      id: 2,
      title: 'Financiamento Facilitado',
      description: 'Taxas exclusivas em até 60x através dos principais bancos do Brasil. APROVAÇÃO RÁPIDA pelo WhatsApp.',
      icon: Percent,
      size: 'md:col-span-1 md:row-span-1 bg-zinc-900/30 backdrop-blur-md border-zinc-800/80',
      tag: 'Flexibilidade',
    },
    {
      id: 3,
      title: 'Laudo de Procedência 100%',
      description: 'Todas as nossas motocicletas passam por rigoroso laudo cautelar e revisão detalhada.',
      icon: ShieldCheck,
      size: 'md:col-span-1 md:row-span-1 bg-zinc-900/30 backdrop-blur-md border-zinc-800/80',
      tag: 'Segurança',
    },
    {
      id: 4,
      title: 'Avaliação Justa do seu Usado',
      description: 'Garantimos uma excelente precificação na moto que você já possui como parte do pagamento do seu novo brinquedo.',
      icon: ClipboardCheck,
      size: 'md:col-span-1 md:row-span-1 bg-zinc-900/30 backdrop-blur-md border-zinc-800/80',
      tag: 'Troca',
    },
    {
      id: 5,
      title: 'Entrega na sua Porta (RS)',
      description: 'Infraestrutura de frete seguro próprio. Entregamos a moto higienizada e com tanque cheio diretamente na sua casa em qualquer cidade do Rio Grande do Sul.',
      icon: Truck,
      size: 'md:col-span-2 md:row-span-1 bg-zinc-900/40 backdrop-blur-xl border-zinc-800/80',
      tag: 'Comodidade',
    }
  ];

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      {/* Dynamic typography headers */}
      <div className="text-center mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-500 font-bold block mb-3">
          Por que a Chelipa?
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
          A Diferença de Escolher o <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Premium</span>
        </h2>
        <p className="font-sans text-zinc-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          Nossa operação é desenhada para quem exige perfeição, rapidez e segurança máxima na compra da próxima máquina de duas rodas.
        </p>
      </div>

      <motion.div 
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]"
      >
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                borderColor: card.highlight ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.25)',
                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)' 
              }}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${card.size}`}
            >
              {/* Subtle Ambient Light Glow */}
              {card.highlight && (
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              <div className="flex justify-between items-start z-10">
                <span className={`text-[10px] font-mono tracking-widest uppercase py-1 px-3 rounded-full font-bold ${
                  card.highlight 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/25' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
                }`}>
                  {card.tag}
                </span>
                
                <div className={`p-3 rounded-2xl ${
                  card.highlight 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/25' 
                    : 'bg-zinc-800/50 text-zinc-300'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
              </div>

              <div className="mt-4 z-10">
                <h3 className={`font-display text-xl font-bold tracking-tight mb-2 ${
                  card.highlight ? 'text-white text-2xl md:text-3xl' : 'text-zinc-100'
                }`}>
                  {card.title}
                </h3>
                <p className={`font-sans text-sm leading-relaxed ${
                  card.highlight ? 'text-zinc-300 text-base max-w-lg' : 'text-zinc-400'
                }`}>
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
