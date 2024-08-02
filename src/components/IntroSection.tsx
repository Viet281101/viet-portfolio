import React from 'react';

const IntroSection: React.FC = () => {
	return (
		<section className="about-intro">
			<h2 className="section-title">About Me</h2>
			<div className="intro-content">
				<div className="intro-text">
					<h3>Viet Nguyen</h3>
					<p>Creative Developer with a passion for creating immersive web experiences...</p>
				</div>
				<div className="intro-avatar">
					{/* Placeholder for 3D avatar model */}
					<div className="avatar-placeholder">
						{/* Code to render 3D avatar model goes here */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(IntroSection);
