import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import StyleInjectionProvider from './components/StyleInjectionProvider.tsx';
import './index.css';
import store from './store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<StyleInjectionProvider>
			<App />
		</StyleInjectionProvider>
	</Provider>,
);
