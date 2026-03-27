import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onResetGate: () => void;
}

const navItems = [
  { label: 'Home', href: 'hero' },
  { label: 'Projects', href: 'projects' },
  { label: 'Skills', href: 'skills' },
  { label: 'About', href: 'about' },
  { label: 'Contact', href: 'contact' },
];

export const Navigation = ({ onResetGate }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.href));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].href);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0f0f23]/90 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#81b64c] to-[#6a9a3d] rounded-lg flex items-center justify-center">
                <span className="text-lg text-white">♔</span>
              </div>
              <span className="font-bold text-white group-hover:text-[#81b64c] transition-colors">
                Neo.O
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.href
                      ? 'text-[#81b64c] bg-[#81b64c]/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Reset Gate Button */}
              <Button
                onClick={onResetGate}
                variant="outline"
                size="sm"
                className="ml-4 flex items-center gap-2 bg-white/5 border-white/20 text-gray-300 hover:bg-[#81b64c]/20 hover:text-[#81b64c] hover:border-[#81b64c]/30"
              >
                <RotateCcw className="w-4 h-4" />
                Replay
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden"
          >
            <div className="bg-[#0f0f23]/95 backdrop-blur-md border-b border-white/10 p-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                      activeSection === item.href
                        ? 'text-[#81b64c] bg-[#81b64c]/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={onResetGate}
                  className="w-full px-4 py-3 rounded-lg text-left text-sm font-medium text-gray-400 hover:text-[#81b64c] hover:bg-[#81b64c]/10 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Replay Chess Gate
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
