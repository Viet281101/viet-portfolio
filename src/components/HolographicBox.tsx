import React, { useRef, useMemo, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, Euler, Mesh, BufferGeometry, Float32BufferAttribute } from 'three';
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
	geometryType?: 'box' | 'sphere' | 'triangularPrism' | 'pyramid';
	rotationSpeed?: Vector3;
	movementAmplitude?: Vector3;
	movementSpeed?: Vector3;
}

const TriangularPrismGeometry = () => {
	const geometry = useMemo(() => {
		const vertices = new Float32Array([
			// Front face
			0, 0.5, 0.5, // top vertex
			-0.5, -0.5, 0.5, // bottom-left vertex
			0.5, -0.5, 0.5, // bottom-right vertex
			// Back face
			0, 0.5, -0.5, // top vertex
			-0.5, -0.5, -0.5, // bottom-left vertex
			0.5, -0.5, -0.5, // bottom-right vertex
			// Connecting edges
			0, 0.5, 0.5,
			0, 0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
		]);

		const indices = [
			// Front face
			0, 1, 2,
			// Back face
			3, 5, 4,
			// Bottom face
			1, 4, 5,
			1, 5, 2,
			// Top edges
			0, 3, 4,
			0, 4, 1,
			0, 2, 5,
			0, 5, 3,
		];

		const geometry = new BufferGeometry();
		geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		geometry.setIndex(indices);
		geometry.computeVertexNormals();

		return geometry;
	}, []);

	return <primitive object={geometry} attach="geometry" />;
};

const PyramidGeometry = () => {
	const geometry = useMemo(() => {
		const vertices = new Float32Array([
			// Base
			-0.5, -0.5, 0.5, // bottom-left vertex
			0.5, -0.5, 0.5, // bottom-right vertex
			0.5, -0.5, -0.5, // top-right vertex
			-0.5, -0.5, -0.5, // top-left vertex
			// Apex
			0, 0.5, 0, // top vertex
		]);

		const indices = [
			// Base
			0, 1, 2,
			0, 2, 3,
			// Sides
			0, 1, 4,
			1, 2, 4,
			2, 3, 4,
			3, 0, 4,
		];

		const geometry = new BufferGeometry();
		geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		geometry.setIndex(indices);
		geometry.computeVertexNormals();

		return geometry;
	}, []);

	return <primitive object={geometry} attach="geometry" />;
};

const HolographicBox: React.FC<HolographicBoxProps> = ({
	position,
	scale,
	rotation,
	holographicProps,
	geometryType = 'box',
	rotationSpeed = new Vector3(0.01, 0.01, 0.01),
	movementAmplitude = new Vector3(0.5, 0.5, 0.5),
	movementSpeed = new Vector3(0.5, 0.5, 0.5),
}) => {
	const meshRef = useRef<Mesh>(null);
	const delta = 0.18;

	const memoizedPosition = useMemo(() => position, [position]);
	const memoizedScale = useMemo(() => scale, [scale]);
	const memoizedRotation = useMemo(() => new Euler(rotation.x, rotation.y, rotation.z), [rotation]);

	useFrame(({ clock }) => {
		if (meshRef.current) {
			const time = clock.getElapsedTime();
			meshRef.current.rotation.x += rotationSpeed.x * delta;
			meshRef.current.rotation.y += rotationSpeed.y * delta;
			meshRef.current.rotation.z += rotationSpeed.z * delta;
			meshRef.current.position.x = memoizedPosition.x + Math.sin(time * movementSpeed.x) * movementAmplitude.x;
			meshRef.current.position.y = memoizedPosition.y + Math.sin(time * movementSpeed.y) * movementAmplitude.y;
			meshRef.current.position.z = memoizedPosition.z + Math.sin(time * movementSpeed.z) * movementAmplitude.z;
		}
	});

	return (
		<mesh ref={meshRef} position={memoizedPosition} scale={memoizedScale} rotation={memoizedRotation}>
			{geometryType === 'box' ? (
				<boxGeometry args={[1, 1, 1]} />
			) : geometryType === 'sphere' ? (
				<sphereGeometry args={[0.75, 32, 32]} />
			) : geometryType === 'triangularPrism' ? (
				<TriangularPrismGeometry />
			) : (
				<PyramidGeometry />
			)}
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
				position={new Vector3(-1.1, 0.8, 0)}
				scale={new Vector3(1, 1, 1)}
				rotation={new Vector3(0, 0, 0)}
				holographicProps={{
					fresnelAmount: 0.5,
					fresnelOpacity: 1.0,
					scanlineSize: 9.0,
					hologramBrightness: 0.6,
					signalSpeed: 0.2,
					hologramColor: '#51a4de',
					enableBlinking: true,
					blinkFresnelOnly: true,
					enableAdditive: true,
					hologramOpacity: 0.8,
					side: 'DoubleSide',
				}}
				rotationSpeed={new Vector3(0.01, 0.02, 0.03)}
				movementAmplitude={new Vector3(0.5, 0.5, 0.5)}
				movementSpeed={new Vector3(0.5, 0.5, 0.5)}
			/>
			<HolographicBox
				position={new Vector3(0.8, -0.8, 2.0)}
				scale={new Vector3(1, 1, 1)}
				rotation={new Vector3(0, 0, 0)}
				geometryType='triangularPrism'
				holographicProps={{
					fresnelAmount: 0.1,
					fresnelOpacity: 0.8,
					scanlineSize: 12.0,
					hologramBrightness: 1.0,
					signalSpeed: 0.05,
					hologramColor: '#0d73aa',
					enableBlinking: true,
					blinkFresnelOnly: true,
					enableAdditive: true,
					hologramOpacity: 0.7,
					side: 'DoubleSide',
				}}
				rotationSpeed={new Vector3(0.02, 0.01, 0.015)}
				movementAmplitude={new Vector3(0.2, 0.2, 0.2)}
				movementSpeed={new Vector3(0.3, 0.3, 0.3)}
			/>
			<HolographicBox
				position={new Vector3(1.2, 3.6, -1)}
				scale={new Vector3(1, 1, 1)}
				rotation={new Vector3(0, 0, 0)}
				geometryType="pyramid"
				holographicProps={{
					fresnelAmount: 0.5,
					fresnelOpacity: 0.8,
					scanlineSize: 6.0,
					hologramBrightness: 0.8,
					signalSpeed: 0.45,
					hologramColor: '#3caacc',
					enableBlinking: true,
					blinkFresnelOnly: true,
					enableAdditive: true,
					hologramOpacity: 0.9,
					side: 'DoubleSide',
				}}
				rotationSpeed={new Vector3(0.015, 0.025, 0.02)}
				movementAmplitude={new Vector3(0.4, 0.1, 0.4)}
				movementSpeed={new Vector3(0.4, 0.4, 0.4)}
			/>
		</Canvas>
	);
};

export default React.memo(HolographicCanvas);
