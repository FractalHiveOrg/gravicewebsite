# Gravice homepage: React export

The full homepage prototype rebuilt as a React + TypeScript app (Vite). Everything you need to move into another site lives in **`src/gravice/`**.

```bash
npm install
npm run dev      # http://localhost:5173
```

## What's in `src/gravice/`

| Path | What it is |
|---|---|
| `engine/dotField.ts` | **The animation engine.** One set of 312 dots that travels through the page. It runs the hero intro, the story orbs and their transitions, and the closing globe. Plain TypeScript, no React. |
| `components/DotField.tsx` | React wrapper for the engine. **Mount it once per page.** |
| `sections/Hero.tsx` | Hero: the globe intro, then the headline fades in. |
| `sections/ProductStory.tsx` | "What Gravice can do for you": sticky heading, sticky orb stage, then one scrolling step per product. |
| `sections/WorkflowMap.tsx` | "Three products, one platform": four stages above the platform bar. |
| `sections/Newsroom.tsx` | News rail. The closing dots rise out of its bottom edge. |
| `sections/ClosingCTA.tsx` | "See what Gravice can do for you", where the dots form the closing globe. |
| `sections/SiteHeader.tsx`, `SiteFooter.tsx` | Optional header (product family bar and nav) and footer. |
| `components/HeroGlobe.tsx` | Standalone hero globe that doesn't need the page engine. Use it on any page. |
| `components/ProductOrb.tsx` | Standalone orbs: `<ElevateRMOrb/>`, `<VTrackOrb/>`, `<NicoOrb/>`. |
| `components/GlobeMark.tsx`, `DotGlobeArt.tsx` | Logo mark and static globe art, as SVG. |
| `content.ts` | **All copy and links**, so you can edit text without touching layout. |
| `gravice.css` | All styles. Every class starts with `gv-` and every variable with `--gv-`, so it won't clash with your CSS. |

## Moving sections into your existing site

1. **Copy** the `src/gravice/` folder into your project, for example as `src/gravice/`.
2. **Install** the one runtime dependency (needs React 18 or newer):
   ```bash
   npm install thinking-orbs@0.3.2
   ```
3. **Fonts.** Add these to your `index.html` `<head>`, or use your own and change `--gv-serif` / `--gv-sans` in `gravice.css`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&display=swap" rel="stylesheet" />
   ```
4. **Use the sections you want**, plus `<DotField />` once on the page. Importing from `./gravice` also loads `gravice.css`.
   ```tsx
   import { DotField, Hero, ProductStory, ClosingCTA } from './gravice';

   export default function Home() {
     return (
       <>
         <YourHeader />
         <Hero />
         <ProductStory />
         <YourOtherSections />
         <ClosingCTA />
         <DotField />
       </>
     );
   }
   ```

Any combination works. The engine finds sections by their `data-gv` attributes on every frame, so it animates whichever ones are on the page:

- **`ProductStory` without `Hero`:** the dots start at the first orb.
- **`ClosingCTA` without `Newsroom`:** the dots rise from the top edge of the closing section instead.
- **`ProductStory` only:** add just that section and `<DotField />`.

### Three things to check after you paste it in

1. **Layering.** The dot canvas is fixed full-screen at `z-index: 1`. Gravice sections paint their background at z-index 0 and their content at z-index 2, so the dots travel between the two. Your own sections only matter where dots pass over them:
   - **Usual case:** if your sections already have a background, give them `position: relative; z-index: 2` and the dots stay hidden behind them.
   - **Your site uses higher z-indexes:** pass `<DotField zIndex={…} />` and keep it below your content.
2. **Sticky header height.** The story's sticky columns sit under your header. Set the variable to your header's real height:
   ```css
   :root { --gv-header-h: 72px; }
   ```
   The default is 106px, which matches the included header (34px family bar plus 72px nav).
3. **Smooth scrolling libraries** (Lenis, Locomotive) are fine, as long as they move the real window scroll position. The engine reads `window.scrollY`.

### Controlling the animation

```tsx
const field = useRef<DotFieldHandle>(null);
<DotField
  ref={field}
  dotColor="#4A6FA5"     // dots
  coreColor="#F26B2F"    // the orange core
  orbColor="#3E5F93"     // orb tint
  orbSpeed={0.6}         // calm orb speed (library defaults are tuned for 64px icons)
  intro={true}           // play the hero intro
  followCursor={true}    // core follows the mouse over the hero after the intro
  zIndex={1}
/>
field.current?.replay(); // scroll to top and play the intro again
field.current?.skip();   // jump to the end of the intro
```

**Changing a step's orb.** Each story step picks its orb in `content.ts`:

| Product | Orb | What it shows |
|---|---|---|
| ElevateRM | `connecting` | A network of relationships |
| V-track | `searching` | A scan line sweeping a dotted globe |
| NICO | `solving` | Scrambled work clicking into order |

Other options are `working`, `listening`, `weaving`, `composing`, `breathing` and `shaping`. Adding or removing a step works too, because the engine handles any number.

## How the animation works, for reference

1. **Intro, about 4 seconds:**
   - Dots drift.
   - The core appears and pulls them in.
   - The dots burst outward and lock into the rotating globe. Elements marked `data-gv-reveal` fade in.
2. **Hero to story:** as you scroll, the globe breaks apart, re-forms in the sticky centre column, and dissolves into the first orb.
3. **Between steps:** the orb dissolves into dots, they scatter and re-form, and the next orb appears. The active step and tick get the class `gv-on`.
4. **End of story:** the dots scatter outward and fade.
5. **Closing:** dots rise from the newsroom's bottom edge and gather into the closing globe, and the core grows as they arrive.
6. **Everything is tied to scroll position, so it reverses when you scroll up.**

The engine also handles:

- **Reduced motion:** visitors with reduced motion turned on see still frames.
- **Hidden tab:** it pauses.
- **Retina screens:** the pixel ratio is capped at 2 for performance.

## Data attributes the engine looks for

If you rebuild a section in your own markup, keep these attributes and the animation still works:

| Attribute | Where it goes |
|---|---|
| `data-gv="hero"` | Hero section. The cursor follow only works inside it. |
| `data-gv="hero-globe"` | Empty box where the hero globe sits. |
| `data-gv="story"` | The scroll story section. |
| `data-gv="stage"` | The sticky centre column. |
| `data-gv="orb-canvas"` | The `<canvas>` inside the stage. |
| `data-gv="step"` plus `data-gv-orb="…"` | One per step. |
| `data-gv="tick"` | Optional progress labels, one per step. |
| `data-gv="news"` | The section the closing dots rise out of. |
| `data-gv="cta"` and `data-gv="cta-globe"` | The closing section, and the empty box where its globe forms. |
| `data-gv-reveal` | Elements that fade in after the intro. |

## Credits and licences

The orbs use **thinking-orbs** by Jakub Antalik (MIT licence, https://libraries.dev/orbs). Installing it from npm includes its licence file.
