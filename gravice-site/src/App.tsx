import { DotField, Hero, ProductStory, WorkflowMap, Newsroom, ClosingCTA, SiteHeader, SiteFooter } from './gravice';

export default function App() {
  return (
    <div id="top" style={{ background: 'var(--gv-navy)' }}>
      <SiteHeader />
      <main>
        <Hero />
        <ProductStory />
        <WorkflowMap />
        <Newsroom />
        <ClosingCTA />
      </main>
      <SiteFooter />
      {/* one per page: drives the hero intro, the story orbs and the closing globe */}
      <DotField />
    </div>
  );
}
