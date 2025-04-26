import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type SkillCategory = 'technical' | 'frameworks' | 'databases' | 'ai-ml' | 'formal-methods' | 'tools';

interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  icon: string;
  description: string;
}

interface Interest {
  name: string;
  description: string;
  icon: string;
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('technical');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    // Programming Languages
    { 
      name: 'Java',
      level: 90,
      category: 'technical',
      icon: '☕',
      description: 'Proficient in Java with strong OOP principles and Spring Boot'
    },
    { 
      name: 'Python',
      level: 90,
      category: 'technical',
      icon: '🐍',
      description: 'Expert in Python for AI/ML, algorithms, and backend development'
    },
    { 
      name: 'JavaScript/TypeScript',
      level: 85,
      category: 'technical',
      icon: '⚡',
      description: 'Full-stack development with modern JavaScript frameworks'
    },
    
    // Web Development
    { 
      name: 'React',
      level: 85,
      category: 'frameworks',
      icon: '⚛️',
      description: 'Building modern, responsive web applications'
    },
    { 
      name: 'Node.js',
      level: 80,
      category: 'frameworks',
      icon: '🟢',
      description: 'Server-side JavaScript development'
    },
    { 
      name: 'Spring Boot',
      level: 85,
      category: 'frameworks',
      icon: '🌱',
      description: 'Enterprise Java applications development'
    },
    
    // Mobile Development
    { 
      name: 'React Native',
      level: 80,
      category: 'frameworks',
      icon: '📱',
      description: 'Cross-platform mobile application development'
    },
    
    // Database & Storage
    { 
      name: 'MongoDB',
      level: 85,
      category: 'databases',
      icon: '🍃',
      description: 'NoSQL database design and implementation'
    },
    { 
      name: 'PostgreSQL',
      level: 80,
      category: 'databases',
      icon: '🐘',
      description: 'Relational database management and optimization'
    },
    
    // AI & ML
    { 
      name: 'Machine Learning',
      level: 85,
      category: 'ai-ml',
      icon: '🧠',
      description: 'Supervised and unsupervised learning techniques'
    },
    { 
      name: 'Deep Learning',
      level: 80,
      category: 'ai-ml',
      icon: '🤖',
      description: 'Neural networks and deep learning frameworks'
    },
    { 
      name: 'Computer Vision',
      level: 80,
      category: 'ai-ml',
      icon: '👁️',
      description: 'Image processing and computer vision applications'
    },
    
    // Formal Methods
    { 
      name: 'Z3 Theorem Prover',
      level: 85,
      category: 'formal-methods',
      icon: '✓',
      description: 'Software verification and formal specification'
    },
    { 
      name: 'SMT Solvers',
      level: 80,
      category: 'formal-methods',
      icon: '📐',
      description: 'Satisfiability Modulo Theories and formal verification'
    },
    
    // DevOps & Tools
    { 
      name: 'Docker',
      level: 80,
      category: 'tools',
      icon: '🐳',
      description: 'Containerization and deployment'
    },
    { 
      name: 'Kubernetes',
      level: 75,
      category: 'tools',
      icon: '☸️',
      description: 'Container orchestration and management'
    },
    { 
      name: 'Git',
      level: 90,
      category: 'tools',
      icon: '📚',
      description: 'Version control and collaboration'
    },
    
    // Game Development
    { 
      name: 'JavaFX',
      level: 85,
      category: 'frameworks',
      icon: '🎮',
      description: 'GUI development and game programming'
    },
    
    // AR/VR
    { 
      name: 'Three.js',
      level: 80,
      category: 'frameworks',
      icon: '🕶️',
      description: '3D graphics and augmented reality development'
    }
  ];

  const interests: Interest[] = [
    {
      name: 'Artificial Intelligence',
      description: 'Exploring AI applications in healthcare, fitness, and problem-solving',
      icon: '🤖'
    },
    {
      name: 'AI Agents',
      description: 'Developing intelligent agents for automation, decision-making, and problem-solving',
      icon: '🧠'
    },
    {
      name: 'Formal Methods',
      description: 'Applying mathematical techniques for software verification and theorem proving',
      icon: '📐'
    },
    {
      name: 'Web Development',
      description: 'Creating modern, responsive web applications with cutting-edge technologies',
      icon: '🌐'
    },
    {
      name: 'Game Development',
      description: 'Developing interactive games with advanced algorithms and graphics',
      icon: '🎮'
    }
  ];

  const categories: { id: SkillCategory; name: string; icon: string }[] = [
    { id: 'technical', name: 'Technical', icon: '💻' },
    { id: 'frameworks', name: 'Frameworks', icon: '⚛️' },
    { id: 'databases', name: 'Databases', icon: '🗄️' },
    { id: 'ai-ml', name: 'AI & ML', icon: '🤖' },
    { id: 'formal-methods', name: 'Formal Methods', icon: '📐' },
    { id: 'tools', name: 'Tools', icon: '🛠️' }
  ];

  const handleCategoryChange = (categoryId: SkillCategory) => {
    console.log('Switching to category:', categoryId);
    setActiveCategory(categoryId);
  };

  // Filter skills based on active category
  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Skills & Expertise
        </h1>
        <p className="text-lg text-center text-text/80 mb-12 max-w-3xl mx-auto">
          Combining technical proficiency with theoretical knowledge to deliver innovative solutions
          across web development, AI, and formal methods.
        </p>
        
        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200
                       flex items-center gap-2 cursor-pointer select-none
                       ${activeCategory === category.id
                         ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                         : 'bg-secondary/50 text-text hover:bg-blue-500/10'
                       }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="relative p-6 rounded-2xl bg-secondary/50 backdrop-blur-sm
                       border border-accent/10 hover:border-accent/20 transition-all duration-300
                       hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-start space-x-4">
                <span className="text-3xl">{skill.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm text-text/70 mb-3">{skill.description}</p>
                  <div className="h-2 rounded-full bg-secondary/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                  <div className="mt-2 text-xs text-right text-text/60">
                    Proficiency: {skill.level}%
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interests Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Interests & Passions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interests.map((interest) => (
            <motion.div
              key={interest.name}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-secondary/50 backdrop-blur-sm
                       border border-accent/10 hover:border-accent/20 transition-all duration-300
                       hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="text-4xl mb-4">{interest.icon}</div>
              <h3 className="text-xl font-bold mb-3">{interest.name}</h3>
              <p className="text-text/80">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills; 