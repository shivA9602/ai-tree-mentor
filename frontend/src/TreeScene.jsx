import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

/*
  Tree Component
  - Loads GLB model
  - Smoothly transitions color using lerp
*/
function Tree({ color }) {
  const { scene } = useGLTF("/tree.glb");
  const groupRef = useRef();

  // Convert hex string to THREE color
  const targetColor = new THREE.Color(color);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.needsUpdate = true;
        }
      });
    }
  }, []);

  // Smooth color transition
  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.traverse((child) => {
      if (child.isMesh && child.material?.color) {
        child.material.color.lerp(targetColor, 0.05);
      }
    });
  });

  return (
    <Center>
      <primitive ref={groupRef} object={scene} scale={1} />
    </Center>
  );
}

/*
  Main Scene
*/
export default function TreeScene({ treeColor }) {
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        background: "white",
      }}
      camera={{ position: [0, 2, 6], fov: 50 }}
      shadows
    >
      {/* Ambient Light reacts to emotion */}
      <ambientLight intensity={0.6} color={treeColor} />

      {/* Directional Light for depth */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
      />

      {/* Cinematic environment lighting */}
      <Environment preset="night" />

      {/* 3D Tree */}
      <Tree color={treeColor} />

      {/* Mouse Controls */}
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}