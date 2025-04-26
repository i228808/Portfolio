import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  features: string[];
  period: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: 'AI-Powered Healthcare Platform',
    description: 'A comprehensive healthcare platform that provides AI-powered symptom analysis and doctor consultation services.',
    icon: '🏥',
    technologies: [
      'Python',
      'Machine Learning',
      'Natural Language Processing',
      'React',
      'Node.js',
      'MongoDB',
      'TensorFlow',
      'Firebase'
    ],
    features: [
      'AI-based symptom analysis system',
      'Doctor-patient matching algorithm',
      'Secure consultation platform',
      'Real-time chat functionality',
      'Medical history tracking',
      'Automated diagnosis suggestions',
      'Patient data analytics'
    ],
    period: '2024'
  },
  {
    title: 'AI Fitness Coach Application',
    description: 'An intelligent fitness application that provides personalized workout plans and health coaching using AI.',
    icon: '💪',
    technologies: [
      'React Native',
      'Python',
      'Machine Learning',
      'Computer Vision',
      'Firebase',
      'TensorFlow',
      'OpenCV'
    ],
    features: [
      'Personalized workout plans',
      'Diet recommendation system',
      'Exercise form analysis',
      'Progress tracking dashboard',
      'Real-time feedback',
      'AI-powered workout suggestions',
      'Nutrition tracking'
    ],
    period: '2024'
  },
  {
    title: 'Advanced Chess Solver',
    description: 'A sophisticated chess solving system implementing advanced algorithms for optimal move prediction.',
    icon: '♟️',
    technologies: [
      'Python',
      'Algorithms',
      'Game Theory',
      'Artificial Intelligence',
      'GUI Development',
      'Minimax Algorithm',
      'Alpha-Beta Pruning'
    ],
    features: [
      'Alpha-Beta pruning optimization',
      'Efficient move evaluation system',
      'User-friendly interface',
      'Multiple difficulty levels',
      'Performance analysis',
      'Move history tracking',
      'Game state visualization'
    ],
    period: '2023'
  },
  {
    title: 'Automated Test Case Generator',
    description: 'An intelligent system that automatically generates test cases using genetic algorithms.',
    icon: '🧪',
    technologies: [
      'Python',
      'Genetic Algorithms',
      'Software Testing',
      'Machine Learning',
      'Automation',
      'Pytest',
      'Coverage Analysis'
    ],
    features: [
      'Efficient test case generation',
      'Fitness function evaluation',
      'Automated testing framework',
      'High code coverage',
      'Customizable parameters',
      'Test suite optimization',
      'Mutation testing'
    ],
    period: '2023'
  },
  {
    title: 'Z3 SMT Solver GUI',
    description: 'A graphical interface for Z3 SMT solvers to make formal verification more accessible.',
    icon: '✓',
    technologies: [
      'Python',
      'Z3 Theorem Prover',
      'GUI Development',
      'Formal Methods',
      'SMT Solvers',
      'PyQt',
      'Model Checking'
    ],
    features: [
      'Intuitive user interface',
      'Verification result visualization',
      'Custom verification workflows',
      'Error detection and reporting',
      'Performance optimization',
      'Formula simplification',
      'Counterexample generation'
    ],
    period: '2023'
  },
  {
    title: 'Custom Google Classroom',
    description: 'A customized learning management system with advanced features for educational institutions.',
    icon: '📚',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'WebRTC',
      'Express.js',
      'Socket.io',
      'JWT Authentication'
    ],
    features: [
      'Assignment management system',
      'Real-time communication',
      'Grade tracking system',
      'Analytics dashboard',
      'Resource sharing',
      'Automated grading',
      'Student progress tracking'
    ],
    period: '2023'
  },
  {
    title: 'AR Property Platform',
    description: 'An innovative property platform featuring AR room visualization and booking system.',
    icon: '🏠',
    technologies: [
      'React',
      'Three.js',
      'AR.js',
      'Node.js',
      'MongoDB',
      'WebGL',
      '3D Modeling'
    ],
    features: [
      'AR room visualization',
      'Property booking system',
      '3D property tours',
      'Real-time availability tracking',
      'Interactive floor plans',
      'Virtual staging',
      'Property comparison tools'
    ],
    period: '2023'
  },
  {
    title: 'Multi-Threaded Ludo Game',
    description: 'An advanced Ludo game implementation with multi-threading and stunning graphics.',
    icon: '🎲',
    technologies: [
      'Java',
      'JavaFX',
      'Multi-threading',
      'GUI Development',
      'Networking',
      'Socket Programming',
      'Game AI'
    ],
    features: [
      'Multi-threaded game logic',
      'Stunning visual effects',
      'AI opponents',
      'Network multiplayer support',
      'Custom game rules',
      'Real-time chat',
      'Game statistics'
    ],
    period: '2023'
  },
  {
    title: 'Sudoku Solver',
    description: 'An efficient Sudoku solving system using simulated annealing algorithm.',
    icon: '🔢',
    technologies: [
      'Python',
      'Algorithms',
      'Optimization',
      'GUI Development',
      'Puzzle Solving',
      'PyQt',
      'Constraint Programming'
    ],
    features: [
      'Simulated Annealing algorithm',
      'Efficient puzzle solving',
      'User-friendly interface',
      'Multiple difficulty levels',
      'Solution visualization',
      'Puzzle generation',
      'Step-by-step solving'
    ],
    period: '2023'
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-lg md:text-xl text-text/80 max-w-3xl mx-auto">
            A collection of my academic and personal projects showcasing various technologies and problem-solving approaches
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-accent/10 hover:border-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="text-5xl mb-4">{project.icon}</div>
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-text/70 mb-4">{project.description}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-accent/10 rounded-full text-sm text-accent">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm text-text/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-sm text-text/60">
                Period: {project.period}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects; 