import { motion } from 'framer-motion';
import { useState } from 'react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  type: 'work' | 'education' | 'project';
  logo?: string;
}

const experiences: Experience[] = [
  {
    title: 'Bachelor of Science in Software Engineering',
    company: 'FAST NUCES',
    period: '2022 - Present',
    description: 'Currently in 6th semester with focus on Software Engineering, AI, and Formal Methods',
    technologies: [
      'Object Oriented Programming',
      'Data Structures',
      'Database Systems',
      'Operating Systems',
      'Web Engineering',
      'Software Engineering',
      'Formal Methods',
      'Artificial Intelligence'
    ],
    achievements: [
      'Current CGPA: 2.93',
      'Completed core courses in Software Engineering and Computer Science',
      'Studying advanced topics in AI and Formal Methods',
      'Active participant in academic projects and research'
    ],
    type: 'education'
  },
  {
    title: 'FSC (Pre-Engineering)',
    company: 'APSACS',
    period: '2020 - 2022',
    description: 'Completed with A+ grade in Pre-Engineering',
    technologies: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Computer Science'
    ],
    achievements: [
      'Graduated with A+ grade',
      'Strong foundation in mathematics and sciences',
      'Developed analytical and problem-solving skills',
      'Participated in science exhibitions and competitions'
    ],
    type: 'education'
  },
  {
    title: 'Matriculation',
    company: 'APSACS',
    period: '2018 - 2020',
    description: 'Completed with A+ grade',
    technologies: [
      'Mathematics',
      'Physics',
      'Chemistry',
      'Computer Science'
    ],
    achievements: [
      'Graduated with A+ grade',
      'Strong foundation in science and mathematics',
      'Early interest in computer science and programming'
    ],
    type: 'education'
  },
  {
    title: 'Software Engineering Intern',
    company: 'Pakistan Tobacco Company',
    period: 'July 2025',
    description: 'Software development internship focusing on enterprise solutions',
    technologies: [
      'Java',
      'Spring Boot',
      'React',
      'PostgreSQL',
      'Docker',
      'Kubernetes'
    ],
    achievements: [
      'Developed microservices architecture for internal tools',
      'Implemented CI/CD pipelines',
      'Created automated testing frameworks',
      'Optimized database queries and performance'
    ],
    type: 'work'
  },
  {
    title: 'Freelance Software Developer',
    company: 'Fiverr & Upwork',
    period: '2023 - Present',
    description: 'Providing software development services to global clients',
    technologies: [
      'Web Development',
      'Mobile Development',
      'AI/ML Solutions',
      'Database Design',
      'API Development'
    ],
    achievements: [
      'Maintained 5-star rating across platforms',
      'Completed 50+ successful projects',
      'Specialized in AI and web development solutions',
      'Built long-term client relationships'
    ],
    type: 'work'
  },
  {
    title: 'AI-Powered Healthcare Platform',
    company: 'Academic Project',
    period: '2024',
    description: 'Doctor consultation service with AI symptom analysis and diagnosis',
    technologies: [
      'Python',
      'Machine Learning',
      'Natural Language Processing',
      'Web Development',
      'Database Systems'
    ],
    achievements: [
      'Implemented AI-based symptom analysis system',
      'Developed doctor-patient matching algorithm',
      'Created secure consultation platform',
      'Integrated real-time chat functionality'
    ],
    type: 'project'
  },
  {
    title: 'AI Fitness Coach Application',
    company: 'Academic Project',
    period: '2024',
    description: 'Gym fitness app with AI health and fitness coaching',
    technologies: [
      'React Native',
      'Python',
      'Machine Learning',
      'Computer Vision',
      'Firebase'
    ],
    achievements: [
      'Developed personalized workout plans using AI',
      'Created diet recommendation system',
      'Implemented exercise form analysis',
      'Built progress tracking dashboard'
    ],
    type: 'project'
  },
  {
    title: 'Advanced Chess Solver',
    company: 'Academic Project',
    period: '2023',
    description: 'Chess solving system using Alpha-Beta pruning algorithm',
    technologies: [
      'Python',
      'Algorithms',
      'Game Theory',
      'Artificial Intelligence'
    ],
    achievements: [
      'Implemented Alpha-Beta pruning optimization',
      'Created efficient move evaluation system',
      'Developed user-friendly interface',
      'Achieved significant performance improvements'
    ],
    type: 'project'
  },
  {
    title: 'Automated Test Case Generator',
    company: 'Academic Project',
    period: '2023',
    description: 'Test case generation using Genetic Algorithms',
    technologies: [
      'Python',
      'Genetic Algorithms',
      'Software Testing',
      'Machine Learning'
    ],
    achievements: [
      'Developed efficient test case generation algorithm',
      'Implemented fitness function for test case evaluation',
      'Created automated testing framework',
      'Achieved high code coverage'
    ],
    type: 'project'
  },
  {
    title: 'Z3 SMT Solver GUI',
    company: 'Academic Project',
    period: '2023',
    description: 'Graphical interface for Z3 SMT solvers in program verification',
    technologies: [
      'Python',
      'Z3 Theorem Prover',
      'GUI Development',
      'Formal Methods'
    ],
    achievements: [
      'Created intuitive user interface for Z3',
      'Implemented visualization of verification results',
      'Developed custom verification workflows',
      'Enhanced accessibility of formal methods'
    ],
    type: 'project'
  },
  {
    title: 'Custom Google Classroom',
    company: 'Academic Project',
    period: '2023',
    description: 'Customized learning management system',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'WebRTC'
    ],
    achievements: [
      'Developed assignment management system',
      'Created real-time communication features',
      'Implemented grade tracking system',
      'Built custom analytics dashboard'
    ],
    type: 'project'
  },
  {
    title: 'AR Property Platform',
    company: 'Academic Project',
    period: '2023',
    description: 'Property website with AR room visiting and booking system',
    technologies: [
      'React',
      'Three.js',
      'AR.js',
      'Node.js',
      'MongoDB'
    ],
    achievements: [
      'Implemented AR room visualization',
      'Created property booking system',
      'Developed 3D property tours',
      'Built real-time availability tracking'
    ],
    type: 'project'
  },
  {
    title: 'Multi-Threaded Ludo Game',
    company: 'Academic Project',
    period: '2023',
    description: 'Advanced Ludo game with phenomenal GUI and multi-threading',
    technologies: [
      'Java',
      'JavaFX',
      'Multi-threading',
      'GUI Development'
    ],
    achievements: [
      'Implemented multi-threaded game logic',
      'Created stunning visual effects',
      'Developed AI opponents',
      'Built network multiplayer support'
    ],
    type: 'project'
  },
  {
    title: 'Sudoku Solver',
    company: 'Academic Project',
    period: '2023',
    description: 'Sudoku solving using Simulated Annealing algorithm',
    technologies: [
      'Python',
      'Algorithms',
      'Optimization',
      'GUI Development'
    ],
    achievements: [
      'Implemented Simulated Annealing algorithm',
      'Created efficient puzzle solving system',
      'Developed user-friendly interface',
      'Achieved high solving accuracy'
    ],
    type: 'project'
  }
];

const Experience = () => {
  const [filter, setFilter] = useState<'all' | 'work' | 'education' | 'project'>('all');

  const filteredExperiences = experiences.filter(exp => 
    filter === 'all' ? true : exp.type === filter
  );

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Professional Journey
          </h1>
          <p className="text-lg md:text-xl text-text/80 max-w-3xl mx-auto">
            A timeline of my professional experience, education, and significant projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {['all', 'work', 'education', 'project'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === type 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-secondary/50 text-text/70 hover:bg-secondary'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-accent/20" />

          {/* Experience Cards */}
          {filteredExperiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12
                ${index % 2 === 0 ? 'md:text-right' : 'md:text-left md:flex-row-reverse'}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full shadow-lg shadow-accent/20" />

              {/* Content */}
              <div className={`bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-accent/10
                           hover:border-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5
                           ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12 md:col-start-2'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <span className="text-sm text-accent">{exp.period}</span>
                </div>
                <h4 className="text-lg font-semibold text-text/80 mb-2">{exp.company}</h4>
                <p className="text-text/70 mb-4">{exp.description}</p>

                {/* Technologies */}
                <div className="mb-4">
                  <h5 className="font-semibold mb-2">Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-accent/10 rounded-full text-sm text-accent">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h5 className="font-semibold mb-2">Key Achievements</h5>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start space-x-2 text-text/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience; 