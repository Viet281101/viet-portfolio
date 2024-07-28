import React, { useRef, useMemo, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, Euler, Mesh } from 'three';
const HolographicMaterial = lazy(() => import('./HolographicMaterial'));

interface HolographicBoxProps {
	position: Vector3;
	scale: Vector3;
	rotation: Vector3;
	holographicProps: {
		fresnelAmount: number;
		fresnelOpacity: number;
		scanlineSize: number;
		hologramBrightness: number;
		signalSpeed: number;
		hologramColor: string;
		enableBlinking: boolean;
		blinkFresnelOnly: boolean;
		enableAdditive: boolean;
		hologramOpacity: number;
		side: 'FrontSide' | 'BackSide' | 'DoubleSide';
	};
}

const HolographicBox: React.FC<HolographicBoxProps> = ({ position, scale, rotation, holographicProps }) => {
	const meshRef = useRef<Mesh>(null);

	const memoizedPosition = useMemo(() => position, [position]);
	const memoizedScale = useMemo(() => scale, [scale]);
	const memoizedRotation = useMemo(() => new Euler(rotation.x, rotation.y, rotation.z), [rotation]);

	useFrame(() => {
		if (meshRef.current) {
		meshRef.current.rotation.x += 0.01;
		meshRef.current.rotation.y += 0.01;
		meshRef.current.rotation.z += 0.01;
		}
	});

	return (
		<mesh ref={meshRef} position={memoizedPosition} scale={memoizedScale} rotation={memoizedRotation}>
		<boxGeometry args={[1, 1, 1]} />
		<HolographicMaterial {...holographicProps} />
		</mesh>
	);
};

const HolographicCanvas: React.FC = () => {
	return (
		<Canvas>
		<ambientLight intensity={0.5} />
		<pointLight position={[10, 10, 10]} />
		<HolographicBox
			position={new Vector3(-1.1, -0.2, 0)}
			scale={new Vector3(1, 1, 1)}
			rotation={new Vector3(0, 0, 0)}
			holographicProps={{
			fresnelAmount: 0.5,
			fresnelOpacity: 1.0,
			scanlineSize: 8.0,
			hologramBrightness: 1.2,
			signalSpeed: 0.45,
			hologramColor: '#51a4de',
			enableBlinking: true,
			blinkFresnelOnly: true,
			enableAdditive: true,
			hologramOpacity: 1.0,
			side: 'FrontSide',
			}}
		/>
		<HolographicBox
			position={new Vector3(1.1, -2, 0)}
			scale={new Vector3(1, 1, 1)}
			rotation={new Vector3(0, 0, 0)}
			holographicProps={{
			fresnelAmount: 0.5,
			fresnelOpacity: 1.0,
			scanlineSize: 8.0,
			hologramBrightness: 1.2,
			signalSpeed: 0.45,
			hologramColor: '#0d73aa',
			enableBlinking: true,
			blinkFresnelOnly: true,
			enableAdditive: true,
			hologramOpacity: 1.0,
			side: 'BackSide',
			}}
		/>
		<HolographicBox
			position={new Vector3(1.2, 2, 0)}
			scale={new Vector3(1, 1, 1)}
			rotation={new Vector3(0, 0, 0)}
			holographicProps={{
			fresnelAmount: 0.5,
			fresnelOpacity: 1.0,
			scanlineSize: 8.0,
			hologramBrightness: 1.2,
			signalSpeed: 0.45,
			hologramColor: '#3caacc',
			enableBlinking: true,
			blinkFresnelOnly: true,
			enableAdditive: true,
			hologramOpacity: 1.0,
			side: 'DoubleSide',
			}}
		/>
		</Canvas>
	);
};

export default React.memo(HolographicCanvas);
