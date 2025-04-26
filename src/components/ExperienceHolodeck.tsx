import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text3D } from '@react-three/drei';
import * as THREE from 'three';

interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

interface ExperienceHolodeckProps {
  experiences: Experience[];
}

const ExperienceRoom: React.FC<{
  experience: Experience;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: () => void;
}> = ({ experience, position, rotation, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group position={position} rotation={rotation}>
        <mesh
          onClick={onClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color={hovered ? '#3B82F6' : '#60A5FA'}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.8}
            emissive={hovered ? '#3B82F6' : '#60A5FA'}
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </mesh>
        <Text3D
          position={[0, 1.5, 0]}
          size={0.2}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          font="/fonts/helvetiker_regular.typeface.json"
        >
          {experience.title}
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={0.8}
            roughness={0.2}
            emissive="#FFFFFF"
            emissiveIntensity={0.5}
          />
        </Text3D>
      </group>
    </Float>
  );
};

const ExperienceDetails: React.FC<{
  experience: Experience;
  onClose: () => void;
}> = ({ experience, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div
        className="relative w-full max-w-3xl mx-4 bg-secondary/90 backdrop-blur-sm
                   rounded-2xl p-8 border border-accent/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-accent/10
                   hover:bg-accent/20 transition-all duration-200"
        >
          <svg
            className="w-6 h-6 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-3xl font-bold mb-2 gradient-text">{experience.title}</h3>
        <p className="text-xl text-text/80 mb-4">{experience.organization}</p>
        <p className="text-accent mb-6">{experience.period}</p>

        <p className="text-text/80 mb-6">{experience.description}</p>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, index) => (
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
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Key Achievements</h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, index) => (
              <li
                key={index}
                className="text-text/80 hover:text-accent transition-colors duration-200
                         flex items-start space-x-2"
              >
                <span className="text-accent">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExperienceHolodeck: React.FC<ExperienceHolodeckProps> = ({ experiences }) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="city" />
        
        <OrbitControls enableZoom={true} enablePan={true} />
        
        {experiences.map((experience, index) => {
          const angle = (index / experiences.length) * Math.PI * 2;
          const radius = 5;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const z = Math.sin(angle * 0.5) * 2;
          const rotation: [number, number, number] = [0, angle, 0];
          
          return (
            <ExperienceRoom
              key={experience.title}
              experience={experience}
              position={[x, y, z]}
              rotation={rotation}
              onClick={() => setSelectedExperience(experience)}
            />
          );
        })}
      </Canvas>

      <AnimatePresence>
        {selectedExperience && (
          <ExperienceDetails
            experience={selectedExperience}
            onClose={() => setSelectedExperience(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceHolodeck; 