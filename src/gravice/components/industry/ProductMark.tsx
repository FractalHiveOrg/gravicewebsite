import type { GraviceProduct } from '../ProductOrb';

/**
 * Product mark: the coloured square with the product initial.
 * Stand-in for the final product logos (ElevateRM and V-Track logos are in design).
 * Swap the inside of this component for the logo SVGs when they are signed off; every page updates.
 */
export const PRODUCT_META: Record<GraviceProduct, { name: string; letter: string; color: string; href: string }> = {
  elevaterm: { name: 'ElevateRM', letter: 'E', color: '#5B3E9E', href: '/products/elevaterm' },
  vtrack: { name: 'V-track', letter: 'V', color: '#24467A', href: '/products/v-track' },
  nico: { name: 'NICO', letter: 'N', color: '#B4501F', href: '/products/nico' },
};

export function ProductMark({ product, size = 48, className }: { product: GraviceProduct; size?: number; className?: string }) {
  const m = PRODUCT_META[product];
  return (
    <span className={['gv-pmark', className].filter(Boolean).join(' ')} role="img" aria-label={m.name}
      style={{ width: size, height: size, borderRadius: size * 0.24, background: m.color, fontSize: size * 0.44 }}>
      {m.letter}
    </span>
  );
}

/** Pill linking to a product, e.g. "ElevateRM fixes this →" or a plain product tag in the journey. */
export function ProductTag({ product, label, href = PRODUCT_META[product].href }: { product: GraviceProduct; label?: string; href?: string }) {
  const m = PRODUCT_META[product];
  return (
    <a className="gv-ptag" href={href} data-clarity-event="product_link_click" data-clarity-source={`industry_${product}`}>
      <i style={{ background: m.color }}>{m.letter}</i>
      {label ?? m.name}
    </a>
  );
}
