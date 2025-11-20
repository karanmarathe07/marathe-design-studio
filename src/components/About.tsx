import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-8 py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl"
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-6xl font-bold mb-8"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6 text-lg md:text-xl text-white/80 leading-relaxed"
        >
          <p>
            I'm a full-stack developer and designer who believes that great products are born
            at the intersection of beautiful design and robust engineering. My approach combines
            technical precision with creative vision to build experiences that users love.
          </p>
          <p>
            With expertise spanning modern web technologies, cloud infrastructure, and AI integration,
            I transform complex ideas into elegant, scalable solutions. Every project is an opportunity
            to push boundaries and create something exceptional.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new design trends, experimenting with
            emerging technologies, or contributing to open-source projects that make the web a
            better place.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
