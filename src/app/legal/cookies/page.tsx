import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description:
    "How Gravice Solutions Private Limited uses cookies and similar technologies on our websites and product surfaces.",
};

type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

const sections: { title: string; blocks: PolicyBlock[] }[] = [
  {
    title: "1. What Are Cookies?",
    blocks: [
      {
        type: "p",
        text: "Cookies are small text files stored on your device when you visit a website. They help the site remember your device, keep sessions secure, understand how pages are used, and — where applicable — remember preferences.",
      },
      {
        type: "p",
        text: "This Cookie Notice also covers similar technologies that perform related functions, such as local storage, session storage, pixels, and tags (together, “cookies” in this notice).",
      },
    ],
  },
  {
    title: "2. How We Use Cookies",
    blocks: [
      {
        type: "p",
        text: "We use cookies to operate and secure our websites and Services, measure performance, and improve the experience for visitors evaluating ElevateRM, V-Track, NICO, and related Gravice offerings.",
      },
      {
        type: "p",
        text: "Depending on the page and product surface you use, cookies may help us:",
      },
      {
        type: "ul",
        items: [
          "Keep the site working securely and reliably.",
          "Remember basic preferences during a visit.",
          "Understand which pages are useful and where visitors drop off.",
          "Diagnose errors and improve load performance.",
          "Support demo requests, forms, and related communications where those features are available.",
        ],
      },
    ],
  },
  {
    title: "3. Types of Cookies We Use",
    blocks: [
      {
        type: "p",
        text: "We group cookies into the categories below. The exact cookies present can vary over time as we update our sites and vendors.",
      },
      { type: "h3", text: "Strictly necessary cookies" },
      {
        type: "p",
        text: "These cookies are required for core site functions — for example page navigation, security controls, load balancing, and remembering cookie or consent choices. The website cannot operate properly without them, and they generally cannot be switched off in our systems.",
      },
      { type: "h3", text: "Functional / preference cookies" },
      {
        type: "p",
        text: "These cookies remember choices you make (such as language or UI preferences) so the experience is more consistent across visits. If you block them, some features may not behave as expected.",
      },
      { type: "h3", text: "Analytics cookies" },
      {
        type: "p",
        text: "These cookies help us count visits, understand traffic sources, and see how visitors move through the site so we can improve content and performance. Information collected through analytics is typically aggregated. If you block these cookies, we will have less insight into how the site is used.",
      },
      { type: "h3", text: "Marketing cookies" },
      {
        type: "p",
        text: "Where used, these cookies may help us measure the effectiveness of campaigns or attribute visits that come from advertising or partner links. They are not required to browse the site. If you block them, you may still see Gravice content, but it may be less relevant to how you found us.",
      },
    ],
  },
  {
    title: "4. First-Party and Third-Party Cookies",
    blocks: [
      {
        type: "p",
        text: "First-party cookies are set by Gravice domains. Third-party cookies may be set by service providers we use to host, secure, analyse, or operate parts of our websites and Services (for example analytics, hosting, or form infrastructure providers).",
      },
      {
        type: "p",
        text: "We do not sell personal information. Where third parties process information on our behalf, they are expected to do so under appropriate confidentiality and security obligations, as described in our Privacy Policy.",
      },
    ],
  },
  {
    title: "5. Cookie Duration",
    blocks: [
      {
        type: "p",
        text: "Session cookies expire when you close your browser. Persistent cookies remain on your device for a set period (or until you delete them) so the site can recognise returning visits or remember settings.",
      },
      {
        type: "p",
        text: "Retention periods vary by cookie and purpose. We aim to keep cookie lifetimes no longer than needed for the function they support.",
      },
    ],
  },
  {
    title: "6. How to Manage Cookies",
    blocks: [
      {
        type: "p",
        text: "You can control cookies through your browser settings. Most browsers let you block or delete cookies, or alert you when a site tries to set one. Blocking strictly necessary cookies may prevent the site from working correctly.",
      },
      {
        type: "p",
        text: "Browser guidance (external links):",
      },
      {
        type: "ul",
        items: [
          "Chrome — support.google.com/chrome/answer/95647",
          "Firefox — support.mozilla.org/kb/cookies-information-websites-store-on-your-computer",
          "Safari — support.apple.com/guide/safari/manage-cookies-sfri11471",
          "Edge — support.microsoft.com (search “delete cookies”)",
        ],
      },
      {
        type: "p",
        text: "Where a cookie preference or consent control is available on our site, you can also use that control to adjust non-essential categories. Your choices may need to be set again if you clear cookies or use another browser or device.",
      },
    ],
  },
  {
    title: "7. Do Not Track",
    blocks: [
      {
        type: "p",
        text: "Some browsers include a Do Not Track (DNT) setting. Because there is no widely adopted standard for how websites should respond to DNT signals, we do not currently respond to DNT browser signals. If a standard becomes required or widely adopted, we will update this notice.",
      },
    ],
  },
  {
    title: "8. Updates to This Notice",
    blocks: [
      {
        type: "p",
        text: "We may update this Cookie Notice from time to time to reflect changes in our practices, technologies, or legal requirements. The “Last updated” date at the top of this page will change when we do. Material updates may also be highlighted on the site or communicated by other reasonable means.",
      },
    ],
  },
];

function PolicySection({
  title,
  blocks,
}: {
  title: string;
  blocks: PolicyBlock[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-xl font-normal text-deep-space md:text-2xl">
        {title}
      </h2>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p
              key={`${title}-p-${index}`}
              className="leading-relaxed text-slate"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={`${title}-h3-${index}`}
              className="pt-2 text-base font-semibold text-deep-space md:text-lg"
            >
              {block.text}
            </h3>
          );
        }

        return (
          <ul
            key={`${title}-ul-${index}`}
            className="list-disc space-y-1.5 pl-5 text-slate"
          >
            {block.items.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
      })}
    </section>
  );
}

export default function CookieNoticePage() {
  return (
    <div className="bg-paper">
      <article className="page-x mx-auto max-w-3xl space-y-10 py-12 md:py-16">
        <Reveal>
          <header className="space-y-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              Legal
            </p>
            <h1 className="font-serif text-[clamp(2.25rem,4vw,3.25rem)] font-normal tracking-tight text-deep-space">
              Cookie Notice
            </h1>
            <p className="text-sm font-medium text-slate">
              Last updated October 24, 2026
            </p>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <div className="space-y-4 leading-relaxed text-slate">
            <p>
              This Cookie Notice explains how Gravice Solutions Private Limited
              (&quot;Gravice,&quot; &quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;) uses cookies and similar technologies when you
              visit our websites or use related online surfaces for ElevateRM,
              V-Track, NICO, and other Gravice products and services
              (collectively, the &quot;Services&quot;).
            </p>
            <p>
              It supplements our{" "}
              <Link
                href="/legal/privacy"
                className="font-medium text-pull-orange-deep underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              , which describes how we collect, use, and protect personal
              information more broadly. By continuing to use our websites, you
              acknowledge this Cookie Notice.
            </p>
          </div>
        </Reveal>

        <div className="space-y-10">
          {sections.map((section) => (
            <Reveal key={section.title}>
              <PolicySection title={section.title} blocks={section.blocks} />
            </Reveal>
          ))}

          <Reveal>
            <section className="space-y-4">
              <h2 className="font-serif text-xl font-normal text-deep-space md:text-2xl">
                9. Contact Us
              </h2>
              <p className="leading-relaxed text-slate">
                If you have questions about this Cookie Notice or our use of
                cookies, please contact us:
              </p>
              <address className="not-italic leading-relaxed text-slate">
                <p className="font-semibold text-deep-space">
                  Gravice Solutions Private Limited
                </p>
                <p>2nd Floor, Incubinet Coworking Space</p>
                <p>Marg Aditya Complex</p>
                <p>Kothnur Main Road</p>
                <p>JP Nagar 8th Phase</p>
                <p>Bengaluru, Karnataka 560078</p>
                <p>India</p>
              </address>
              <p className="text-slate">
                Email:{" "}
                <Link
                  href="mailto:contact@gravicesolutions.com"
                  className="font-medium text-pull-orange-deep underline-offset-4 hover:underline"
                >
                  contact@gravicesolutions.com
                </Link>
              </p>
              <p className="text-slate">
                Related:{" "}
                <Link
                  href="/legal/privacy"
                  className="font-medium text-pull-orange-deep underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
                {" · "}
                <Link
                  href="/legal/terms"
                  className="font-medium text-pull-orange-deep underline-offset-4 hover:underline"
                >
                  Terms of Service
                </Link>
              </p>
            </section>
          </Reveal>
        </div>
      </article>
    </div>
  );
}
