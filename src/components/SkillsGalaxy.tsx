import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  projects: string[];
}

interface SkillsGalaxyProps {
  skills: Skill[];
}

const SkillNode: React.FC<{
  skill: Skill;
  position: [number, number, number];
  onClick: () => void;
}> = ({ skill, position, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#3B82F6' : '#60A5FA'}
          emissive={hovered ? '#3B82F6' : '#60A5FA'}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.1}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
};

const SkillDetails: React.FC<{
  skill: Skill;
  onClose: () => void;
}> = ({ skill, onClose }) => {
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
        className="relative w-full max-w-2xl mx-4 bg-secondary/90 backdrop-blur-sm
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

        <h3 className="text-2xl font-bold mb-4 gradient-text">{skill.name}</h3>
        <p className="text-text/80 mb-6">{skill.category}</p>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Proficiency</h4>
          <div className="h-2 bg-accent/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${skill.proficiency}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Related Projects</h4>
          <ul className="space-y-2">
            {skill.projects.map((project, index) => (
              <li
                key={index}
                className="text-text/80 hover:text-accent transition-colors duration-200"
              >
                {project}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsGalaxy: React.FC<SkillsGalaxyProps> = ({ skills }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
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
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        
        <OrbitControls enableZoom={true} enablePan={true} />
        
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = 5;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const z = Math.sin(angle * 0.5) * 2;
          
          return (
            <SkillNode
              key={skill.name}
              skill={skill}
              position={[x, y, z]}
              onClick={() => setSelectedSkill(skill)}
            />
          );
        })}
      </Canvas>

      <AnimatePresence>
        {selectedSkill && (
          <SkillDetails
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsGalaxy; 