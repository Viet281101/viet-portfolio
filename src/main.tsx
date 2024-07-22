import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './styles/main.scss'

const basename = process.env.NODE_ENV === 'production' ? '/viet-portfolio' : '/';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Router basename={basename}>
		<App />
		</Router>
	</React.StrictMode>
)
