import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// @ts-ignore CSS side-effect imports are handled by the bundler.
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
