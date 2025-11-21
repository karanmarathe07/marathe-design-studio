import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Database,
  Cloud,
  GitBranch,
  Layers,
  Box,
  Blocks,
  Server,
  Lock,
  Cpu,
} from 'lucide-react';

const skills = [
  { name: 'JavaScript', icon: Code2 },
  { name: 'TypeScript', icon: Code2 },
  { name: 'React', icon: Layers },
  { name: 'Next.js', icon: Layers },
  { name: 'Express', icon: Server },
  { name: 'Node.js', icon: Server },
  { name: 'Python', icon: Code2 },
  { name: 'LangChain', icon: Blocks },
  { name: 'LangGraph', icon: Blocks },
  { name: 'Postgres', icon: Database },
  { name: 'Prisma', icon: Database },
  { name: 'C', icon: Cpu },
  { name: 'Docker', icon: Box },
  { name: 'Kubernetes', icon: Box },
  { name: 'AWS', icon: Cloud },
  { name: 'Git', icon: GitBranch },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32">
      <div ref={ref} className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-bold mb-12 sm:mb-14 md:mb-16 text-center"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
          }}
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="glass-hover p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 group cursor-default"
              >
                <div className="relative">
                  <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white/80 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span 
                  className="font-medium text-center"
                  style={{
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  }}
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
