import Image from "next/image";
import Link from "next/link";
import { ClarityTags } from "@/components/ClarityTags";
import { MoreNews } from "@/components/news/MoreNews";

/**
 * Newsroom article: V-Track on Microsoft Marketplace press release, then "Keep reading" cards.
 * Same layout as RebrandArticlePage. The date is "November 2026" until the exact release date is confirmed.
 */
export const VTRACK_MARKETPLACE_PATH = "/news/v-track-on-microsoft-marketplace";
const NEWSROOM_HREF = "/news";
const MARKETPLACE_URL = "https://marketplace.microsoft.com/en-us/product/fractalhive01.v-track";

/** V-Track logo beside the "Available on Microsoft Marketplace" badge; also used on the Newsroom featured card. */
export function VTrackMarketplaceArt({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 bg-white px-8 py-10 sm:flex-row sm:gap-10 ${className}`}
    >
      <Image src="/vtackBlack.svg" alt="V-Track" width={231} height={72} className="h-[clamp(44px,6vw,64px)] w-auto" />
      <span aria-hidden className="h-px w-16 bg-navy-100 sm:h-20 sm:w-px" />
      <Image
        src="/brand/microsoft-marketplace-badge.png"
        alt="Available on Microsoft Marketplace"
        width={738}
        height={306}
        className="h-[clamp(64px,9vw,100px)] w-auto"
      />
    </div>
  );
}

export function VTrackMarketplaceArticlePage() {
  return (
    <div>
      <ClarityTags tags={{ company: "newsroom_article" }} />

      <section data-cursor-surface="light" className="gv-band gv-light gv-c-sec gv-c-white gv-a-sec">
        <div className="gv-wrap">
          <article className="gv-a-wrap">
            <div className="gv-a-head">
              <div className="gv-a-crumb">
                <Link href={NEWSROOM_HREF}>Newsroom</Link> · Press release
              </div>
              <h1>
                Gravice Solutions&apos; <span className="whitespace-nowrap">V-Track</span> now available on Microsoft
                Marketplace.
              </h1>
              <p className="text-[19px] leading-relaxed text-(--gv-muted-ink)">
                AI-powered collateral valuation governance platform helps banks and financial institutions strengthen
                collateral monitoring, operational visibility, and auditability throughout the lending lifecycle.
              </p>
              <div className="gv-a-meta">
                <span>October 20, 2026</span>
                <i aria-hidden="true" />
                <span>5 min read</span>
                <i aria-hidden="true" />
                <span>Bengaluru, India</span>
              </div>
            </div>

            <a href={MARKETPLACE_URL} aria-label="V-Track on Microsoft Marketplace">
              <VTrackMarketplaceArt className="my-8 rounded-[18px] sm:aspect-video border border-(--gv-line)" />
            </a>

            <div className="gv-a-body">
              <p>
                <strong>BENGALURU, India — November 2026</strong> — Gravice Solutions, an enterprise technology company
                focused on AI-powered business process automation and financial technology solutions, today announced
                the availability of V-Track, its collateral valuation governance and lifecycle monitoring platform, on{" "}
                <a href={MARKETPLACE_URL} className="font-medium text-pull-orange-deep! underline-offset-4! hover:underline">
                  Microsoft Marketplace
                </a>
                , an online store providing applications and services for use on Microsoft Azure.
              </p>
              <p>
                The availability of V-Track on Microsoft Marketplace enables banks, non-banking financial companies
                (NBFCs), and other lending institutions to discover and access a specialised platform designed to
                streamline collateral valuation processes, strengthen monitoring capabilities, and improve governance
                across secured lending portfolios.
              </p>

              <h2>Addressing a critical gap in lending operations</h2>
              <p>
                Over the past decade, financial institutions have made substantial investments in digitising loan
                origination, credit assessment, customer onboarding, and disbursement processes. However,
                post-disbursement collateral valuation and monitoring can remain fragmented across multiple systems,
                spreadsheets, external valuation agencies, and manual operational workflows.
              </p>
              <p>
                Managing collateral throughout its lifecycle involves coordinating valuation activities, monitoring
                changes in asset values, scheduling periodic revaluations, identifying deviations, and maintaining
                appropriate documentation for internal controls and regulatory audits.
              </p>
              <p>
                These activities become increasingly complex as lending institutions expand across business lines,
                geographic locations, and asset categories. Fragmented processes can limit visibility, create
                operational inefficiencies, and make it difficult to maintain consistent governance practices across
                collateral portfolios.
              </p>
              <p>
                V-Track addresses these challenges by bringing collateral valuation and monitoring activities together
                within a centralised digital environment.
              </p>
              <blockquote>
                &ldquo;Collateral management involves multiple activities across valuation, revaluation, monitoring,
                vendor management, and audit requirements. V-Track brings these activities together onto a centralized
                platform, helping financial institutions create greater visibility and governance across the
                collateral lifecycle.&rdquo;
                <footer className="mt-3 font-sans text-[15px] text-(--gv-muted-ink)">
                  Sathish Mahalingam, Chief Business Officer, Gravice Solutions
                </footer>
              </blockquote>

              <h2>Centralised collateral valuation governance</h2>
              <p>
                V-Track is designed to help financial institutions manage collateral valuation and monitoring through
                structured digital workflows, providing greater consistency, transparency, and operational control.
              </p>
              <p>The platform supports:</p>
              <ul>
                <li>Collateral mapping and asset-to-facility linkage</li>
                <li>Real-time loan-to-value (LTV) monitoring</li>
                <li>Policy-driven revaluation triggers</li>
                <li>Valuation report validation and deviation identification</li>
                <li>Valuation vendor governance</li>
                <li>Audit traceability</li>
              </ul>
              <p>
                Through consolidated collateral information, lending institutions can monitor individual assets and
                assess collateral positions at a portfolio level. This supports improved visibility into valuation
                status, upcoming revaluation requirements, collateral-related exceptions, and activities requiring
                attention.
              </p>
              <p>
                Policy-driven workflows help institutions establish structured processes for valuation and revaluation
                activities, while audit trails provide traceability across relevant actions, decisions, and updates.
              </p>
              <p>
                V-Track is designed to support collaboration between credit teams, valuation agencies, risk management
                functions, and other stakeholders involved in collateral administration. By providing a common
                operational environment, the platform aims to reduce dependence on disconnected processes and support
                more consistent collateral governance practices.
              </p>

              <h2>Integration with existing banking infrastructure</h2>
              <p>
                A key design principle of V-Track is its ability to complement existing banking technology investments.
                The platform is designed to operate as an overlay to established lending and banking systems, allowing
                financial institutions to strengthen collateral governance without requiring replacement of their
                existing technology infrastructure.
              </p>
              <p>
                V-Track supports integration through application programming interfaces (APIs), including connections
                with loan origination systems (LOS), core banking systems (CBS), and other enterprise applications.
                These integration capabilities enable collateral information and valuation workflows to connect with
                existing lending operations, supporting coordinated processes and improved information accessibility.
              </p>
              <p>
                The platform&apos;s architecture is intended to accommodate different institutional requirements,
                business processes, and technology environments.
              </p>

              <h2>Available through Microsoft Marketplace</h2>
              <blockquote>
                &ldquo;We&apos;re pleased to welcome V-Track from Gravice Solutions to Microsoft Marketplace.
                Marketplace connects trusted solutions from global partners with customers worldwide, making it easy to
                find and deploy apps that work seamlessly with Microsoft products.&rdquo;
                <footer className="mt-3 font-sans text-[15px] text-(--gv-muted-ink)">
                  Cyril Belikoff, Vice President, Microsoft Azure Product Marketing
                </footer>
              </blockquote>
              <p>
                Microsoft Marketplace provides a digital channel through which organisations can discover, evaluate,
                and procure cloud applications and services. V-Track&apos;s availability through Marketplace expands its
                accessibility to financial institutions seeking collateral valuation governance solutions within the
                Microsoft cloud ecosystem.
              </p>
              <p>
                Built on Microsoft Azure, V-Track uses Azure services for application hosting, data management,
                identity, security, and monitoring. Azure OpenAI Service supports AI-assisted capabilities within the
                platform, while Microsoft Entra ID and Azure Key Vault help provide secure identity and access
                management.
              </p>
              <p>
                This technology foundation supports the delivery of collateral valuation governance and lifecycle
                monitoring capabilities within a scalable cloud environment. V-Track is designed to support enterprise
                deployment requirements, including dedicated cloud environments and integration with
                institution-specific technology architectures.
              </p>

              <h2>Supporting the evolution of secured lending</h2>
              <p>
                As financial institutions continue to modernise their lending operations, collateral governance remains
                an important component of credit risk management and operational oversight.
              </p>
              <p>
                V-Track is designed to help institutions establish greater visibility across collateral valuation
                activities, coordinate monitoring requirements, and maintain structured records throughout the
                collateral lifecycle. By connecting collateral information, workflows, and governance processes, the
                platform supports financial institutions seeking to improve operational consistency while leveraging
                their existing banking systems.
              </p>
              <p>
                Its availability on Microsoft Marketplace represents an important milestone in Gravice Solutions&apos;
                efforts to make specialised banking technology accessible to financial institutions across markets.
              </p>

              <h2>About Gravice Solutions Private Limited</h2>
              <p>
                Gravice Solutions is an enterprise technology company focused on developing AI-powered platforms and
                digital solutions for financial institutions and other enterprises. Its platforms address business
                process automation, workflow orchestration, document intelligence, and financial operations.
              </p>
              <p>
                The company&apos;s solutions include V-Track, a collateral valuation governance and lifecycle monitoring
                platform; ElevateRM, a deal orchestration platform for relationship managers; and NICO, an AI-powered
                document intelligence and workflow automation platform designed to automate document-intensive business
                processes.
              </p>
              
            </div>
          </article>
        </div>
      </section>

      <MoreNews currentHref={VTRACK_MARKETPLACE_PATH} />
    </div>
  );
}
