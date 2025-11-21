import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCards } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import './swiper-custom.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI-Powered Analytics Platform',
    description: 'Enterprise-grade analytics dashboard with real-time data processing and ML insights.',
    tags: ['React', 'Python', 'TensorFlow', 'AWS'],
    link: '#',
    github: '#',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack marketplace with payment integration, inventory management, and analytics.',
    tags: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL'],
    link: '#',
    github: '#',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Multi-platform social media management tool with scheduling and analytics.',
    tags: ['React', 'Express', 'MongoDB', 'Redis'],
    link: '#',
    github: '#',
  },
  {
    title: 'Cloud Infrastructure Manager',
    description: 'DevOps tool for managing and monitoring cloud resources across multiple providers.',
    tags: ['TypeScript', 'Docker', 'Kubernetes', 'Terraform'],
    link: '#',
    github: '#',
  },
];

const Works = () => {
  const ref = useRef(null);
  const marqueeRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        x: -100,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.4,
      ease: 'elastic.out(1, 0.3)',
      transformPerspective: 1000,
    });

    setHoveredCard(index);
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
    setHoveredCard(null);
  };

  return (
    <section
      id="works"
      ref={ref}
      className="min-h-screen px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 relative z-20"
      style={{ 
        background: '#f7f7f7',
        clipPath: 'none',
      }}
    >
      {/* Animated Marquee - Responsive */}
      <div className="overflow-hidden mb-16 sm:mb-20 md:mb-24">
        <motion.div
          ref={marqueeRef}
          className="font-bold whitespace-nowrap opacity-10"
          style={{ 
            color: 'rgb(28, 28, 28)',
            fontSize: 'clamp(3rem, 15vw, 12rem)',
          }}
        >
          Design with logic • Design with logic • Design with logic •
        </motion.div>
      </div>

      {/* Section Title - Responsive */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-bold mb-12 sm:mb-14 md:mb-16 text-center"
        style={{ 
          color: 'rgb(28, 28, 28)',
          fontSize: 'clamp(2.5rem, 7vw, 4rem)',
        }}
      >
        Selected Works
      </motion.h2>

      {/* Projects Swiper - Fully Responsive */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, EffectCards]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 2, spaceBetween: 28 },
            1280: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="pb-8 sm:pb-12"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseMove={(e) => handleCardHover(e, index)}
                onMouseLeave={handleCardLeave}
                className="magnetic p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between relative overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  background: 'rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(12px)',
                  border: hoveredCard === index 
                    ? '2px solid transparent'
                    : '1px solid rgba(255, 255, 255, 0.4)',
                  backgroundImage: hoveredCard === index 
                    ? 'linear-gradient(rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.18)), linear-gradient(135deg, rgba(28,28,28,0.3), rgba(28,28,28,0.1))'
                    : 'none',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                  boxShadow: hoveredCard === index
                    ? '0 20px 60px rgba(28, 28, 28, 0.15), 0 0 40px rgba(28, 28, 28, 0.1)'
                    : '0 8px 32px rgba(28, 28, 28, 0.1)',
                  transition: 'box-shadow 0.3s ease',
                  clipPath: 'none',
                  minHeight: 'clamp(350px, 50vw, 400px)',
                }}
              >
                {/* Card Content - Responsive Typography */}
                <div>
                  <h3 
                    className="font-bold mb-2 sm:mb-3" 
                    style={{ 
                      color: 'rgb(28, 28, 28)',
                      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="mb-4 sm:mb-6" 
                    style={{ 
                      color: 'rgb(28, 28, 28)', 
                      opacity: 0.8,
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                    }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 font-medium rounded-full"
                        style={{ 
                          background: 'rgba(28, 28, 28, 0.1)',
                          color: 'rgb(28, 28, 28)',
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.75rem)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links - Responsive */}
                <div className="flex gap-3 sm:gap-4">
                  <a
                    href={project.link}
                    className="flex items-center gap-1.5 sm:gap-2 transition-colors"
                    style={{ 
                      color: 'rgb(28, 28, 28)',
                      opacity: 0.8,
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-1.5 sm:gap-2 transition-colors"
                    style={{ 
                      color: 'rgb(28, 28, 28)',
                      opacity: 0.8,
                      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Code
                  </a>
                </div>

                {/* Floating corner effect */}
                {hoveredCard === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full"
                    style={{
                      background: 'linear-gradient(to top left, rgba(28, 28, 28, 0.2), transparent)',
                    }}
                  />
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Works;
