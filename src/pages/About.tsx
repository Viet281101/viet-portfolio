import React from 'react';
import IntroSection from '../components/IntroSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';

const About: React.FC = () => {
	return (
		<div className="about-container">
			{/* Section 1: Intro & Model 3D avatar */}
			<IntroSection />

			{/* Section 2: Skills */}
			<SkillsSection />

			{/* Section 3: Experiences (Timeline Experience) */}
			<ExperienceSection />
		</div>
	);
};

export default React.memo(About);
