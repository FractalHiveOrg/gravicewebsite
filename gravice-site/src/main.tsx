import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const style = document.createElement('style');
style.textContent = 'html{scroll-behavior:smooth}body{margin:0;background:#0E1A2B}';
document.head.appendChild(style);

// any https: link opens in a new tab
document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="https:"]');
  if (!a) return;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
}, { capture: true });

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
