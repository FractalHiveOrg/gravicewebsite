import './gravice.css';

// page-wide animation (mount once)
export { DotField } from './components/DotField';
export type { DotFieldHandle, DotFieldProps } from './components/DotField';
export { createDotField } from './engine/dotField';

// sections (each works on its own; the engine animates whichever are on the page)
export { Hero } from './sections/Hero';
export { ProductStory } from './sections/ProductStory';
export { WorkflowMap } from './sections/WorkflowMap';
export { Newsroom } from './sections/Newsroom';
export { ClosingCTA } from './sections/ClosingCTA';
export { SiteHeader } from './sections/SiteHeader';
export { SiteFooter } from './sections/SiteFooter';

// standalone animations (no page wiring; drop anywhere)
export { HeroGlobe } from './components/HeroGlobe';
export { ProductOrb, ElevateRMOrb, VTrackOrb, NicoOrb } from './components/ProductOrb';

// art
export { GlobeMark } from './components/GlobeMark';
export { DotGlobeArt } from './components/DotGlobeArt';

export * as content from './content';
