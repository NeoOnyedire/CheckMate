import { motion } from 'framer-motion';
import { Cpu, Wrench, Code, Terminal, Zap, Brain } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'languages';
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Next.js', level: 80, category: 'frontend' },
  { name: 'Tailwind CSS', level: 88, category: 'frontend' },
  { name: 'HTML/CSS', level: 92, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 82, category: 'backend' },
  { name: 'Python', level: 85, category: 'backend' },
  { name: 'PostgreSQL', level: 78, category: 'backend' },
  { name: 'MongoDB', level: 75, category: 'backend' },
  { name: 'REST APIs', level: 88, category: 'backend' },
  
  // Languages
  { name: 'JavaScript', level: 92, category: 'languages' },
  { name: 'Python', level: 85, category: 'languages' },
  { name: 'Java', level: 70, category: 'languages' },
  { name: 'C#', level: 65, category: 'languages' },
  { name: 'SQL', level: 80, category: 'languages' },
  
  // Tools
  { name: 'Git', level: 88, category: 'tools' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'AWS', level: 70, category: 'tools' },
  { name: 'Linux', level: 82, category: 'tools' },
  { name: 'CI/CD', level: 72, category: 'tools' },
];

const categories = {
  frontend: { name: 'Frontend', icon: Code, color: '#81b64c' },
  backend: { name: 'Backend', icon: Cpu, color: '#b58863' },
  languages: { name: 'Languages', icon: Terminal, color: '#6b8cae' },
  tools: { name: 'Tools', icon: Wrench, color: '#d4a574' },
};

// Create 8x8 chessboard grid with skills
const createChessboardGrid = () => {
  const grid: (Skill | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place skills on the board in a strategic pattern
  const positions = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
  ];
  
  positions.forEach(([row, col], index) => {
    if (skills[index]) {
      grid[row][col] = skills[index];
    }
  });
  
  return grid;
};

const getSquareColor = (row: number, col: number, level: number | null) => {
  const isLight = (row + col) % 2 === 0;
  
  if (level === null) {
    return isLight ? 'bg-[#f0d9b5]/5' : 'bg-[#b58863]/5';
  }
  
  // Heatmap intensity based on skill level
  const intensity = level / 100;
  if (isLight) {
    return `rgba(129, 182, 76, ${0.1 + intensity * 0.3})`;
  }
  return `rgba(129, 182, 76, ${0.15 + intensity * 0.35})`;
};

export const Skills = () => {
  const chessboardGrid = createChessboardGrid();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const squareVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#81b64c]/10 border border-[#81b64c]/30 rounded-full text-[#81b64c] text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            <span>My Skills</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skill <span className="gradient-text">Chessboard</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My technical skills visualized as a chessboard heatmap. 
            The brighter the square, the stronger the skill.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Chessboard Heatmap */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#81b64c]" />
                  Skill Heatmap
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Low</span>
                  <div className="w-20 h-2 bg-gradient-to-r from-[#f0d9b5]/20 to-[#81b64c] rounded-full" />
                  <span>High</span>
                </div>
              </div>
              
              {/* Chessboard Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-8 gap-1 aspect-square"
              >
                {chessboardGrid.map((row, rowIndex) =>
                  row.map((skill, colIndex) => {
                    const isLight = (rowIndex + colIndex) % 2 === 0;
                    const hasSkill = skill !== null;
                    
                    return (
                      <motion.div
                        key={`${rowIndex}-${colIndex}`}
                        variants={squareVariants}
                        className={`
                          relative aspect-square rounded-sm flex items-center justify-center
                          transition-all duration-300 cursor-pointer group
                          ${isLight ? 'bg-[#f0d9b5]/10' : 'bg-[#b58863]/10'}
                        `}
                        style={hasSkill ? {
                          backgroundColor: getSquareColor(rowIndex, colIndex, skill.level),
                          boxShadow: `0 0 ${skill.level / 10}px rgba(129, 182, 76, 0.3)`,
                        } : {}}
                      >
                        {hasSkill && (
                          <>
                            <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                              {skill.name.slice(0, 3)}
                            </span>
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1a1a2e] border border-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                              <p className="text-sm font-semibold text-white">{skill.name}</p>
                              <p className="text-xs text-[#81b64c]">{skill.level}%</p>
                            </div>
                          </>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
              
              {/* Board Coordinates */}
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>a</span><span>b</span><span>c</span><span>d</span>
                <span>e</span><span>f</span><span>g</span><span>h</span>
              </div>
            </div>
          </motion.div>

          {/* Skills List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 space-y-6"
          >
            {Object.entries(categories).map(([key, category], categoryIndex) => {
              const categorySkills = skills.filter(s => s.category === key);
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-300">{skill.name}</span>
                          <span className="text-xs text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                            style={{
                              background: `linear-gradient(90deg, ${category.color}80, ${category.color})`,
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
