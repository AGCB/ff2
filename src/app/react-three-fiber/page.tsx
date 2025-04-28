"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState, useEffect, Suspense } from "react";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";

const Model = ({ modelPath }: { modelPath: string }) => {
  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.manager.onError = (url) => {
      console.warn(`⚠️ Failed to load resource: ${url}`);
    };
  });
  // Load all relevant textures
  const [colorMap, normalMap, roughnessMap] = useTexture([
    "/textures/cherry.png",
    "/textures/cherry-normal.jpg",
    "/textures/cherry-roughness.jpg",
  ]);

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if ((child as any).isMesh) {
        const mesh = child as Mesh;
        const material = mesh.material as MeshStandardMaterial;

        material.map = colorMap;
        material.normalMap = normalMap;
        material.roughnessMap = roughnessMap;
        material.metalness = 0.1;
        material.roughness = 1;
        material.needsUpdate = true;
      }
    });
  }, [gltf, colorMap, normalMap, roughnessMap]);
  return <primitive object={gltf.scene} scale={4.5} position={[0, -1, 0]} />;
};

const BouncingGroup = () => {
  const groupRef = useRef<Group>(null!);
  const boxRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t) * 0.5;
      groupRef.current.rotation.y += 0.01;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={boxRef}
        position={[-2, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[3, 1, 2]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "skyblue"} />
      </mesh>
      <mesh position={[2, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="gold" />
      </mesh>
    </group>
  );
};

const RotatingBox = () => {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      //   meshRef.current.rotation.x += 0.02;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={active ? 1.2 : 0.9}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[3, 1, 2]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "skyblue"} />
    </mesh>
  );
};

const ReactThreeFiber = () => {
  return (
    <div
      className="border-8 border-amber-900"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls />
        <Model modelPath="/half-pipe.glb" />
        <Suspense />
        <RotatingBox />
        <BouncingGroup />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshLambertMaterial color="blue" />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[5, 3]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default ReactThreeFiber;
