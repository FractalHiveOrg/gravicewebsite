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
export { ProductOrb, ElevateRMOrb, VTrackOrb, NicoOrb, BELT_OPTS } from './components/ProductOrb';
export type { GraviceProduct, ProductOrbProps } from './components/ProductOrb';

// product pages
export { ShiftAnimation } from './components/product/ShiftAnimation';
export type { ShiftAnimationProps } from './components/product/ShiftAnimation';
export { ProductHeroVisual } from './components/product/ProductHeroVisual';
export { useScrollStep } from './hooks/useScrollStep';

// industry pages
export { OrbStage } from './components/industry/OrbStage';
export { ProductMark, ProductTag, PRODUCT_META } from './components/industry/ProductMark';
export { WorkflowDemo, MANUFACTURING_WORKFLOWS } from './components/industry/WorkflowDemo';
export type { Workflow, WorkflowStep } from './components/industry/WorkflowDemo';

// company pages
export { LatticeAnimation } from './components/company/LatticeAnimation';
export { drawLattice, makeLatticePoints } from './engine/lattice';

// art
export { GlobeMark } from './components/GlobeMark';
export { DotGlobeArt } from './components/DotGlobeArt';

export * as content from './content';
