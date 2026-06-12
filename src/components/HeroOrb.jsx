import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Orb() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 6]} />
        <MeshDistortMaterial
          color="#0066FF"
          roughness={0.05}
          metalness={0.9}
          distort={0.35}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function Ring({ radius, opacity, speed, tiltX }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * speed;
    ref.current.rotation.x = tiltX + Math.sin(t * 0.2) * 0.05;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.012, 8, 120]} />
      <meshBasicMaterial color="#0066FF" transparent opacity={opacity} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef();
  const count = 200;

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.8 + Math.random() * 2;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.04} color="#0066FF" sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export default function HeroOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#0066FF" />
      <pointLight position={[0, 5, -5]} intensity={0.4} color="#8ec5fc" />
      <Orb />
      <Ring radius={2.5} opacity={0.35} speed={0.3} tiltX={1.2} />
      <Ring radius={3.2} opacity={0.18} speed={-0.18} tiltX={0.4} />
      <Particles />
    </Canvas>
  );
}
