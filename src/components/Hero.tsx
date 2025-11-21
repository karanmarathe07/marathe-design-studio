import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '@/assets/hero-placeholder.jpg';
import FloatingElements from './FloatingElements';

gsap.registerPlugin(ScrollTrigger);

function ImagePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(heroImage);
  const [hoverPosition, setHoverPosition] = useState({ x: 0.5, y: 0.5 });

  const shaderMaterial = useRef(
    new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uHoverPosition: { value: new THREE.Vector2(0.5, 0.5) },
        uRevealRadius: { value: 0.15 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 uHoverPosition;
        uniform float uRevealRadius;
        varying vec2 vUv;

        void main() {
          float dist = distance(vUv, uHoverPosition);
          float mixFactor = smoothstep(uRevealRadius, uRevealRadius - 0.05, dist);
          
          vec4 originalColor = texture2D(uTexture, vUv);
          vec4 darkColor = originalColor * 0.3;
          
          gl_FragColor = mix(darkColor, originalColor, mixFactor);
        }
      `,
    })
  );

  useFrame(() => {
    if (shaderMaterial.current) {
      shaderMaterial.current.uniforms.uHoverPosition.value.lerp(
        new THREE.Vector2(hoverPosition.x, 1.0 - hoverPosition.y),
        0.1
      );
    }
  });

  const handlePointerMove = (event: any) => {
    const x = event.uv.x;
    const y = event.uv.y;
    setHoverPosition({ x, y });
  };

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      scale={[8, 4.5, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <primitive object={shaderMaterial.current} attach="material" />
    </mesh>
  );
}

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['Web Developer', 'Frontend Engineer', 'UI Innovator', 'Creative Coder'];
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        y: 100,
        opacity: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  const scrollToNext = () => {
    const techOrbitSection = document.getElementById('tech-orbit');
    if (techOrbitSection) {
      techOrbitSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Photo Background with Blur/Glow - Behind Text - Responsive */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          style={{
            filter: 'blur(2px)',
          }}
        >
          <div 
            className="w-full h-full rounded-full bg-cover bg-center opacity-30 sm:opacity-35 md:opacity-40"
            style={{
              backgroundImage: `url(${heroImage})`,
              boxShadow: '0 0 80px 40px rgba(255, 255, 255, 0.08), 0 0 120px 60px rgba(255, 255, 255, 0.1)',
            }}
          />
          {/* Additional glow layers */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      </div>

      {/* Three.js Canvas - Subtle background texture */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ImagePlane />
        </Canvas>
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Text Overlay - Responsive Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-3 sm:gap-4 z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-bold text-white text-center tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            lineHeight: 1.1,
          }}
        >
          I build like a designer.
        </motion.h1>
        
        <div className="h-10 sm:h-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentWordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-white/80 font-light"
              style={{
                fontSize: 'clamp(1.125rem, 3.5vw, 1.875rem)',
              }}
            >
              {words[currentWordIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.a
          href="/KARAN MARATHE CV.pdf"
          download="KARAN MARATHE CV.pdf"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-white text-black font-bold py-2.5 px-5 sm:py-3 sm:px-6 md:py-3 md:px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 pointer-events-auto mt-4 text-sm sm:text-base"
        >
          Download CV
        </motion.a>
      </div>

      {/* Modern Scroll Indicator - Responsive */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer pointer-events-auto z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-6 h-10 sm:w-7 sm:h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2 hover:border-white/60 transition-colors">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.button>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />
    </section>
  );
};

export default Hero;
