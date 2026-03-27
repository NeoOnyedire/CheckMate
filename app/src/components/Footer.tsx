import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/NeoOnyedire', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/Neo-Onyedire', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:neomvubu1@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#81b64c] to-[#6a9a3d] rounded-lg flex items-center justify-center">
              <span className="text-xl text-white">♔</span>
            </div>
            <span className="text-xl font-bold text-white">Neo Onyedire</span>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 text-center mb-6 max-w-md">
            Building systems, one move at a time. 
            Thanks for visiting my chess-themed portfolio!
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#81b64c] hover:border-[#81b64c]/50 hover:bg-[#81b64c]/10 transition-all duration-300"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and lots of
            </span>
            <span className="flex items-center gap-1">
              <Code2 className="w-4 h-4 text-[#81b64c]" />
            </span>
            <span>© {currentYear} Neo Onyedire. All rights reserved.</span>
          </div>

          {/* Chess Pieces Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 mt-8 text-2xl text-gray-600"
          >
            <span>♜</span>
            <span>♞</span>
            <span>♝</span>
            <span>♛</span>
            <span>♚</span>
            <span>♝</span>
            <span>♞</span>
            <span>♜</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
