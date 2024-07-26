import React, { lazy, Suspense } from 'react';
const ComputersCanvas = lazy(() => import('../components/Computers'));
const FlowFieldEffectWrapper = lazy(() => import('../components/FlowFieldEffectWrapper'));

const Hero: React.FC = () => {
	return (
		<div id="hero-container" className="hero">
		<Suspense fallback={<div>Loading...</div>}>
			<FlowFieldEffectWrapper />
		</Suspense>
		<div id="hero-text-container" className="hero-content z-20 flex flex-col justify-between h-full">
			<div id="hero-text" className="flex-1 flex items-center justify-center animate-zoom-appear">
			<div>
				<h1>VIET NGUYEN</h1>
				<p>Creative Developer & Programmer</p>
			</div>
			</div>
			<div id="computers-canvas" className="flex-1 z-20">
			<ComputersCanvas />
			</div>
		</div>
		<canvas id="hero-graphic" className="hero-canvas z-20" />
		</div>
	);
};

export default React.memo(Hero);
