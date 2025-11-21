import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.005;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#4A90E2"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.05, 64, 64]} />
        <meshBasicMaterial
          color="#87CEEB"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

export default Earth;
