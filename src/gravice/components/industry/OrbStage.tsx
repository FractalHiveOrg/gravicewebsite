import { ProductOrb, type GraviceProduct } from '../ProductOrb';

/**
 * Industry page, "Across the credit journey" / "From order to ledger": the sticky centre column.
 * Stacks one orb per product and crossfades to the active one. Pair it with useScrollStep:
 *
 *   const { active, register } = useScrollStep(stages.length);
 *   <OrbStage products={['elevaterm','nico','vtrack']} active={stages[active].orb} />
 */
export function OrbStage({ products, active, className }: { products: GraviceProduct[]; active: GraviceProduct; className?: string }) {
  return (
    <div className={['gv-orbstage', className].filter(Boolean).join(' ')} aria-hidden="true">
      {products.map((p) => (
        <div key={p} className={'gv-orbstage-item' + (p === active ? ' gv-on' : '')}>
          <ProductOrb product={p} tone="light" paused={p !== active} />
        </div>
      ))}
    </div>
  );
}
