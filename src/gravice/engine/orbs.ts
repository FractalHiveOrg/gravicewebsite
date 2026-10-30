/**
 * Story orb dispatcher: Gravice's own painters for the three product states, the
 * thinking-orbs engine (MIT © Jakub Antalik) for anything else.
 *   composing → ElevateRM belt (./beltOrb)
 *   searching → V-Track scan   (./scanOrb)
 *   solving   → NICO solve     (./solvingOrb)
 */
import { MODE_DRAWS, resolvePreset } from 'thinking-orbs/engine';
import type { OrbState } from 'thinking-orbs/engine';
import { drawBelt } from './beltOrb';
import { drawScan } from './scanOrb';
import { drawSolving, SOLVE_CYCLE } from './solvingOrb';

/**
 * Paint one orb into a 64×64 user-space box on ctx (set the transform first).
 * `clock` is seconds; `rate` slows the belt and library orbs (scan and solve run on their own timing).
 */
export function drawOrb(ctx: CanvasRenderingContext2D, state: OrbState, clock: number, rate: number, reduce: boolean) {
  if (state === 'solving') return drawSolving(ctx, reduce ? SOLVE_CYCLE - 1 : clock);
  if (state === 'searching') return drawScan(ctx, reduce ? 1.2 : clock);
  const pr = resolvePreset(state, 64);
  if (state === 'composing') return drawBelt(ctx, (reduce ? 2 : clock) * rate, pr.opts);
  MODE_DRAWS[pr.mode](ctx, 64, (reduce ? 2 : clock) * rate, false, pr.opts);
}
