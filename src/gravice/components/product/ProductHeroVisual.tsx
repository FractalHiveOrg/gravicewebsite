import type { ReactNode } from 'react';
import { ProductOrb, type GraviceProduct } from '../ProductOrb';

/**
 * Product page hero visual: the product orb, with a screenshot (IMG-01) floating over its lower right.
 * Pass the screenshot as children, e.g. <img src={pipelineView} alt="ElevateRM pipeline view" />.
 */
export function ProductHeroVisual({ product, children, className }: { product: GraviceProduct; children?: ReactNode; className?: string }) {
  return (
    <div className={['gv-phero', className].filter(Boolean).join(' ')}>
      <ProductOrb product={product} tone="dark" />
      {children && <div className="gv-phero-shot">{children}</div>}
    </div>
  );
}
