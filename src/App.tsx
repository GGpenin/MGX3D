import { config, getWhatsAppUrl } from './data';
import { Instagram, MessagesSquare, Cuboid, Settings, Zap, ArrowRight, Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-bg-base text-text-base font-sans selection:bg-primary/30 selection:text-white flex flex-col overflow-x-hidden transition-colors duration-300">
      {/* Header */}
      <header className="w-full border-b border-border-base bg-bg-base/90 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20 relative">
          <div className="flex items-center gap-2 z-10">
            <a href="#" className="font-serif italic text-2xl font-bold tracking-tighter text-text-base flex items-center gap-2">
              <img src="/fotos/logo%20mgx3d.png" alt="MGX3D Logo" className="h-8 object-contain" />
              {config.businessName}
            </a>
            <span className="hidden sm:block text-[10px] uppercase tracking-widest opacity-60 ml-2 mt-1">Portfólio de Impressão 3D</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest font-semibold absolute left-1/2 -translate-x-1/2">
            <a href="#inicio" className="opacity-40 hover:opacity-100 transition-opacity">Início</a>
            <a href="#pedidos-concluidos" className="opacity-40 hover:opacity-100 transition-opacity">Pedidos Concluídos</a>
            <a href="#sobre" className="opacity-40 hover:opacity-100 transition-opacity">Sobre</a>
          </nav>

          <div className="hidden md:flex gap-4 items-center z-10">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-sm border border-transparent hover:border-border-base transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-text-base opacity-70 hover:opacity-100" /> : <Moon className="w-4 h-4 text-text-base opacity-70 hover:opacity-100" />}
            </button>
            <a 
              href={getWhatsAppUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-text-base px-5 py-2 rounded-sm text-[11px] uppercase tracking-widest font-semibold hover:bg-text-base hover:text-bg-base transition-all flex items-center gap-2"
            >
              Orçamento
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-sm border border-transparent hover:border-border-base transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-text-base opacity-70 hover:opacity-100" /> : <Moon className="w-4 h-4 text-text-base opacity-70 hover:opacity-100" />}
            </button>
            <button onClick={toggleMenu} className="text-text-base hover:opacity-70 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-b border-border-base overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col items-center border-t border-border-base bg-bg-base">
                <a href="#inicio" onClick={toggleMenu} className="block text-[11px] uppercase tracking-widest font-semibold opacity-60 w-full text-center hover:opacity-100">Início</a>
                <a href="#pedidos-concluidos" onClick={toggleMenu} className="block text-[11px] uppercase tracking-widest font-semibold opacity-60 w-full text-center hover:opacity-100">Pedidos Concluídos</a>
                <a href="#sobre" onClick={toggleMenu} className="block text-[11px] uppercase tracking-widest font-semibold opacity-60 w-full text-center hover:opacity-100">Sobre</a>
                <a 
                  href={getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 w-full flex justify-center items-center gap-2 bg-text-base text-bg-base px-5 py-3 rounded-sm text-[11px] uppercase tracking-widest font-semibold hover:opacity-90"
                >
                  <MessagesSquare className="w-4 h-4" />
                  Solicitar Orçamento
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        
        {/* Hero Section */}
        <section id="inicio" className="pt-24 md:pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col flex-1 pb-12"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-primary mb-8 text-glow">
              Impressão 3D • Tecnologia • Inovação
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight mb-8">
              Transformando <br /> <span className="italic">projetos</span> em <br /> matéria.
            </h1>
            <p className="max-w-xl mx-auto text-sm leading-relaxed opacity-70 font-light italic mb-10">
              {config.description} Transformamos suas ideias em peças físicas com precisão e materiais de alta qualidade.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-text-base text-bg-base font-medium rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-3 group"
              >
                <span className="text-sm tracking-tight">Conversar no WhatsApp</span>
                <div className="w-6 h-6 rounded-full border border-bg-base/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </a>
              <a 
                href="#pedidos-concluidos"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-text-base/20 text-text-base text-sm font-medium rounded-sm hover:border-text-base/50 transition-all flex items-center justify-center gap-2"
              >
                Pedidos Concluídos
              </a>
            </div>
          </motion.div>
        </section>

        {/* Features/Highlights */}
        <section className="border-y border-border-base bg-bg-alt/50 transition-colors duration-300">
          <div className="mx-auto flex flex-col md:flex-row">
            {[
              { icon: Cuboid, ...config.features[0] },
              { icon: Zap, ...config.features[1] },
              { icon: Settings, ...config.features[2] },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-1 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-border-base last:border-0 flex flex-col justify-center items-center text-center group"
              >
                <div className="w-12 h-12 rounded-full border border-border-base flex items-center justify-center mb-6 group-hover:border-primary transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-serif italic mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-[10px] uppercase tracking-[0.1em] opacity-60 leading-relaxed max-w-[200px]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="pedidos-concluidos" className="py-24 flex flex-col">
          <div className="text-center mb-16 px-6">
            <h2 className="font-serif text-5xl font-bold tracking-tight mb-4 italic">Impressões 3D</h2>
            <p className="text-sm opacity-60 italic max-w-sm mx-auto">
              Confira alguns dos pedidos concluídos por nós. Da modelagem à impressão final, garantimos excelência em cada detalhe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-y border-border-base">
            {config.portfolio.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative border-b md:border-b-0 md:border-r border-border-base last:border-r-0 lg:[&:nth-child(3n)]:border-r-0 min-h-[400px] flex flex-col"
              >
                <div className="flex-1 bg-bg-alt relative overflow-hidden flex items-center justify-center transition-colors">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-center absolute inset-0 opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-bg-base/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 bg-bg-alt z-10 flex flex-col items-center text-center border-t border-border-base transition-colors group-hover:bg-bg-base">
                  <span className="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-60">{item.category}</span>
                  <h3 className="font-serif italic text-xl tracking-tight">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center px-6">
            <p className="text-[11px] uppercase tracking-widest opacity-40 mb-6">Tem um projeto customizado em mente?</p>
            <a 
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-text-base/20 text-text-base text-[11px] uppercase tracking-widest font-semibold rounded-sm hover:border-text-base transition-colors"
            >
              Envie sua ideia
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Call to Action Final */}
        <section className="py-24 relative overflow-hidden flex justify-center px-6">
          <div className="w-full max-w-4xl p-12 bg-text-base text-bg-base rounded-sm text-center flex flex-col items-center shadow-soft">
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
              Pronto para materializar <span className="italic text-primary">seu projeto?</span>
            </h2>
            <p className="text-sm opacity-60 mb-10 max-w-lg mx-auto font-light">
              Nossa equipe está pronta para avaliar seu arquivo 3D ou sua ideia. O orçamento é rápido, fácil e sem compromisso.
            </p>
            
            <a 
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white text-[11px] uppercase tracking-widest font-bold rounded-sm hover:opacity-90 transition-all group box-glow"
            >
              <MessagesSquare className="w-5 h-5" />
              Chamar no WhatsApp ({config.whatsapp.displayNumber})
            </a>
            <p className="text-[9px] uppercase tracking-widest opacity-40 mt-6">
              Atendimento rápido • Focado em qualidade
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="sobre" className="w-full py-8 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-widest opacity-50 border-t border-border-base gap-6 text-center md:text-left transition-colors duration-300">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
          <span>Serviços de Impressão 3D</span>
          <span className="hidden md:inline">•</span>
          <span>{config.businessName}</span>
        </div>
        
        <div className="flex gap-6 italic lowercase font-serif text-[11px] opacity-100 text-text-base">
          <a href={config.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:underline">instagram</a>
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:underline">whatsapp</a>
        </div>
        
        <div>&copy; {new Date().getFullYear()} All Rights Reserved</div>
      </footer>
    </div>
  );
}
