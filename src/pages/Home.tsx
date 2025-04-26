import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import profileImage from '../assets/profile.jpg';

interface Skill {
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const { isDark } = useTheme();

  const skills: Skill[] = [
    {
      title: 'Web Development',
      description: 'Building responsive and dynamic web applications using modern technologies.',
    },
    {
      title: 'Problem Solving',
      description: 'Creating efficient solutions to complex technical challenges.',
    },
    {
      title: 'Full Stack',
      description: 'Developing end-to-end applications with both frontend and backend expertise.',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Software Engineer & Developer
          </h1>
          
          <p className="text-lg md:text-xl text-text/80 max-w-3xl mx-auto">
            Specializing in Artificial Intelligence, Formal Methods, and Full-Stack Development
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-accent/10"
            >
              <span className="text-2xl">🎓</span>
              <p className="mt-2">6th Semester at FAST NUCES</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-accent/10"
            >
              <span className="text-2xl">🤖</span>
              <p className="mt-2">AI & ML Specialist</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-accent/10"
            >
              <span className="text-2xl">📐</span>
              <p className="mt-2">Formal Methods Expert</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-accent/10"
            >
              <span className="text-2xl">💼</span>
              <p className="mt-2">Freelance Developer</p>
            </motion.div>
          </div>

          <div className="mt-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-text/70 max-w-2xl mx-auto"
            >
              Currently developing AI-powered solutions for healthcare and fitness, while also working on formal verification tools. 
              Set to join Pakistan Tobacco Company as a Software Engineering Intern in July 2025.
            </motion.p>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="projects"
              className="px-6 py-3 bg-accent text-white rounded-full font-medium"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="contact"
              className="px-6 py-3 bg-secondary/50 text-text rounded-full font-medium border border-accent/10"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 