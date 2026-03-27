import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onScrollToSection: (section: string) => void;
}

export const Hero = ({ onScrollToSection }: HeroProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Chess Pieces */}
        <motion.div
          className="absolute top-20 left-[10%] text-6xl opacity-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ♔
        </motion.div>
        <motion.div
          className="absolute top-40 right-[15%] text-5xl opacity-10"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          ♕
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-[20%] text-4xl opacity-10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          ♘
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-[10%] text-5xl opacity-10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        >
          ♗
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#81b64c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#b58863]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-4xl"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#81b64c]/10 border border-[#81b64c]/30 rounded-full text-[#81b64c] text-sm font-medium">
            <span className="w-2 h-2 bg-[#81b64c] rounded-full animate-pulse" />
            Software Engineering Student @ WeThinkCode_
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-white">Neo</span>{' '}
          <span className="gradient-text">Onyedire</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-400 mb-8 font-light"
        >
          Building systems,{' '}
          <span className="text-[#81b64c] font-medium">one move at a time</span>
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Passionate software engineer crafting elegant solutions to complex problems.
          I approach every project like a chess game — strategic, thoughtful, and always
          thinking several moves ahead.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button
            onClick={() => onScrollToSection('projects')}
            className="btn-chess flex items-center gap-2"
          >
            <span>View My Work</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onScrollToSection('contact')}
            variant="outline"
            className="btn-chess-outline"
          >
            Get In Touch
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="https://github.com/NeoOnyedire"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#81b64c] hover:border-[#81b64c]/50 hover:bg-[#81b64c]/10 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/Neo-Onyedire"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#81b64c] hover:border-[#81b64c]/50 hover:bg-[#81b64c]/10 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:neomvubu1@gmail.com"
            className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#81b64c] hover:border-[#81b64c]/50 hover:bg-[#81b64c]/10 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
