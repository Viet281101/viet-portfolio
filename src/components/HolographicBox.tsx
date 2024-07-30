import React, { Suspense, useRef, useMemo, lazy, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, Euler, Mesh, BufferGeometry, Float32BufferAttribute } from 'three';
import { a, useSpring } from '@react-spring/three';
const CanvasLoader = lazy(() => import("./Loader"));
const HolographicMaterial = lazy(() => import('./HolographicMaterial'));

interface HolographicBoxProps {
	position: Vector3;
	mobilePosition?: Vector3;
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
	isMobile?: boolean;
}

const TriangularPrismGeometry = () => {
	const geometry = useMemo(() => {
		const vertices = new Float32Array([
			0, 0.5, 0.5,
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			0, 0.5, -0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, -0.5,
			0, 0.5, 0.5,
			0, 0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
		]);
		const indices = [
			0, 1, 2,
			3, 5, 4,
			1, 4, 5,
			1, 5, 2,
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
			-0.5, -0.5, 0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
			-0.5, -0.5, -0.5,
			0, 0.5, 0,
		]);
		const indices = [
			0, 1, 2,
			0, 2, 3,
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
	mobilePosition,
	scale,
	rotation,
	holographicProps,
	geometryType = 'box',
	rotationSpeed = new Vector3(0.01, 0.01, 0.01),
	movementAmplitude = new Vector3(0.5, 0.5, 0.5),
	movementSpeed = new Vector3(0.5, 0.5, 0.5),
	isMobile = false,
}) => {
	const meshRef = useRef<Mesh>(null);
	const delta = 0.18;
	const [currentGeometryType, setCurrentGeometryType] = useState(geometryType);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isSphere, setIsSphere] = useState(false);

	const actualPosition = useMemo(() => (isMobile && mobilePosition ? mobilePosition : position), [isMobile, mobilePosition, position]);
	const adjustedScale = useMemo(() => (isMobile ? scale.multiplyScalar(1.2) : scale), [scale, isMobile]);
	const adjustedRotationSpeed = useMemo(() => (isMobile ? rotationSpeed.multiplyScalar(1.1) : rotationSpeed), [rotationSpeed, isMobile]);
	const adjustedMovementAmplitude = useMemo(() => (isMobile ? movementAmplitude.multiplyScalar(1.1) : movementAmplitude), [movementAmplitude, isMobile]);
	const adjustedMovementSpeed = useMemo(() => (isMobile ? movementSpeed.multiplyScalar(1.1) : movementSpeed), [movementSpeed, isMobile]);

	const memoizedPosition = useMemo(() => actualPosition, [actualPosition]);
	const memoizedScale = useMemo(() => adjustedScale, [adjustedScale]);
	const memoizedRotation = useMemo(() => new Euler(rotation.x, rotation.y, rotation.z), [rotation]);

	const { scale: animatedScale } = useSpring({
		scale: isAnimating ? [0.5, 0.5, 0.5] : [1, 1, 1],
		config: { duration: 300 },
		onRest: () => setIsAnimating(false),
	});

	const toggleShape = useCallback(() => {
		if (!isAnimating) {
			setIsAnimating(true);
			setIsSphere(!isSphere);
			setCurrentGeometryType(isSphere ? geometryType : 'sphere');
		}
	}, [isAnimating, isSphere, geometryType]);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isSphere) {
			timer = setTimeout(() => {
				setIsAnimating(true);
				setIsSphere(false);
				setCurrentGeometryType(geometryType);
			}, 2000);
		}
		return () => clearTimeout(timer);
	}, [isSphere, geometryType]);

	useFrame(({ clock }) => {
		if (meshRef.current) {
			const time = clock.getElapsedTime();
			meshRef.current.rotation.x += adjustedRotationSpeed.x * delta;
			meshRef.current.rotation.y += adjustedRotationSpeed.y * delta;
			meshRef.current.rotation.z += adjustedRotationSpeed.z * delta;
			meshRef.current.position.x = memoizedPosition.x + Math.sin(time * adjustedMovementSpeed.x) * adjustedMovementAmplitude.x;
			meshRef.current.position.y = memoizedPosition.y + Math.sin(time * adjustedMovementSpeed.y) * adjustedMovementAmplitude.y;
			meshRef.current.position.z = memoizedPosition.z + Math.sin(time * adjustedMovementSpeed.z) * adjustedMovementAmplitude.z;
		}
	});

	return (
		<a.mesh
			ref={meshRef}
			position={memoizedPosition}
			scale={animatedScale.to((s) => [s * memoizedScale.x, s * memoizedScale.y, s * memoizedScale.z])}
			rotation={memoizedRotation}
			onClick={toggleShape}
		>
			{currentGeometryType === 'box' ? (
				<boxGeometry args={[1, 1, 1]} />
			) : currentGeometryType === 'sphere' ? (
				<sphereGeometry args={[0.75, 32, 32]} />
			) : currentGeometryType === 'triangularPrism' ? (
				<TriangularPrismGeometry />
			) : (
				<PyramidGeometry />
			)}
			<HolographicMaterial {...holographicProps} />
		</a.mesh>
	);
};

const HolographicCanvas: React.FC = () => {
	const [isMobile, setIsMobile] = useState(false);
	const mediaQuery = useMemo(() => window.matchMedia('(max-width: 967px)'), []);
	const handleMediaQueryChange = useCallback((event: MediaQueryListEvent) => {
		setIsMobile(event.matches);
	}, []);
	useEffect(() => {
		setIsMobile(mediaQuery.matches);
		mediaQuery.addEventListener('change', handleMediaQueryChange);
		return () => {
			mediaQuery.removeEventListener('change', handleMediaQueryChange);
		};
	}, [mediaQuery, handleMediaQueryChange]);
	return (
	<Canvas>
		<ambientLight intensity={0.5} />
		<pointLight position={[10, 10, 10]} />
		<Suspense fallback={<CanvasLoader />}>
			<HolographicBox
				position={new Vector3(-1.1, 0.8, 0)}
				mobilePosition={new Vector3(-2.4, 0.5, 0)}
				scale={new Vector3(1, 1, 1)}
				rotation={new Vector3(0, 0, 0)}
				holographicProps={{
					fresnelAmount: 0.5, fresnelOpacity: 1.0,
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
				isMobile={isMobile}
			/>
			<HolographicBox
				position={new Vector3(0.8, -0.8, 2.0)}
				mobilePosition={new Vector3(0.8, -1.2, 2.0)}
				scale={new Vector3(1, 1, 1)}
				rotation={new Vector3(0, 0, 0)}
				geometryType="triangularPrism"
				holographicProps={{
					fresnelAmount: 0.1, fresnelOpacity: 0.8,
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
				isMobile={isMobile}
			/>
			<HolographicBox
				position={new Vector3(1.2, 3.2, -1)}
				mobilePosition={new Vector3(1.4, 3.0, -1)}
				scale={new Vector3(1, 1, 1)}
				rotation={new Vector3(0, 0, 0)}
				geometryType="pyramid"
				holographicProps={{
					fresnelAmount: 0.5, fresnelOpacity: 0.8,
					scanlineSize: 6.0,
					hologramBrightness: 0.8,
					signalSpeed: 0.4,
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
				isMobile={isMobile}
			/>
			</Suspense>
		</Canvas>
	);
};

export default React.memo(HolographicCanvas);
