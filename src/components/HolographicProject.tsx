import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
}

interface HolographicProjectProps {
  project: Project;
  isActive: boolean;
  onClose: () => void;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="relative w-full h-full rounded-xl overflow-hidden"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-neon-blue/20 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-matrix-pattern opacity-10" />
      
      <div className="relative p-6 h-full flex flex-col">
        <h3 className="text-2xl font-bold mb-4 gradient-text">{project.title}</h3>
        <p className="text-text/80 mb-4 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
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
        
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full text-center"
        >
          View Project
        </a>
      </div>
    </motion.div>
  );
};

const HolographicProject: React.FC<HolographicProjectProps> = ({
  project,
  isActive,
  onClose,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        className="relative w-full max-w-4xl h-[600px] mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl" />
        <div className="absolute inset-0 bg-matrix-pattern opacity-5 rounded-2xl" />
        
        <div className="relative h-full p-8">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div className="relative h-full">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                
                <mesh
                  ref={meshRef}
                  onPointerEnter={() => setIsHovered(true)}
                  onPointerLeave={() => setIsHovered(false)}
                >
                  <boxGeometry args={[2, 2, 2]} />
                  <meshStandardMaterial
                    color="#3B82F6"
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.8}
                    emissive="#3B82F6"
                    emissiveIntensity={isHovered ? 0.5 : 0}
                  />
                </mesh>
              </Canvas>
            </div>
            
            <ProjectCard project={project} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HolographicProject; 