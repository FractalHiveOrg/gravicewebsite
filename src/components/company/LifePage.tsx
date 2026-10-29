import { Button } from "@/components/Button";
import { ClarityTags } from "@/components/ClarityTags";
import { CompanyClosing, CompanyHero } from "@/components/company/CompanySections";
import { ProductImage } from "@/components/product/ProductImage";
import type { ImageSlot } from "@/lib/productImages";

/**
 * Life at Gravice page (prototypes/life-at-gravice.html): hero photo collage → work · play · learn →
 * rituals → team gallery → diversity, equality and inclusion → closing.
 * Photos are LIFE-xx placeholders until the real ones are supplied; rituals are examples until confirmed.
 */
const CAREERS_HREF = "/company/careers";

const HERO_PHOTOS: ImageSlot[] = [
  { id: "LIFE-01", label: "Team at work", size: "1600 × 1200" },
  { id: "LIFE-02", label: "Offsite", size: "1200 × 1600" },
  { id: "LIFE-03", label: "Celebration", size: "1600 × 1000" },
];

const WPL: { title: string; body: string; photo: ImageSlot }[] = [
  {
    title: "Work",
    body: "Small teams, clear ownership and real customers. We ship to banks and businesses, so the work has to be right.",
    photo: { id: "LIFE-04", label: "Work", size: "1600 × 1200", note: "a working session" },
  },
  {
    title: "Play",
    body: "Offsites, festivals and the occasional cricket match. A team that knows each other works better together.",
    photo: { id: "LIFE-05", label: "Play", size: "1600 × 1200", note: "offsite or festival" },
  },
  {
    title: "Learn",
    body: "Banking from veterans, technology from builders, and time set aside every week to learn something new.",
    photo: { id: "LIFE-06", label: "Learn", size: "1600 × 1200", note: "a learning session" },
  },
];

const RITUALS = [
  { when: "Weekly", title: "Demo day", body: "Every team shows what it shipped. Small wins count." },
  {
    when: "Weekly",
    title: "Learning hour",
    body: "One hour to learn: a new tool, a banking process, a talk from a teammate.",
  },
  { when: "Yearly", title: "Team offsite", body: "A few days away to plan the year, and to have some fun doing it." },
];

const GALLERY: ImageSlot[] = [
  { id: "LIFE-07", label: "Office", size: "1200 × 1600" },
  { id: "LIFE-08", label: "Hackathon", size: "1600 × 1200" },
  { id: "LIFE-09", label: "Festival", size: "1600 × 1200" },
  { id: "LIFE-10", label: "Team lunch", size: "1600 × 1200" },
  { id: "LIFE-11", label: "Customer visit", size: "1600 × 1200" },
];

export function LifePage() {
  return (
    <div>
      <ClarityTags tags={{ company: "life" }} />

      <CompanyHero
        page="Life at Gravice"
        title="Serious work, with room to be curious."
        lede="We work on high-stakes problems for banks and businesses. We also make time to learn, to celebrate, and to get to know each other."
        actions={
          <>
            <Button href={CAREERS_HREF}>See careers</Button>
            <Button href="#gallery" variant="secondary-dark">
              See the team
            </Button>
          </>
        }
        visual={
          <div className="gv-c-collage gv-c-collage-lg" aria-hidden="true">
            {HERO_PHOTOS.map((slot) => (
              <ProductImage key={slot.id} slot={slot} className="gv-ph-dark" />
            ))}
          </div>
        }
      />

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-cream">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Work · Play · Learn</div>
            <h2>Three things we make time for.</h2>
          </div>
          <div className="gv-c-wpl">
            {WPL.map((w) => (
              <article key={w.title}>
                <ProductImage slot={w.photo} className="gv-c-photo" />
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-white">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">How we work</div>
            <h2>A few things we do together.</h2>
          </div>
          <div className="gv-c-cards3">
            {RITUALS.map((r) => (
              <div key={r.title} className="gv-c-vcard">
                <span className="gv-c-n">{r.when}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-cream">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">The team</div>
            <h2>Around the office.</h2>
          </div>
          <div className="gv-c-gallery">
            {GALLERY.map((slot) => (
              <ProductImage key={slot.id} slot={slot} className="gv-c-photo" />
            ))}
          </div>
        </div>
      </section>

      <section data-cursor-surface="dark" className="gv-band gv-c-sec gv-c-dark">
        <div className="gv-wrap gv-c-two gv-c-mid">
          <div className="gv-c-stack">
            <div className="gv-eyebrow">Diversity · Equality · Inclusion</div>
            <h2 className="gv-c-big-h">Better products come from different perspectives.</h2>
          </div>
          <div className="gv-c-stack">
            <p className="gv-c-lead">
              We build for banks, NBFCs and businesses of every size, and our team should reflect that range. We hire
              for skill and character, pay fairly for the role, and make sure every voice is heard in the room.
            </p>
            <p className="gv-c-lead">
              Innovation through collaboration is one of our values. It only works when everyone belongs.
            </p>
          </div>
        </div>
      </section>

      <CompanyClosing
        title="Want to work with us?"
        lede="See how we hire, what we offer, and when roles open."
        actions={
          <>
            <Button href={CAREERS_HREF}>See careers</Button>
            <Button href="/company/about" variant="secondary-dark">
              About Gravice
            </Button>
          </>
        }
      />
    </div>
  );
}
