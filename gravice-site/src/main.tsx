import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const style = document.createElement('style');
style.textContent = 'html{scroll-behavior:smooth}body{margin:0;background:#0E1A2B}';
document.head.appendChild(style);

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
