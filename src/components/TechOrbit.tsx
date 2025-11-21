import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { Code2, Database, Box, Server, Blocks, GitBranch } from 'lucide-react';

// Wireframe Sphere Component
function WireframeSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.15}
      />
      {/* Glow effect */}
      <mesh scale={1.02}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </mesh>
  );
}

// Orbiting Icon Component
function OrbitingIcon({
  Icon,
  radius,
  speed,
  offset,
  label
}: {
  Icon: any;
  radius: number;
  speed: number;
  offset: number;
  label: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * 0.5;
      ref.current.rotation.y = -t;

      // Scale effect on hover
      const targetScale = hovered ? 1.5 : 1;
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={ref}>
      {/* Invisible larger mesh for easier hover detection */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        visible={false}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Visible mesh */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={hovered ? 1 : 0.9}
        />
      </mesh>


    </group>
  );
}

const TechOrbit = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const techStack = useMemo(() => [
    { Icon: Code2, label: 'JavaScript', radius: 3, speed: 0.3, offset: 0 },
    { Icon: Code2, label: 'TypeScript', radius: 3.5, speed: 0.25, offset: 1 },
    { Icon: Code2, label: 'React', radius: 3.2, speed: 0.28, offset: 2 },
    { Icon: Code2, label: 'Next.js', radius: 3.8, speed: 0.22, offset: 3 },
    { Icon: Server, label: 'Node.js', radius: 3.4, speed: 0.26, offset: 4 },
    { Icon: Database, label: 'Python', radius: 3.6, speed: 0.24, offset: 5 },
    { Icon: Box, label: 'Docker', radius: 3.3, speed: 0.27, offset: 6 },
    { Icon: GitBranch, label: 'Git', radius: 3.7, speed: 0.23, offset: 7 },
  ], []);

  return (
    <section 
      id="tech-orbit"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 50%, hsl(var(--background) / 0.9) 100%)',
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none" />
      
      {/* Faint grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16">
        {/* 3D Canvas - Responsive Sizing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] relative"
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <WireframeSphere />
            {techStack.map((tech, i) => (
              <OrbitingIcon key={i} {...tech} />
            ))}
          </Canvas>
          
          {/* Glow effect behind canvas */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-radial from-white via-transparent to-transparent" />
        </motion.div>

        {/* Text Content - Responsive Typography */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left"
        >
          <h2 
            className="font-bold text-foreground"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            }}
          >
            Tech Orbit
          </h2>
          <p 
            className="text-foreground/70 leading-relaxed max-w-xl mx-auto lg:mx-0"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            }}
          >
            Tools and technologies that shape how I build experiences. 
            A constellation of modern frameworks, languages, and platforms 
            revolving around innovation.
          </p>
          
          {/* Floating tech badges - Responsive */}
          <div className="flex flex-wrap gap-2 sm:gap-3 pt-4 justify-center lg:justify-start">
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Docker', 'Git'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 glass rounded-full text-xs sm:text-sm font-medium text-foreground/80"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default TechOrbit;
