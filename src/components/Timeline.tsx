import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: '2024',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Innovations Inc.',
    description: 'Leading development of scalable cloud applications using modern web technologies.',
  },
  {
    year: '2023',
    title: 'Full-Stack Developer',
    company: 'Digital Solutions Co.',
    description: 'Built robust web applications with React, Node.js, and cloud infrastructure.',
  },
  {
    year: '2022',
    title: 'Frontend Developer',
    company: 'Creative Agency',
    description: 'Crafted beautiful, responsive interfaces with focus on user experience.',
  },
  {
    year: '2021',
    title: 'Junior Developer',
    company: 'Startup Labs',
    description: 'Began professional journey building MVPs and learning modern development practices.',
  },
];

const Timeline = () => {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (lineRef.current && isInView) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );
    }
  }, [isInView]);

  return (
    <section id="timeline" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32">
      <div ref={ref} className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-bold mb-16 sm:mb-20 md:mb-24 text-center"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
          }}
        >
          Journey
        </motion.h2>

        <div className="relative">
          {/* Center Line - Hide on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full h-full bg-white origin-top"
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Timeline Items - Stack on mobile, alternate on desktop */}
          <div className="space-y-12 sm:space-y-16 md:space-y-24">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content - Full width on mobile, half on desktop */}
                  <div className={`w-full md:flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="glass-hover p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl inline-block w-full md:w-auto">
                      <div 
                        className="text-foreground/60 mb-2"
                        style={{
                          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                        }}
                      >
                        {item.year}
                      </div>
                      <h3 
                        className="font-bold mb-1"
                        style={{
                          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                        }}
                      >
                        {item.title}
                      </h3>
                      <div 
                        className="text-foreground/80 mb-3"
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                        }}
                      >
                        {item.company}
                      </div>
                      <p 
                        className="text-foreground/70"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot - Hide on mobile */}
                  <div className="hidden md:block relative z-10">
                    <div className="w-4 h-4 bg-white rounded-full" />
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                  </div>

                  {/* Spacer - Only on desktop */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
