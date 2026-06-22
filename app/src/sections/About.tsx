import { motion } from 'framer-motion';
import { GraduationCap, Target, Lightbulb, Code2, BookOpen } from 'lucide-react';

const milestones = [
  {
    year: '2023',
    title: 'Started Coding Journey',
    description: 'Discovered my passion for programming and began learning Python and JavaScript.',
    icon: Code2,
  },
  {
    year: '2024',
    title: 'WeThinkCode_ Bootcamp',
    description: 'Joined the WeThinkCode_ bootcamp and sharpened my problem-solving fundamentals.',
    icon: GraduationCap,
  },
  {
    year: '2025/2026',
    title: 'WeThinkCode_ Full-Time Program',
    description: 'Moved into the full-time software engineering program, building deeper practical engineering skills.',
    icon: GraduationCap,
  },
  {
    year: '2026',
    title: 'Full-Stack Development & Distributed Systems',
    description: 'Expanded into full-stack development and distributed systems, building complete applications with scalable architecture in mind.',
    icon: Target,
  },
];

const values = [
  {
    title: 'Strategic Thinking',
    description: 'Like chess, I approach problems with careful planning and foresight.',
    icon: Lightbulb,
  },
  {
    title: 'Continuous Learning',
    description: 'Always expanding my knowledge and staying current with new technologies.',
    icon: BookOpen,
  },
  {
    title: 'Clean Code',
    description: 'Writing maintainable, well-documented code that stands the test of time.',
    icon: Code2,
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-chess-pattern opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#81b64c]/10 border border-[#81b64c]/30 rounded-full text-[#81b64c] text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>About Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From my first line of code to building full-stack applications,
            here's how my passion for software engineering has evolved.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Who Am I?</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm <span className="text-[#81b64c] font-semibold">Neo Onyedire</span>, 
                  a WeThinkCode_ alumnus with a passion for building 
                  elegant solutions to complex problems.
                </p>
                <p>
                  My approach to development is inspired by chess — every move is calculated, 
                  every decision strategic. I believe in writing clean, maintainable code that 
                  not only solves the immediate problem but anticipates future challenges.
                </p>
                <p>
                  When I'm not coding, you'll find me studying chess openings, exploring new 
                  technologies, or collaborating with fellow developers on exciting projects.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid gap-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-4 flex items-start gap-4 hover:border-[#81b64c]/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#81b64c]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#81b64c]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{value.title}</h4>
                      <p className="text-sm text-gray-400">{value.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">My Timeline</h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#81b64c] via-[#b58863] to-transparent" />
                
                {/* Timeline Items */}
                <div className="space-y-8">
                  {milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return (
                      <motion.div
                        key={milestone.year}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 }}
                        className="relative pl-14"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-0 w-10 h-10 bg-[#1a1a2e] border-2 border-[#81b64c] rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#81b64c]" />
                        </div>
                        
                        {/* Content */}
                        <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                          <span className="text-sm text-[#81b64c] font-semibold">
                            {milestone.year}
                          </span>
                          <h4 className="text-lg font-semibold text-white mt-1">
                            {milestone.title}
                          </h4>
                          <p className="text-sm text-gray-400 mt-2">
                            {milestone.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Chess Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 glass-card p-6 border-l-4 border-[#81b64c]"
            >
              <blockquote className="text-gray-300 italic">
                "Every chess master was once a beginner. Every expert programmer was once 
                writing their first 'Hello World'. The journey of a thousand miles begins 
                with a single move."
              </blockquote>
              <cite className="text-sm text-[#81b64c] mt-2 block not-italic">
                — Inspired by Irving Chernev
              </cite>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
