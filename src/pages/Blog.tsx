import React from 'react';

const Blog: React.FC = () => {
	return (
		<div className="text-white">
		<h1>Blog</h1>
		<p>Welcome to my portfolio!</p>
		</div>
	)
}

export default React.memo(Blog);