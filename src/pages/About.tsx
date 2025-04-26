import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-lg md:text-xl text-text/80 max-w-3xl mx-auto">
            A passionate Software Engineering student with expertise in AI, Formal Methods, and Full-Stack Development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-accent/10"
          >
            <h2 className="text-2xl font-bold mb-6">Background</h2>
            <p className="text-text/80 mb-4">
              I am currently pursuing my Bachelor's degree in Software Engineering at FAST NUCES, where I'm in my sixth semester. 
              My academic journey began at APSACS, where I completed both my Matriculation and FSC (Pre-Engineering) with A+ grades.
            </p>
            <p className="text-text/80 mb-4">
              My passion lies at the intersection of Artificial Intelligence and Formal Methods, where I explore innovative solutions 
              to complex problems. I have developed several projects that showcase my expertise in these areas, including AI-powered 
              healthcare and fitness applications, formal verification tools, and advanced algorithmic solutions.
            </p>
            <p className="text-text/80">
              Beyond academics, I actively engage in freelance development work, providing software solutions to clients worldwide 
              through platforms like Fiverr and Upwork. I'm also set to join Pakistan Tobacco Company as a Software Engineering 
              Intern in July 2025.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-accent/10"
          >
            <h2 className="text-2xl font-bold mb-6">Expertise</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Artificial Intelligence</h3>
                <p className="text-text/80">
                  Specialized in machine learning, computer vision, and natural language processing. Developed AI-powered 
                  healthcare and fitness applications with advanced features like symptom analysis and exercise form detection.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Formal Methods</h3>
                <p className="text-text/80">
                  Experienced in software verification, theorem proving, and formal specification. Created tools like the 
                  Z3 SMT Solver GUI to make formal verification more accessible.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Full-Stack Development</h3>
                <p className="text-text/80">
                  Proficient in both frontend and backend development using modern technologies like React, Node.js, and 
                  various databases. Built several web applications including a custom learning management system and 
                  AR-powered property platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Game Development</h3>
                <p className="text-text/80">
                  Skilled in game development with expertise in multi-threading, AI opponents, and network multiplayer 
                  functionality. Created advanced implementations of classic games like Ludo and Chess.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 