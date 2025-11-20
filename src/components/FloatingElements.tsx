import { motion } from 'framer-motion';
import { Code2, Sparkles, Zap, Cpu } from 'lucide-react';

const FloatingElements = () => {
  const elements = [
    { Icon: Code2, x: '15%', y: '20%', delay: 0 },
    { Icon: Sparkles, x: '85%', y: '25%', delay: 0.5 },
    { Icon: Zap, x: '10%', y: '70%', delay: 1 },
    { Icon: Cpu, x: '90%', y: '65%', delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {elements.map(({ Icon, x, y, delay }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: delay,
            ease: 'easeInOut',
          }}
        >
          <Icon className="w-8 h-8 text-white/30" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
