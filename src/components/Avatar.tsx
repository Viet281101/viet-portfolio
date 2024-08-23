import React, { Suspense, useEffect, useState, useMemo, useCallback } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./Loader";
import avatar_model from "/avatar/scene.glb?url";

interface AvatarProps {
	isMobile: boolean;
}

const Avatar = React.memo(({ isMobile }: AvatarProps) => {
	const avatar = useGLTF(avatar_model);
	return (
		<mesh>
			<hemisphereLight intensity={1.15} groundColor={"black"} />
			<pointLight intensity={1} />
			<spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize={1024} />
			<primitive object={avatar.scene} scale={isMobile ? 1.4 : 1} position={isMobile ? [0, -1, 0] : [0, -1.5, 0]} rotation={[0, 0, 0]} />
		</mesh>
	);
});

const AvatarCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);
	const mediaQuery = useMemo(() => window.matchMedia("(max-width: 967px)"), []);
	const handleMediaQueryChange = useCallback((event: MediaQueryListEvent) => { setIsMobile(event.matches); }, []);

	useEffect(() => {
		setIsMobile(mediaQuery.matches);
		mediaQuery.addEventListener("change", handleMediaQueryChange);
		return () => { mediaQuery.removeEventListener("change", handleMediaQueryChange); };
	}, [mediaQuery, handleMediaQueryChange]);

	return (
		<Canvas frameloop="demand" shadows camera={{ position: [10, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
				<Avatar isMobile={isMobile} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

export default React.memo(AvatarCanvas);
