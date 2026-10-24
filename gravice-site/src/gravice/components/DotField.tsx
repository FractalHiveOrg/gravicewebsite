import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { createDotField, type DotFieldController, type DotFieldOptions } from '../engine/dotField';

export interface DotFieldHandle {
  /** Scroll to the top and play the hero intro again. */
  replay(): void;
  /** Jump to the end of the hero intro. */
  skip(): void;
}

export type DotFieldProps = Omit<DotFieldOptions, 'field' | 'cursor'> & {
  /**
   * z-index of the dot canvas. Default 1. Gravice sections paint their background
   * at z-index 0 and their content at z-index 2, so the dots travel between the two.
   */
  zIndex?: number;
};

/**
 * Mount once per page (anywhere, e.g. at the end of your layout).
 * It renders two fixed full-screen canvases and drives every Gravice animation:
 * hero intro, story orbs and transitions, and the closing globe.
 */
export const DotField = forwardRef<DotFieldHandle, DotFieldProps>(function DotField(
  { zIndex = 1, dotColor, coreColor, orbColor, orbSpeed, intro, followCursor },
  ref,
) {
  const fieldRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLCanvasElement>(null);
  const ctl = useRef<DotFieldController | null>(null);

  useEffect(() => {
    if (!fieldRef.current || !cursorRef.current) return;
    ctl.current = createDotField({
      field: fieldRef.current,
      cursor: cursorRef.current,
      dotColor, coreColor, orbColor, orbSpeed, intro, followCursor,
    });
    return () => { ctl.current?.destroy(); ctl.current = null; };
  }, [dotColor, coreColor, orbColor, orbSpeed, intro, followCursor]);

  useImperativeHandle(ref, () => ({
    replay: () => ctl.current?.replay(),
    skip: () => ctl.current?.skip(),
  }), []);

  const base: React.CSSProperties = { position: 'fixed', inset: 0, pointerEvents: 'none' };
  return (
    <>
      <canvas ref={fieldRef} aria-hidden="true" style={{ ...base, zIndex }} />
      <canvas ref={cursorRef} aria-hidden="true" style={{ ...base, zIndex: 60 }} />
    </>
  );
});
