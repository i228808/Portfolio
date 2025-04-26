import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';

interface PortfolioVersion {
  year: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

const versions: PortfolioVersion[] = [
  {
    year: 2024,
    title: 'Next-Gen Portfolio',
    description: 'A cutting-edge portfolio featuring AI integration, 3D visualizations, and immersive experiences.',
    technologies: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    image: '/images/portfolio-2024.png',
  },
  {
    year: 2023,
    title: 'Modern Portfolio',
    description: 'A modern portfolio with smooth animations and responsive design.',
    technologies: ['React', 'JavaScript', 'CSS Modules', 'GSAP'],
    image: '/images/portfolio-2023.png',
  },
  {
    year: 2022,
    title: 'Classic Portfolio',
    description: 'A clean and professional portfolio showcasing projects and skills.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    image: '/images/portfolio-2022.png',
  },
];

const TimeMachine: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleYearChange = (year: number) => {
    if (year === selectedYear) return;
    setIsTransitioning(true);
    setSelectedYear(year);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const currentVersion = versions.find(v => v.year === selectedYear);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-accent/10 backdrop-blur-sm
                   border border-accent/20 hover:border-accent/40
                   transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ClockIcon className="w-6 h-6 text-accent" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 left-4 w-96 bg-secondary/90 backdrop-blur-sm
                       rounded-2xl border border-accent/20 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="p-4 border-b border-accent/20">
              <h3 className="text-lg font-semibold gradient-text">
                Portfolio Time Machine
              </h3>
            </div>

            <div className="p-4">
              <div className="flex justify-between mb-4">
                {versions.map((version) => (
                  <motion.button
                    key={version.year}
                    onClick={() => handleYearChange(version.year)}
                    className={`px-3 py-1 rounded-full text-sm transition-all duration-200
                              ${
                                selectedYear === version.year
                                  ? 'bg-accent text-white'
                                  : 'bg-accent/10 text-accent hover:bg-accent/20'
                              }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {version.year}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {!isTransitioning && currentVersion && (
                  <motion.div
                    key={currentVersion.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-neon-blue/20" />
                      <div className="absolute inset-0 bg-matrix-pattern opacity-10" />
                      <div className="relative h-full flex items-center justify-center">
                        <h2 className="text-2xl font-bold gradient-text">
                          {currentVersion.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-text/80 mb-4">{currentVersion.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {currentVersion.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 rounded-full text-sm
                                   border border-accent/20 hover:border-accent/40
                                   transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeMachine; 