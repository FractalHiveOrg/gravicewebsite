import { Button } from "@/components/Button";
import { ClarityTags } from "@/components/ClarityTags";
import { CompanyClosing, CompanyHero } from "@/components/company/CompanySections";
import { ProductImage } from "@/components/product/ProductImage";
import type { ImageSlot } from "@/lib/productImages";

/**
 * Careers page (prototypes/careers.html): hero globe → why Gravice → benefits → how we hire →
 * open roles → life at Gravice teaser → closing.
 * Benefits, hiring steps and role copy are drafts until HR confirms them; the jobs link is a placeholder.
 */
const JOBS_URL = "https://www.linkedin.com/company/fractalhive/jobs/";
const LINKEDIN_URL = "https://www.linkedin.com/company/fractalhive/";
const CAREERS_EMAIL = "contact@gravicesolutions.com";

const applyHref = (role: string) =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${role}`)}&body=${encodeURIComponent(
    "Hi Gravice team,\n\nI'd like to apply for this role. My CV is attached.\n\n",
  )}`;
// const LIFE_HREF = "/company/life-at-gravice";

const WHY = [
  {
    title: "High-stakes problems",
    body: "Loans, collateral and money. What you build has to be right, and it makes a difference when it is.",
  },
  {
    title: "Real ownership",
    body: "You own problems from the first conversation to the release, not one ticket at a time.",
  },
  {
    title: "Learn every week",
    body: "Banking from veterans, technology from builders, and time set aside to learn both.",
  },
  {
    title: "Honest by nature",
    body: "We say what we think, admit what we don't know, and keep our word to customers and to each other.",
  },
];

const BENEFITS = [
  {
    icon: "⌂",
    title: "Flexible, hybrid work",
    body: "Plan your week around the work. Core hours for collaboration, the rest is yours.",
  },
  {
    icon: "⚙",
    title: "Top-of-the-line equipment",
    body: "The best equipment and tools for your role, so nothing slows you down.",
  },
  {
    icon: "☀",
    title: "Time off you actually take",
    body: "Paid leave, sick leave and festival holidays, and a team that respects them.",
  },
  {
    icon: "★",
    title: "Learn the domain",
    body: "Work alongside banking veterans and learn lending from the people who ran it.",
  },
  {
    icon: "◎",
    title: "Real ownership",
    body: "A small team, so your work ships to banks and businesses, not to a backlog.",
  },
  { icon: "✦", title: "Offsites and celebrations", body: "Team offsites, demo days and festivals, together." },
];

const HIRING = [
  { title: "Apply", body: "Email your CV for the role you want. We read every one." },
  { title: "Intro call", body: "A 30-minute conversation about you, the role and what we're building." },
  { title: "Skills conversation", body: "A practical exercise close to the real work, discussed with the team." },
  { title: "Meet the team", body: "Meet the people you'll work with, then we make a decision quickly." },
];

const ROLES = [
  {
    title: "Full Stack Developer",
    team: "Engineering",
    experience: "2+ years",
    type: "Full-time",
    body: "Build product features end to end, from APIs and data models to the screens bankers and finance teams use every day.",
  },
  {
    title: "Sales Executive",
    team: "Sales",
    experience: "2+ years",
    type: "Full-time",
    body: "Open conversations with banks, NBFCs and growing businesses, run demos and take deals from first call to signed contract.",
  },
];

const LIFE_PHOTOS: ImageSlot[] = [
  {
    id: "LIFE-01",
    label: "Team offsite",
    size: "1600 × 1200",
    src: "https://fractalhiveassets.blob.core.windows.net/assets/grp2.jpeg?sp=r&st=2026-10-29T12:40:21Z&se=2036-10-29T20:55:21Z&spr=https&sv=2026-02-06&sr=b&sig=hDMnLB4pO8maOqGp7%2FR1rXqqgNy7AFbUtc6azADYjho%3D",
  },
  {
    id: "LIFE-02",
    label: "Festival at the office",
    size: "1200 × 1600",
    src: "https://fractalhiveassets.blob.core.windows.net/assets/grp1.jpeg?sp=r&st=2026-10-29T12:40:05Z&se=2036-10-29T20:55:05Z&spr=https&sv=2026-02-06&sr=b&sig=%2FqnoZKyS4BVbVLEkY5muooEzigRcP4VTIptVRLyadHU%3D",
  },
];

function OpenRolesButton({ source }: { source: string }) {
  return (
    <Button
      href={JOBS_URL}
      target="_blank"
      rel="noopener noreferrer"
      clarityEvent="careers_roles_click"
      claritySource={source}
    >
      View open roles ↗
    </Button>
  );
}

export function CareersPage() {
  return (
    <div>
      <ClarityTags tags={{ company: "careers" }} />

      <CompanyHero
        page="Careers"
        title="Build the tools banks and businesses rely on."
        lede="Join a growing team building control, visibility and automation for financial institutions and growing businesses. The work is high-stakes, and rewarding."
        actions={
          <>
            <OpenRolesButton source="careers_hero" />
            {/* <Button href={LIFE_HREF} variant="secondary-dark">
              Life at Gravice
            </Button> */}
          </>
        }
      />

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-cream">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Why Gravice</div>
            <h2>Work that matters to the people who use it.</h2>
          </div>
          <div className="gv-c-cards4">
            {WHY.map((w, i) => (
              <div key={w.title} className="gv-c-vcard">
                <span className="gv-c-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-white">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Benefits</div>
            <h2>We look after our people.</h2>
          </div>
          <div className="gv-c-cards3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="gv-c-vcard">
                <span className="gv-c-ico" aria-hidden="true">
                  {b.icon}
                </span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-cream">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">How we hire</div>
            <h2>Four steps, no surprises.</h2>
          </div>
          <ol className="gv-c-steps">
            {HIRING.map((h, i) => (
              <li key={h.title}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="roles" data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-white">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Open roles</div>
            <h2>Come build with us.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {ROLES.map((r) => (
              <article key={r.title} className="gv-c-vcard">
                <span className="gv-c-n">{r.team}</span>
                <h3>{r.title}</h3>
                <ul className="flex flex-wrap gap-2 text-[13px] text-(--gv-muted-ink)">
                  {[r.experience, r.type].map((tag) => (
                    <li key={tag} className="rounded-full border border-(--gv-line) px-3 py-1">
                      {tag}
                    </li>
                  ))}
                </ul>
                <p>{r.body}</p>
                <div className="mt-auto pt-3">
                  <Button
                    href={applyHref(r.title)}
                    size="sm"
                    clarityEvent="careers_role_apply"
                    claritySource={r.title}
                  >
                    Apply by email →
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className="gv-row mt-8">
            <OpenRolesButton source="careers_roles" />
            <Button href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" variant="secondary-light">
              Follow on LinkedIn ↗
            </Button>
          </div>
        </div>
      </section>

      <section data-cursor-surface="dark" className="gv-band gv-c-sec gv-c-dark">
        <div className="gv-wrap gv-c-two gv-c-mid">
          <div className="gv-c-stack">
            <div className="gv-eyebrow">Life at Gravice</div>
            <h2 className="gv-c-big-h">Work · Play · Learn.</h2>
            <p className="gv-c-lead">
              Serious work, with room to be curious. See how the team works, learns and celebrates.
            </p>
            {/* <a className="gv-textlink" href={LIFE_HREF}>
              See life at Gravice →
            </a> */}
          </div>
          <div className="gv-c-collage">
            {LIFE_PHOTOS.map((slot) => (
              <ProductImage key={slot.id} slot={slot} className="gv-ph-dark" />
            ))}
          </div>
        </div>
      </section>

      <CompanyClosing
        title="Don't see your role? Stay in touch."
        lede="Follow Gravice on LinkedIn and you'll hear first when we're hiring."
        actions={
          <>
            <Button href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              Follow on LinkedIn ↗
            </Button>
            <Button href="/company/about" variant="secondary-dark">
              About Gravice
            </Button>
          </>
        }
      />
    </div>
  );
}
