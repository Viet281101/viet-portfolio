import React from 'react';

const About: React.FC = () => {
	return (
		<div className="about-container">
		{/* Section 1: Intro & Model 3D avatar */}
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

		{/* Section 2: Skills */}
		<section className="about-skills">
			<h2 className="section-title">Skills</h2>
			<div className="skills-content">
			<div className="skill-card">
				<h3>Frontend Development</h3>
				<p>React, Vue, Angular...</p>
			</div>
			<div className="skill-card">
				<h3>Backend Development</h3>
				<p>Node.js, Express, Django...</p>
			</div>
			<div className="skill-card">
				<h3>UI/UX Design</h3>
				<p>Figma, Adobe XD...</p>
			</div>
			</div>
		</section>

		{/* Section 3: Experiences (Timeline Experience) */}
		<section className="about-experience">
			<h2 className="section-title">Experience</h2>
			<div className="experience-timeline">
			<div className="timeline-container">
				<div className="timeline-item">
				<h4>Project A</h4>
				<p>2021 - Present</p>
				<p>Description of the project...</p>
				</div>
				<div className="timeline-item">
				<h4>Project B</h4>
				<p>2020 - 2021</p>
				<p>Description of the project...</p>
				</div>
				<div className="timeline-item">
				<h4>Project C</h4>
				<p>2019 - 2020</p>
				<p>Description of the project...</p>
				</div>
			</div>
			</div>
		</section>
		</div>
	);
};

export default React.memo(About);
