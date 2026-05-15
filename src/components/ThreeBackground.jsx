import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({ position, color, speed, size, geometry }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.4;
  });
  return (
    <mesh ref={ref} position={position}>
      {geometry === "torus" ? (
        <torusGeometry args={[size, size * 0.08, 16, 48]} />
      ) : geometry === "octahedron" ? (
        <octahedronGeometry args={[size, 0]} />
      ) : (
        <icosahedronGeometry args={[size, 1]} />
      )}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.12}
        wireframe
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
}

function Particles({ count = 80 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#4fc3f7" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />

      <FloatingShape position={[-4, 2.5, -4]} color="#4fc3f7" speed={0.8} size={1.3} geometry="icosahedron" />
      <FloatingShape position={[4.5, -1.5, -5]} color="#aa00ff" speed={0.6} size={1} geometry="octahedron" />
      <FloatingShape position={[0, 3.5, -6]} color="#2979ff" speed={1} size={0.8} geometry="icosahedron" />
      <FloatingShape position={[-3.5, -3, -3]} color="#00e676" speed={0.5} size={0.7} geometry="octahedron" />
      <FloatingShape position={[3, -3, -4]} color="#ff6b35" speed={0.7} size={0.9} geometry="icosahedron" />

      <Particles count={80} />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
