import React from 'react';
import AvatarCanvas from './Avatar';

const IntroSection: React.FC = () => {
	return (
		<section className="about-intro flex flex-col md:flex-row items-center justify-between py-8 px-4 md:px-16">
		<div className="intro-avatar w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
			<AvatarCanvas />
		</div>
		<div className="intro-text w-full md:w-1/2 flex flex-col justify-center">
			<h3 className="text-4xl font-bold text-center md:text-left text-cyan-500 mb-4">Viet Nguyen</h3>
			<p className="text-lg text-gray-300 text-center md:text-left leading-relaxed">
			Creative Developer with a passion for creating immersive web experiences...
			</p>
		</div>
		</section>
	);
};

export default React.memo(IntroSection);
