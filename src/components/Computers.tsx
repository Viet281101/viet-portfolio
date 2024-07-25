import { Suspense, useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";
import desktop_pc from "/desktop_pc/scene.glb?url";

interface ComputersProps {
	isMobile: boolean;
};

const Computers = ({ isMobile }: ComputersProps) => {
	const computer = useGLTF(desktop_pc);

	return (
		<mesh>
		<hemisphereLight intensity={0.15} groundColor={"black"} />
		<pointLight intensity={2} />
		<spotLight position={[0, 50, 0]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize={1024} />
		<primitive object={computer.scene} scale={isMobile ? 0.6 : 0.8} position={isMobile ? [0, 0, -1] : [0, -2, -1]} rotation={[0, 0, 0]} />
		</mesh>
	);
};

const ComputersCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");

		// Set initial value
		setIsMobile(mediaQuery.matches);

		// Define callback function to handle media query changes
		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};

		// Add event listener for media query changes
		mediaQuery.addEventListener("change", handleMediaQueryChange);

		// Cleanup event listener on component unmount
		return () => { mediaQuery.removeEventListener("change", handleMediaQueryChange); };
	}, []);

	return (
		<Canvas frameloop="demand" shadows camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
		<Suspense fallback={<CanvasLoader />}>
			<OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
			<Computers isMobile={isMobile} />
		</Suspense>
		<Preload all />
		</Canvas>
	);
};

export default ComputersCanvas;
