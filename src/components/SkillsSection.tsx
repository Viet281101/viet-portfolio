import React from 'react';

const SkillsSection: React.FC = () => {
	return (
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
	);
};

export default React.memo(SkillsSection);
