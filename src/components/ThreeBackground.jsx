import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Gradient wireframe shader */
const gradientWireframeVert = `
  varying vec3 vPosition;
  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gradientWireframeFrag = `
  uniform vec3 colorA;
  uniform vec3 colorB;
  uniform float time;
  uniform float opacity;
  varying vec3 vPosition;
  void main() {
    float mixFactor = 0.5 + 0.5 * sin(vPosition.y * 2.0 + time * 0.5);
    vec3 color = mix(colorA, colorB, mixFactor);
    // Add subtle shimmer
    float shimmer = 0.85 + 0.15 * sin(time * 1.5 + vPosition.x * 3.0);
    gl_FragColor = vec4(color * shimmer, opacity);
  }
`;

function FloatingShape({ position, colorA, colorB, speed, size, geometry, shapeOpacity = 0.35 }) {
  const ref = useRef();
  const materialRef = useRef();

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: gradientWireframeVert,
      fragmentShader: gradientWireframeFrag,
      uniforms: {
        colorA: { value: new THREE.Color(colorA) },
        colorB: { value: new THREE.Color(colorB) },
        time: { value: 0 },
        opacity: { value: shapeOpacity },
      },
      transparent: true,
      wireframe: true,
      depthWrite: false,
    });
  }, [colorA, colorB, shapeOpacity]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.4;
    shaderMaterial.uniforms.time.value = t;
  });

  return (
    <mesh ref={ref} position={position} material={shaderMaterial}>
      {geometry === "torus" ? (
        <torusGeometry args={[size, size * 0.08, 16, 48]} />
      ) : geometry === "octahedron" ? (
        <octahedronGeometry args={[size, 0]} />
      ) : (
        <icosahedronGeometry args={[size, 1]} />
      )}
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

      <FloatingShape position={[-4, 2.5, -4]} colorA="#4fc3f7" colorB="#2979ff" speed={0.8} size={1.3} geometry="icosahedron" shapeOpacity={0.3} />
      <FloatingShape position={[4.5, -1.5, -5]} colorA="#aa00ff" colorB="#e040fb" speed={0.6} size={1} geometry="octahedron" shapeOpacity={0.35} />
      <FloatingShape position={[0, 3.5, -6]} colorA="#2979ff" colorB="#4fc3f7" speed={1} size={0.8} geometry="icosahedron" shapeOpacity={0.25} />
      <FloatingShape position={[-3.5, -3, -3]} colorA="#00e676" colorB="#4fc3f7" speed={0.5} size={0.7} geometry="octahedron" shapeOpacity={0.3} />
      <FloatingShape position={[3, -3, -4]} colorA="#ff6b35" colorB="#ffab40" speed={0.7} size={0.9} geometry="icosahedron" shapeOpacity={0.3} />

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
