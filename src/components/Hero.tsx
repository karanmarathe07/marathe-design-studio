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

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ImagePlane />
        </Canvas>
      </div>

      {/* Floating Elements */}
      <FloatingElements />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-7xl md:text-8xl font-bold text-white text-center tracking-tight"
        >
          I build like a designer.
        </motion.h1>
        
        <div className="h-12 flex items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentWordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl text-white/80 font-light"
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
          className="bg-white text-black font-bold py-3 px-6 md:py-3 md:px-6 rounded-lg hover:bg-opacity-80 transition-all duration-300 pointer-events-auto"
        >
          Download CV
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
