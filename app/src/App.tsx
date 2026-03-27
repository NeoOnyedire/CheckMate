import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { ChessGate } from '@/components/chess/ChessGate';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { useSessionStorage } from '@/hooks/useLocalStorage';
import './App.css';

function App() {
  const [gateStatus, setGateStatus] = useSessionStorage<'pending' | 'completed'>('chess-gate-status', 'pending');
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGateComplete = useCallback((result: 'won' | 'lost' | 'draw' | 'skipped') => {
    setGateStatus('completed');
    
    // Show toast message based on result
    if (result === 'won') {
      import('sonner').then(({ toast }) => {
        toast.success('Checkmate! Welcome to my portfolio!', {
          description: 'You defeated the AI. Great strategic thinking!',
        });
      });
    } else if (result === 'skipped') {
      import('sonner').then(({ toast }) => {
        toast.info('Welcome to my portfolio!', {
          description: 'Feel free to explore my work.',
        });
      });
    }

    // Animate transition to portfolio
    setTimeout(() => {
      setShowPortfolio(true);
    }, 500);
  }, [setGateStatus]);

  const handleResetGate = useCallback(() => {
    setGateStatus('pending');
    setShowPortfolio(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    import('sonner').then(({ toast }) => {
      toast.info('Chess Gate Reset', {
        description: 'Play again to re-enter the portfolio!',
      });
    });
  }, [setGateStatus]);

  const scrollToSection = useCallback((section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Check if gate was already completed in this session
  useEffect(() => {
    if (gateStatus === 'completed') {
      setShowPortfolio(true);
    }
  }, [gateStatus]);

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#1a1a2e',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
          },
        }}
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#0f0f23] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-6xl mb-4 animate-pulse">♟</div>
              <h2 className="text-2xl font-bold gradient-text mb-2">Loading Game...</h2>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-[#81b64c] to-[#b58863]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <AnimatePresence mode="wait">
          {!showPortfolio ? (
            <motion.div
              key="chess-gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <ChessGate onComplete={handleGateComplete} />
            </motion.div>
          ) : (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Navigation onResetGate={handleResetGate} />
              
              <main>
                <div id="hero">
                  <Hero onScrollToSection={scrollToSection} />
                </div>
                
                <div className="section-divider" />
                
                <Projects />
                
                <div className="section-divider" />
                
                <Skills />
                
                <div className="section-divider" />
                
                <About />
                
                <div className="section-divider" />
                
                <Contact />
              </main>
              
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;
