import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Node {
  x: number;
  y: number;
  connections: number[];
  value: number;
}

interface NeuralNetworkProps {
  width: number;
  height: number;
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize nodes
    const nodes: Node[] = [];
    const numNodes = 20;
    const numConnections = 3;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        connections: Array.from(
          { length: numConnections },
          () => Math.floor(Math.random() * numNodes)
        ),
        value: Math.random(),
      });
    }

    nodesRef.current = nodes;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update node positions
      nodes.forEach((node) => {
        node.x += (Math.random() - 0.5) * 0.5;
        node.y += (Math.random() - 0.5) * 0.5;
        node.value = Math.sin(Date.now() * 0.001 + node.x) * 0.5 + 0.5;

        // Keep nodes within bounds
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));
      });

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex];
          const distance = Math.sqrt(
            Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2)
          );

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(59, 130, 246, ${node.value})`;
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1 }}
    />
  );
};

export default NeuralNetwork; 