import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Gravice Solutions Private Limited collects, uses, and protects information across our website and products.",
};

type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

const sections: { title: string; blocks: PolicyBlock[] }[] = [
  {
    title: "1. Information We Collect",
    blocks: [
      {
        type: "p",
        text: "Depending on your interaction with our Services, we may collect the following categories of information:",
      },
      { type: "h3", text: "Contact Information" },
      {
        type: "p",
        text: "When you contact us, request a demonstration, register for our services, or communicate with us, we may collect information such as:",
      },
      {
        type: "ul",
        items: [
          "Name",
          "Business email address",
          "Company name",
          "Job title",
          "Telephone number",
          "Business address",
        ],
      },
      { type: "h3", text: "Account Information" },
      {
        type: "p",
        text: "Where applicable, we may collect information required to create and manage user accounts, including authentication credentials, user roles, and account preferences.",
      },
      { type: "h3", text: "Technical Information" },
      {
        type: "p",
        text: "When you access our website or applications, we may automatically collect technical information including:",
      },
      {
        type: "ul",
        items: [
          "IP address",
          "Browser type and version",
          "Operating system",
          "Device information",
          "Log files",
          "Usage analytics",
          "Session information",
          "Diagnostic and performance data",
        ],
      },
      { type: "h3", text: "Customer Data" },
      {
        type: "p",
        text: "Our enterprise applications may process business information provided by our customers in connection with their use of our Services. This information is processed solely to deliver the contracted services and remains under the ownership and control of the respective customer.",
      },
      { type: "h3", text: "Support Information" },
      {
        type: "p",
        text: "We may collect information provided when you contact our support team, submit inquiries, report issues, or request technical assistance.",
      },
    ],
  },
  {
    title: "2. How We Use Information",
    blocks: [
      {
        type: "p",
        text: "We use the information we collect to:",
      },
      {
        type: "ul",
        items: [
          "Deliver, operate, and maintain our products and services.",
          "Improve the functionality, reliability, and performance of our platforms.",
          "Authenticate users and manage secure access.",
          "Provide customer support and technical assistance.",
          "Communicate product updates, service notifications, and important operational information.",
          "Monitor platform usage, security, and system health.",
          "Detect, investigate, and prevent unauthorized access, fraud, and security incidents.",
          "Comply with applicable legal, regulatory, and contractual obligations.",
        ],
      },
    ],
  },
  {
    title: "3. Customer Data",
    blocks: [
      {
        type: "p",
        text: "Gravice acts as a technology service provider for customer data processed within our enterprise applications.",
      },
      {
        type: "p",
        text: "Our customers retain ownership of all customer data processed through our platforms. Gravice processes such data solely in accordance with applicable contractual agreements, documented customer instructions, and applicable law. We do not use customer business data for purposes unrelated to providing our contracted services.",
      },
    ],
  },
  {
    title: "4. Data Security",
    blocks: [
      {
        type: "p",
        text: "Protecting customer information is a fundamental priority for Gravice.",
      },
      {
        type: "p",
        text: "We implement appropriate administrative, technical, and organizational safeguards designed to protect information against unauthorized access, disclosure, alteration, loss, or destruction. These safeguards include, where applicable:",
      },
      {
        type: "ul",
        items: [
          "Encryption of data in transit and at rest",
          "Secure authentication mechanisms",
          "Role-based access controls",
          "Security logging and monitoring",
          "Network and infrastructure protection",
          "Regular security assessments and reviews",
          "Secure software development practices",
        ],
      },
      {
        type: "p",
        text: "While we strive to protect all information entrusted to us, no method of transmission over the Internet or electronic storage system can be guaranteed to be completely secure.",
      },
    ],
  },
  {
    title: "5. Data Sharing",
    blocks: [
      {
        type: "p",
        text: "Gravice Solutions does not sell, rent, or trade personal information.",
      },
      {
        type: "p",
        text: "We may disclose information only where necessary to:",
      },
      {
        type: "ul",
        items: [
          "Trusted service providers supporting the delivery and operation of our Services.",
          "Cloud infrastructure providers hosting our applications.",
          "Regulatory authorities, law enforcement agencies, or government bodies where disclosure is required by applicable law.",
          "Professional advisors, auditors, or legal counsel where necessary for legitimate business purposes.",
        ],
      },
      {
        type: "p",
        text: "All third parties receiving information are expected to maintain appropriate confidentiality and security measures.",
      },
    ],
  },
  {
    title: "6. International Data Transfers",
    blocks: [
      {
        type: "p",
        text: "Depending on the services provided and customer deployment preferences, information may be processed in data centers located in multiple jurisdictions.",
      },
      {
        type: "p",
        text: "Where international data transfers occur, Gravice Solutions implements appropriate safeguards consistent with applicable data protection and privacy laws.",
      },
    ],
  },
  {
    title: "7. Data Retention",
    blocks: [
      {
        type: "p",
        text: "We retain information only for as long as necessary to:",
      },
      {
        type: "ul",
        items: [
          "Deliver our contracted services.",
          "Comply with legal and regulatory obligations.",
          "Resolve disputes.",
          "Enforce contractual rights and obligations.",
          "Maintain appropriate business records.",
        ],
      },
      {
        type: "p",
        text: "When information is no longer required, it is securely deleted, anonymized, or otherwise disposed of in accordance with applicable policies and legal requirements.",
      },
    ],
  },
  {
    title: "8. Cookies and Similar Technologies",
    blocks: [
      {
        type: "p",
        text: "Our website may use cookies and similar technologies to:",
      },
      {
        type: "ul",
        items: [
          "Improve user experience.",
          "Maintain website functionality.",
          "Analyze website usage and performance.",
          "Enhance security.",
          "Remember user preferences.",
        ],
      },
      {
        type: "p",
        text: "Users may control or disable cookies through their browser settings. Please note that disabling certain cookies may affect website functionality. For more detail on categories, purposes, and controls, see our Cookie Notice at /legal/cookies.",
      },
    ],
  },
  {
    title: "9. Your Privacy Rights",
    blocks: [
      {
        type: "p",
        text: "Subject to applicable law, individuals may have the right to:",
      },
      {
        type: "ul",
        items: [
          "Access their personal information.",
          "Request correction of inaccurate or incomplete information.",
          "Request deletion of personal information where applicable.",
          "Object to or restrict certain processing activities.",
          "Request data portability where applicable.",
        ],
      },
      {
        type: "p",
        text: "Requests relating to privacy rights may be submitted using the contact information provided below.",
      },
    ],
  },
  {
    title: "10. Third-Party Services",
    blocks: [
      {
        type: "p",
        text: "Our Services may integrate with third-party platforms and cloud providers, including but not limited to Microsoft Azure, Microsoft Commercial Marketplace, Microsoft 365, and other enterprise software providers.",
      },
      {
        type: "p",
        text: "The collection and processing of information by such third-party services are governed by their respective privacy policies and terms of service.",
      },
    ],
  },
  {
    title: "11. Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this Privacy Policy from time to time to reflect changes in our services, legal requirements, or business practices.",
      },
      {
        type: "p",
        text: "Any updates will be published on this page together with the revised Effective Date. We encourage users to review this Privacy Policy periodically.",
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
      <h2 className="font-serif text-xl font-semibold text-deep-space md:text-2xl">
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

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-paper">
      <article className="page-x mx-auto max-w-3xl space-y-10 py-12 md:py-16">
        <Reveal>
          <header className="space-y-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.96px] text-pull-orange-deep">
              Legal
            </p>
            <h1 className="font-serif text-[clamp(2.25rem,4vw,3.25rem)] font-semibold tracking-tight text-deep-space">
              Privacy Policy
            </h1>
            <p className="text-sm font-medium text-slate">
              Effective Date: August 7, 2026
            </p>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <div className="space-y-4 leading-relaxed text-slate">
            <p>
              Gravice Solutions Private Limited (&quot;Gravice,&quot;
              &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
              protecting the privacy, confidentiality, and security of our
              customers, partners, website visitors, and users of our products
              and services.
            </p>
            <p>
              This Privacy Policy describes how we collect, use, disclose, store,
              process, and safeguard information when you visit our website or
              use our software products and services, including but not limited
              to V-Track, NICO, ElevateRM, and any related applications,
              websites, APIs, and support services (collectively, the
              &quot;Services&quot;).
            </p>
            <p>
              By accessing or using our Services, you acknowledge that you have
              read and understood this Privacy Policy.
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
              <h2 className="font-serif text-xl font-semibold text-deep-space md:text-2xl">
                12. Contact Us
              </h2>
              <p className="leading-relaxed text-slate">
                If you have any questions regarding this Privacy Policy or our
                privacy practices, please contact us:
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
                Website:{" "}
                <Link
                  href="https://www.gravicesolutions.com"
                  className="font-medium text-pull-orange-deep underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.gravicesolutions.com
                </Link>
              </p>
            </section>
          </Reveal>
        </div>

        <Reveal>
          <aside className="rounded-[20px] border border-navy-100 bg-white p-6 md:p-8">
            <h2 className="mb-3 font-serif text-lg font-semibold text-deep-space">
              Enterprise Privacy Commitment
            </h2>
            <p className="leading-relaxed text-slate">
              Gravice Solutions Private Limited is committed to maintaining the
              highest standards of privacy, security, and responsible data
              handling while delivering trusted enterprise software solutions for
              banks, financial institutions, NBFCs, and enterprise customers.
            </p>
          </aside>
        </Reveal>
      </article>
    </div>
  );
}
