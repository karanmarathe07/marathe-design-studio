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
    <section id="about" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 overflow-hidden">
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
          className="font-bold mb-10 sm:mb-12 md:mb-16"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
          }}
        >
          About Me
        </motion.h2>

        {/* Responsive Layout - Stack on mobile, 2-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Left: Text Content - Responsive Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="space-y-4 sm:space-y-6 text-foreground/80 leading-relaxed">
              <p 
                className="font-medium text-foreground"
                style={{
                  fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                }}
              >
                I'm a full-stack developer who bridges design and engineering to create 
                exceptional digital experiences.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                }}
              >
                My approach combines technical precision with creative vision—building 
                modern, animated, and logic-driven web applications that don't just work, 
                but feel alive. From pixel-perfect interfaces to robust backend systems, 
                I craft solutions that users love and businesses depend on.
              </p>
              <p
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                }}
              >
                With expertise spanning React, TypeScript, Node.js, and cloud infrastructure, 
                I transform complex ideas into elegant, scalable products. Every project is 
                an opportunity to push boundaries and solve real problems with code.
              </p>
            </div>

            {/* Keyword Cloud - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-2 sm:gap-3 pt-4 sm:pt-6"
            >
              {keywords.map((keyword, i) => (
                <motion.span
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.05 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-full text-xs sm:text-sm font-medium text-foreground/70 cursor-default"
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

          {/* Right: What I Do Cards - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 
              className="font-bold mb-6 sm:mb-8 text-foreground"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              }}
            >
              What I Do
            </h3>
            <div className="grid gap-4 sm:gap-6">
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
                    className="glass-hover p-4 sm:p-6 rounded-2xl group cursor-default"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="relative flex-shrink-0">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
                        <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div>
                        <h4 
                          className="font-bold mb-1.5 sm:mb-2 text-foreground"
                          style={{
                            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                          }}
                        >
                          {item.title}
                        </h4>
                        <p 
                          className="text-foreground/70"
                          style={{
                            fontSize: 'clamp(0.875rem, 2vw, 0.875rem)',
                          }}
                        >
                          {item.description}
                        </p>
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
