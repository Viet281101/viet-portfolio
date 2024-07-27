import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import HolographicMaterial from './HolographicMaterial';

const HolographicBox: React.FC = () => {
	return (
		<Canvas>
		<OrbitControls />
		<ambientLight intensity={0.5} />
		<pointLight position={[10, 10, 10]} />
		<mesh>
			<boxGeometry args={[1, 1, 1]} />
			<HolographicMaterial
			fresnelAmount={0.5}
			fresnelOpacity={1.0}
			scanlineSize={8.0}
			hologramBrightness={1.2}
			signalSpeed={0.45}
			hologramColor="#51a4de"
			enableBlinking={true}
			blinkFresnelOnly={true}
			enableAdditive={true}
			hologramOpacity={1.0}
			side="DoubleSide"
			/>
		</mesh>
		</Canvas>
	);
};

export default React.memo(HolographicBox);
