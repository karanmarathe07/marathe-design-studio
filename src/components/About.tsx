import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Zap, Database, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const whatIDo = [
  {
    icon: Code2,
    title: 'Frontend Engineering',
    description: 'Building responsive, performant interfaces with modern frameworks',
  },
  {
    icon: Zap,
    title: 'Motion & Interactions',
    description: 'Crafting smooth animations and delightful user experiences',
  },
  {
    icon: Database,
    title: 'Backend & APIs',
    description: 'Architecting scalable server-side solutions and data flows',
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description: 'Strategic thinking to solve complex technical challenges',
  },
];

const keywords = [
  'Clean Code', 'Performance', 'Animations', 'TypeScript', 'Tailwind',
  'React', 'Node.js', 'Scalability', 'Design Systems', 'DevOps'
];

const About = () => {
  const ref = useRef(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (backgroundRef.current && isInView) {
      gsap.to(backgroundRef.current, {
        y: 50,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }, [isInView]);

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-8 py-32 overflow-hidden">
      {/* Parallax Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 text-8xl font-bold text-white">&lt;/&gt;</div>
        <div className="absolute top-40 right-20 text-6xl font-bold text-white">&#123;&#125;</div>
        <div className="absolute bottom-32 left-1/4 text-7xl font-bold text-white">[ ]</div>
        <div className="absolute bottom-20 right-1/3 text-5xl font-bold text-white">=&gt;</div>
      </div>

      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-16"
        >
          About Me
        </motion.h2>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="space-y-6 text-lg md:text-xl text-foreground/80 leading-relaxed">
              <p className="text-xl md:text-2xl font-medium text-foreground">
                I'm a full-stack developer who bridges design and engineering to create 
                exceptional digital experiences.
              </p>
              <p>
                My approach combines technical precision with creative vision—building 
                modern, animated, and logic-driven web applications that don't just work, 
                but feel alive. From pixel-perfect interfaces to robust backend systems, 
                I craft solutions that users love and businesses depend on.
              </p>
              <p>
                With expertise spanning React, TypeScript, Node.js, and cloud infrastructure, 
                I transform complex ideas into elegant, scalable products. Every project is 
                an opportunity to push boundaries and solve real problems with code.
              </p>
            </div>

            {/* Keyword Cloud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3 pt-6"
            >
              {keywords.map((keyword, i) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.05 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="px-4 py-2 glass rounded-full text-sm font-medium text-foreground/70 cursor-default"
                  style={{
                    animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {keyword}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: What I Do Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">What I Do</h3>
            <div className="grid gap-6">
              {whatIDo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="glass-hover p-6 rounded-2xl group cursor-default"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <Icon className="w-8 h-8 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2 text-foreground">{item.title}</h4>
                        <p className="text-sm text-foreground/70">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
