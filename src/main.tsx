import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/main.scss';
const App = lazy(() => import('./App'));
const basename = process.env.NODE_ENV === 'production' ? '/viet-portfolio' : '/';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router basename={basename}>
		<Suspense fallback={<div>Loading...</div>}>
			<App />
		</Suspense>
		</Router>
	</React.StrictMode>
);