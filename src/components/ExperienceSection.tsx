import React from 'react';

const ExperienceSection: React.FC = () => {
	return (
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
	);
};

export default React.memo(ExperienceSection);
