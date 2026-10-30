import { Button } from "@/components/Button";
import { ClarityTags } from "@/components/ClarityTags";
import { CompanyClosing, CompanyHero } from "@/components/company/CompanySections";
import { ContactForm } from "@/components/company/ContactForm";

/**
 * Contact page: hero globe → ways to reach us → message form + office → closing.
 * The form has no backend yet; it opens the visitor's mail app with the message filled in.
 */
const EMAIL = "contact@gravicesolutions.com";
const LINKEDIN_URL = "https://www.linkedin.com/company/fractalhive/";

const CHANNELS = [
  {
    title: "Sales and demos",
    body: "See how ElevateRM, V-Track or NICO works. Pick a 30-minute slot and we bring the right people.",
    link: { label: "Book a demo →", href: "/demo" },
  },
  {
    title: "General enquiries",
    body: "Partnerships, press, security questions or anything else.",
    link: { label: `${EMAIL} →`, href: `mailto:${EMAIL}` },
  },
  {
    title: "Careers",
    body: "Want to build with us? See how we hire and roles we are hiring for.",
    link: { label: "Visit careers →", href: "/company/careers" },
  },
];

export function ContactPage() {
  return (
    <div>
      <ClarityTags tags={{ company: "contact" }} />

      <CompanyHero
        page="Contact"
        title="Talk to the team behind Gravice."
        lede="Prefer a structured conversation? Book a 30-minute demo and we will route you to the right team. Or send a note and we will get back to you."
        actions={
          <>
            <Button href="/demo" clarityEvent="demo_click" claritySource="contact_hero">
              Book a demo
            </Button>
            <Button href="#message" variant="secondary-dark">
              Send a message
            </Button>
          </>
        }
      />

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-cream">
        <div className="gv-wrap">
          <div className="gv-i-top">
            <div className="gv-eyebrow">Ways to reach us</div>
            <h2>Pick the route that fits.</h2>
          </div>
          <div className="gv-c-cards3">
            {CHANNELS.map((c, i) => (
              <div key={c.title} className="gv-c-vcard">
                <span className="gv-c-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <a className="gv-textlink gv-c-card-link" href={c.link.href}>
                  {c.link.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="message" data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-white">
        <div className="gv-wrap gv-c-two">
          <div className="gv-c-stack">
            <div className="gv-eyebrow">Send a message</div>
            <h2 className="gv-c-big-h">Tell us what you are working on.</h2>
            <p className="gv-c-lead">
              A few lines on your team and the problem is enough. We will route it to the person who can help.
            </p>
            <ContactForm email={EMAIL} />
          </div>

          <aside className="gv-c-office">
            <div className="gv-eyebrow">Office</div>
            <address>
              <b>Gravice Solutions Private Limited</b>
              2nd Floor, Incubinet Coworking Space
              <br />
              Marg Aditya Complex, Kothnur Main Road
              <br />
              JP Nagar 8th Phase
              <br />
              Bengaluru, Karnataka 560078, India
            </address>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>
                  <a className="gv-textlink" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a className="gv-textlink" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                    Follow Gravice ↗
                  </a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>Monday to Friday, 9:30 to 18:30 IST</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <CompanyClosing
        title="See how Gravice can enhance your business process"
        lede="A 30-minute demo, tailored to the product that fits your needs."
        actions={
          <>
            <Button href="/demo" clarityEvent="demo_click" claritySource="contact_closing">
              Book a demo
            </Button>
            <Button href="/#products" variant="secondary-dark">
              Explore products
            </Button>
          </>
        }
      />
    </div>
  );
}
