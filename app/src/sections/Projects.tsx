import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Layers, Database, Globe } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types';

const projects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Features include user authentication, product search, cart management, and order tracking.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    githubUrl: 'https://github.com/NeoOnyedire',
    liveUrl: 'https://example.com',
    piece: 'queen',
    size: 'large',
  },
  {
    id: '2',
    name: 'Task Management System',
    description: 'Collaborative project management tool with real-time updates, drag-and-drop task boards, and team collaboration features. Includes sprint planning, burndown charts, and time tracking.',
    techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Socket.io', 'Tailwind'],
    githubUrl: 'https://github.com/NeoOnyedire',
    piece: 'rook',
    size: 'large',
  },
  {
    id: '3',
    name: 'Weather Analytics Dashboard',
    description: 'Real-time weather data visualization with historical trends, predictive analytics, and location-based alerts. Integrates with multiple weather APIs for comprehensive coverage.',
    techStack: ['React', 'D3.js', 'Python', 'FastAPI', 'AWS'],
    githubUrl: 'https://github.com/NeoOnyedire',
    liveUrl: 'https://example.com',
    piece: 'bishop',
    size: 'medium',
  },
  {
    id: '4',
    name: 'Chat Application',
    description: 'Secure messaging platform with end-to-end encryption, file sharing, and group chat capabilities. Features read receipts, typing indicators, and message search.',
    techStack: ['React Native', 'Firebase', 'Node.js', 'WebRTC'],
    githubUrl: 'https://github.com/NeoOnyedire',
    piece: 'knight',
    size: 'medium',
  },
  {
    id: '5',
    name: 'Portfolio Generator',
    description: 'CLI tool for generating developer portfolios from GitHub repositories. Automatically creates responsive websites with project showcases and statistics.',
    techStack: ['Python', 'Jinja2', 'GitHub API', 'Click'],
    githubUrl: 'https://github.com/NeoOnyedire',
    piece: 'pawn',
    size: 'small',
  },
  {
    id: '6',
    name: 'API Gateway Service',
    description: 'Microservices gateway with rate limiting, authentication, and request routing. Includes monitoring, logging, and automatic failover capabilities.',
    techStack: ['Go', 'Redis', 'Docker', 'Kubernetes', 'Prometheus'],
    githubUrl: 'https://github.com/NeoOnyedire',
    piece: 'pawn',
    size: 'small',
  },
];

const pieceIcons: { [key: string]: string } = {
  king: '♔',
  queen: '♕',
  rook: '♖',
  bishop: '♗',
  knight: '♘',
  pawn: '♙',
};

const pieceColors: { [key: string]: string } = {
  king: 'from-yellow-400 to-yellow-600',
  queen: 'from-purple-400 to-purple-600',
  rook: 'from-red-400 to-red-600',
  bishop: 'from-blue-400 to-blue-600',
  knight: 'from-green-400 to-green-600',
  pawn: 'from-gray-400 to-gray-600',
};

const pieceSizes: { [key: string]: string } = {
  small: 'text-4xl',
  medium: 'text-5xl',
  large: 'text-6xl',
};

const cardSizes: { [key: string]: string } = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 md:col-span-1 row-span-1',
  large: 'col-span-1 md:col-span-2 row-span-1',
};

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-chess-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#81b64c]/10 border border-[#81b64c]/30 rounded-full text-[#81b64c] text-sm font-medium mb-4">
            <Github className="w-4 h-4" />
            <span>My Projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projects as <span className="gradient-text">Chess Pieces</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Each project represents a different piece on the board — from small but essential pawns
            to powerful queens that dominate the game.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-2xl">♙</span>
            <span>Small Project</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-2xl">♘</span>
            <span>Medium Project</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-2xl">♕</span>
            <span>Major Project</span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`${cardSizes[project.size]} group`}
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="relative h-full glass-card p-6 cursor-pointer transition-all duration-500 hover:border-[#81b64c]/50 hover:shadow-[0_0_30px_rgba(129,182,76,0.15)] hover:-translate-y-2"
              >
                {project.name !== 'API Gateway Service' && (
                  <Badge
                    variant="secondary"
                    className="absolute right-4 top-4 bg-[#b58863]/20 text-[#f1d6bc] border border-[#b58863]/40 text-[10px] uppercase tracking-wide"
                  >
                    Coming soon
                  </Badge>
                )}

                {/* Piece Icon */}
                <div className="flex items-start justify-between mb-4 pr-28">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pieceColors[project.piece]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className={`${pieceSizes[project.size]} text-white`}>
                      {pieceIcons[project.piece]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/5 text-gray-400 border border-white/10 capitalize"
                    >
                      {project.size}
                    </Badge>
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#81b64c] transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-white/5 rounded text-gray-400">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-[#1a1a2e] border-white/10 text-white">
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pieceColors[selectedProject.piece]} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-4xl text-white">
                        {pieceIcons[selectedProject.piece]}
                      </span>
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-white">
                        {selectedProject.name}
                      </DialogTitle>
                      <Badge
                        variant="secondary"
                        className="mt-2 bg-[#81b64c]/20 text-[#81b64c] border border-[#81b64c]/30 capitalize"
                      >
                        {selectedProject.size} Project
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Description
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-white/10 text-gray-300 border border-white/10 hover:bg-[#81b64c]/20 hover:text-[#81b64c] hover:border-[#81b64c]/30 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-[#81b64c]/20 hover:text-[#81b64c] hover:border-[#81b64c]/30 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#81b64c] text-white rounded-lg hover:bg-[#6a9a3d] transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
};
