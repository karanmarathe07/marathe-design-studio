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
    <section id="timeline" className="min-h-screen flex items-center justify-center px-8 py-32">
      <div ref={ref} className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-24 text-center"
        >
          Journey
        </motion.h2>

        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2">
            <div
              ref={lineRef}
              className="w-full h-full bg-white origin-top"
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-24">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center gap-8 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                    <div className="glass-hover p-6 rounded-2xl inline-block">
                      <div className="text-sm text-white/60 mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                      <div className="text-lg text-white/80 mb-3">{item.company}</div>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-white rounded-full" />
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
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
