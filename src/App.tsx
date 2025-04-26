import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import FuturisticBackground from './components/FuturisticBackground';
import AICollaboration from './components/AICollaboration';
import NeuralNetwork from './components/NeuralNetwork';
import TimeMachine from './components/TimeMachine';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    
    // Simulate loading time for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Handle window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-text">
        <FuturisticBackground />
        <NeuralNetwork width={windowSize.width} height={windowSize.height} />
        <CustomCursor />
        <Navbar />
        
        {/* Theme Toggle Button */}
        <motion.button
          onClick={() => setIsDark(!isDark)}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-secondary/50 backdrop-blur-sm
                     border border-accent/10 hover:border-accent/20 transition-all duration-200
                     hover:shadow-lg hover:shadow-accent/20 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDark ? (
            <SunIcon className="w-6 h-6 text-accent" />
          ) : (
            <MoonIcon className="w-6 h-6 text-accent" />
          )}
        </motion.button>

        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <AICollaboration />
        <TimeMachine />
      </div>
    </ThemeProvider>
  );
};

export default App; 