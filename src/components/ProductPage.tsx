import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { ClarityTags } from "@/components/ClarityTags";
import { NicoMark } from "@/components/NicoMark";
import { ProductFaq } from "@/components/product/ProductFaq";
import { ProductHowItWorks } from "@/components/product/ProductHowItWorks";
import { ProductSecurity } from "@/components/product/ProductSecurity";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductOrb, type GraviceProduct } from "@/gravice/components/ProductOrb";
import { ProductHeroVisual } from "@/gravice/components/product/ProductHeroVisual";
import { ShiftAnimation } from "@/gravice/components/product/ShiftAnimation";
import { productFaqs } from "@/lib/productFaqs";
import { productImages } from "@/lib/productImages";
import { productSecurity } from "@/lib/productSecurity";
import type { Product, ProductSlug } from "@/lib/products";
import { productList } from "@/lib/products";
import { CompanyLogo } from "./companyLogo";
import { ElevateRMLogo } from "./ElevateRMLogo";
import { VtrackLogo } from "./vtrack";
import { NicoLogo } from "./NicoLogo";

/**
 * Product page in the Gravice v2 template (prototypes/elevaterm.html, v-track.html, nico.html):
 * hero with the product orb → shift animation → sticky "How it works" → built in →
 * product-specific sections → credit journey → closing with orb and "Also from Gravice".
 */
const orbFor: Record<ProductSlug, GraviceProduct> = {
  elevaterm: "elevaterm",
  "v-track": "vtrack",
  nico: "nico",
};

const themeFor: Record<ProductSlug, string> = {
  elevaterm: "gv-product-erm",
  "v-track": "gv-product-vt",
  nico: "gv-product-nico",
};

const MARKETPLACE_BENEFITS = [
  {
    title: "Buy through a channel you already use",
    body: "Find and procure V-Track from the marketplace your IT and procurement teams already work with.",
  },
  {
    title: "One Microsoft invoice",
    body: "Marketplace purchases are billed alongside your existing Microsoft charges, with no new vendor billing to set up.",
  },
  {
    title: "Use your Azure commitment",
    body: "Eligible purchases can count toward your Microsoft Azure Consumption Commitment (MACC).",
  },
  {
    title: "Faster procurement",
    body: "Your existing Microsoft agreement shortens vendor onboarding, security reviews, and contracting.",
  },
];

type Props = { product: Product };

export function ProductPage({ product }: Props) {
  const others = productList.filter((p) => p.slug !== product.slug);
  const orb = orbFor[product.slug];
  const images = productImages[product.slug];

  // sections after "Built in" (white) alternate cream / white
  const extras: { key: string; render: (band: string) => ReactNode }[] = [];
  if (product.useCases) {
    const useCases = product.useCases;
    extras.push({
      key: "use-cases",
      render: (band) => (
        <section key="use-cases" data-cursor-surface="light" className={`gv-band gv-light ${band}`}>
          <div className="gv-wrap">
            <div className="gv-p-top">
              <div className="gv-eyebrow">Use cases for banks &amp; NBFCs</div>
              <h2>One engine. Any process.</h2>
            </div>
            <div className="gv-p-grid gv-p-grid-3">
              {useCases.map((uc) => (
                <article key={uc.title} className="gv-p-card">
                  <h3>{uc.title}</h3>
                  <p>{uc.body}</p>
                </article>
              ))}
              <article className="gv-p-dark" style={{ justifyContent: "space-between" }}>
                <div className="gv-stack">
                  <div className="gv-eyebrow">Your process</div>
                  <p>Show us your manual workflow. We will show you how NICO automates it.</p>
                </div>
                <Button
                  href="/demo?product=nico"
                  size="sm"
                  className="mt-6 w-fit"
                  clarityEvent="book_demo_click"
                  claritySource="product_nico_card"
                >
                  Book a demo
                </Button>
              </article>
            </div>
          </div>
        </section>
      ),
    });
  }
  if (product.offerings) {
    const offerings = product.offerings;
    extras.push({
      key: "offerings",
      render: (band) => (
        <section key="offerings" data-cursor-surface="light" className={`gv-band gv-light ${band}`}>
          <div className="gv-wrap gv-p-grid">
            {offerings.map((o) => (
              <article key={o.title} className="gv-p-dark">
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </article>
            ))}
          </div>
        </section>
      ),
    });
  }
  if (product.microsoftPartnership) {
    const ms = product.microsoftPartnership;
    extras.push({
      key: "microsoft",
      render: (band) => (
        <section key="microsoft" data-cursor-surface="light" className={`gv-band gv-light ${band}`}>
          <div className="gv-wrap gv-p-ms">
            <div className="gv-p-top" style={{ marginBottom: 20 }}>
              <div className="gv-eyebrow">Our partnership</div>
              <h2>{ms.headline}</h2>
              <p style={{ color: "var(--gv-muted-ink)", fontSize: 17, lineHeight: 1.6 }}>{ms.summary}</p>
            </div>
            <div className="gv-p-dark gv-p-ms-head">
              <div>
                <h3>Official Microsoft Partner</h3>
                {/* <p>Microsoft AI Cloud Partner Program · ISV Success</p> */}
                <p>Gravice is part of Microsoft’s ISV Success program. <br /> Our platform is built on Microsoft Azure and listed on Microsoft Marketplace, <br /> so you can buy and deploy it through the cloud your organisation already trusts.</p>
                <div className="gv-p-ms-chips">
                  <span>Listed on Microsoft Marketplace</span>
                  <span>Built on Microsoft Azure</span>
                </div>
              </div>
              <div className="gv-p-ms-badge">
                <i aria-hidden>
                  <b style={{ background: "#F25022" }} />
                  <b style={{ background: "#7FBA00" }} />
                  <b style={{ background: "#00A4EF" }} />
                  <b style={{ background: "#FFB900" }} />
                </i>
                <span>
                  Available on
                  <br />
                  Microsoft Marketplace
                </span>
              </div>
            </div>
            <h3 className="gv-p-ms-sub">Why buying through Microsoft Marketplace helps</h3>
            <div className="gv-p-grid">
              {MARKETPLACE_BENEFITS.map((item) => (
                <article key={item.title} className="gv-p-card">
                  <span className="gv-p-bar" aria-hidden />
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
            <div className="gv-p-dark gv-p-ms-cta">
              <h3>Find {product.name} on Microsoft Marketplace.</h3>
              <Button
                href={ms.marketplaceUrl}
                className="shrink-0"
                clarityEvent="marketplace_click"
                claritySource={product.slug}
              >
                View on the Marketplace →
              </Button>
            </div>
          </div>
        </section>
      ),
    });
  }
  extras.push({
    key: "journey",
    render: (band) => (
      <section key="journey" data-cursor-surface="light" className={`gv-band gv-light ${band}`}>
        <div className="gv-wrap">
          <div className="gv-p-top">
            <h2>Across the credit journey</h2>
          </div>
          <ol className="gv-p-journey" style={{ ["--n" as string]: product.coverage.length }}>
            {product.coverage.map((row, i) => (
              <li key={row.stage}>
                <span className="gv-p-jn">{String(i + 1).padStart(2, "0")}</span>
                <h3>{row.stage}</h3>
                <p>{row.capability}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    ),
  });
  extras.push({
    key: "security",
    render: (band) => <ProductSecurity key="security" security={productSecurity[product.slug]} band={band} />,
  });
  extras.push({
    key: "faq",
    render: (band) => <ProductFaq key="faq" faq={productFaqs[product.slug]} band={band} />,
  });
  const bands = extras.map((_, i) => (i % 2 === 0 ? "gv-p-cream" : "gv-p-paper"));

  return (
    <div className={themeFor[product.slug]}>
      <ClarityTags tags={{ product: product.slug }} />

      {/* 1 · hero */}
      <section data-cursor-surface="dark" className="gv-band gv-p-hero">
        <div className="gv-wrap gv-p-hero-grid">
          <div className="gv-p-hero-copy">
            <div className="gv-p-lockup">
              {/* <CompanyLogo size={40} /> */}
              {/* <span className="gv-p-sep" /> */}
              <b>
                {product.slug==="elevaterm"&&<ElevateRMLogo size={200} />}
                {product.slug==="v-track"&&<VtrackLogo size={150} />}
                {product.slug==="nico"&&<NicoLogo size={110} />}
              </b>  
            </div>
            <div className="gv-p-eyebrow-row">
              <div className="gv-eyebrow">{product.tagline}</div>
              {product.badge && <span className="gv-p-badge">{product.badge}</span>}
            </div>
            <h1>{product.headline}</h1>
            <p className="gv-p-lede">{product.summary}</p>
            <div className="gv-row">
              {product.slug === "nico" ? (
                <>
                
                <Button
                  href="https://nico.fractalhive.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2.5"
                  clarityEvent="nico_explore_click"
                  claritySource="product_hero"
                  >
                  Try Nico for Free
                </Button>
                 <Button
                  href={`/demo?product=${product.slug}`}
                  clarityEvent="book_demo_click"
                  claritySource="product_hero"
                  variant="secondary-dark"
                >
                  Book a demo
                </Button>
                  </>
              ) : (
                <Button
                  href={`/demo?product=${product.slug}`}
                  clarityEvent="book_demo_click"
                  claritySource="product_hero"
                >
                  Book a demo
                </Button>
              )}
              {/* <Button href="/#products" variant="secondary-dark">
                All products
              </Button> */}
            </div>
            <div className="gv-p-built-for">
              <em>{product.audience}</em>
            </div>
          </div>
          <ProductHeroVisual product={orb}/>
          
        </div>
      </section>

      {/* 2 · where it breaks → what changes */}
      <section data-cursor-surface="light" className="gv-band gv-light gv-p-shift">
        <div className="gv-wrap">
          <ShiftAnimation variant={orb} afterLabel={`With ${product.name}`} />
          <div className="gv-p-shift-grid">
            <div className="gv-p-shift-card">
              <div className="gv-eyebrow">Where it breaks</div>
              <p>{product.problem}</p>
            </div>
            <div className="gv-p-shift-card">
              <div className="gv-eyebrow">What changes</div>
              <p>{product.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · how it works */}
      <ProductHowItWorks name={product.name} steps={product.steps} screens={images.steps} />

      {/* 4 · built in */}
      <section data-cursor-surface="light" className="gv-band gv-light gv-p-paper">
        <div className="gv-wrap">
          <div className="gv-p-top">
            <h2>Built in</h2>
          </div>
          <div className={`gv-p-grid${product.features.length % 3 === 0 ? " gv-p-grid-3" : ""}`}>
            {product.features.map((f, i) => (
              <article key={f.title} className="gv-p-feat">
                <ProductImage slot={images.features[i]} className="gv-ph-card" />
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* product-specific sections, credit journey, security & deployment, FAQ */}
      {extras.map((s, i) => s.render(bands[i]))}

      {/* 9 · closing + also from Gravice */}
      <section data-cursor-surface="dark" className="gv-band gv-p-close">
        <div className="gv-wrap gv-p-close-inner">
          <ProductOrb product={orb} size={220} />
          <h2>{product.footerLine}</h2>
          <p>{product.footerNote}</p>
          <div className="gv-row">
            <Button
              href={`/demo?product=${product.slug}`}
              clarityEvent="book_demo_click"
              claritySource="product_footer"
            >
              Book a demo
            </Button>
            <Button href="/#products" variant="secondary-dark">
              Explore other products →
            </Button>
          </div>
          <div className="gv-p-also">
            <span className="gv-p-also-label">Also from Gravice</span>
            <div className="gv-p-also-grid">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  data-magnetic
                  data-clarity-event="product_link_click"
                  data-clarity-source={`related_${p.slug}`}
                  className="gv-p-also-card"
                >
                  <ProductOrb product={orbFor[p.slug]} size={76} style={{ flex: "none" }} />
                  <div>
                    <b>{p.name}</b>
                    <span>{p.tagline}</span>
                  </div>
                  <em aria-hidden>→</em>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
