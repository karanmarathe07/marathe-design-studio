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
    <section id="skills" className="min-h-screen flex items-center justify-center px-8 py-32">
      <div ref={ref} className="max-w-6xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-16 text-center"
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                className="glass-hover p-6 rounded-2xl flex flex-col items-center justify-center gap-4 group cursor-default"
              >
                <div className="relative">
                  <Icon className="w-10 h-10 text-white/80 group-hover:text-white transition-colors duration-300" />
                  <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-sm font-medium text-center">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
