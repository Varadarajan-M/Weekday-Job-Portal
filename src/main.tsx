import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import StyleInjectionProvider from './components/StyleInjectionProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<StyleInjectionProvider>
			<App />
		</StyleInjectionProvider>
	</React.StrictMode>,
);
