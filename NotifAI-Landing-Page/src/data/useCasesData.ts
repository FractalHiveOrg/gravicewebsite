// src/data/useCasesData.ts - Centralized use cases data for landing page template
import iconApprovalsPosting from "../assets/icons /icon 4.svg";
import iconValidationMatching from "../assets/icons /icon 5.svg";
import iconDocIntelligence from "../assets/icons /icon 6.svg";
import iconInvoiceIntake from "../assets/icons /icon 7.svg";
import iconBox from "../assets/icons /icon-box.svg";
import { siteLinks } from "../config/links";

export interface CapabilityItem {
  title: string;
  description: string;
  icon: ImageMetadata;
}

export interface StpStep {
  title: string;
  iconType?: "mail" | "lightning" | "transfer" | "doc" | "user" | "order" | "box" | "truck";
}

export interface WorkflowRuleNode {
  badge: string;
  symbol: string;
  title: string;
  subtitle: string;
}

export interface WorkflowBranchNode {
  badge: string;
  iconType?: "route" | "user" | "transfer" | "doc" | "truck";
  title: string;
  subtitle?: string;
  isGreen?: boolean;
}

export interface RuleSettingsData {
  title: string;
  ifField: string;
  operator: string;
  value: string;
  thenField: string;
  buttonText?: string;
}

export interface UseCaseCtaData {
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export interface UseCaseData {
  id: string;
  meta: {
    title: string;
    description: string;
    url: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    underlinedText: string;
    titleTail: string;
    description: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: CapabilityItem[];
  };
  workflows: {
    eyebrow: string;
    title: string;
    stp: {
      title: string;
      badge: string;
      step1: StpStep;
      step2: StpStep;
      step3: StpStep;
      step4?: StpStep;
    };
    exception: {
      title: string;
      badge: string;
      ruleNode: WorkflowRuleNode;
      noBranch: {
        badge: string;
        node1: WorkflowBranchNode;
        node2: WorkflowBranchNode;
      };
      yesBranch: {
        badge: string;
        node1: WorkflowBranchNode;
        node2: WorkflowBranchNode;
      };
    };
    ruleSettings: RuleSettingsData;
  };
  cta?: UseCaseCtaData;
}

const STP_WORKFLOW_TITLE = "Routine cases go straight through (STP).\nExceptions follow your rules.";
const CTA_SUBTITLE = "Start free with 10 pages,\nor book a walkthrough with our team.";

const heroCtas = {
  primaryCta: {
    text: "Start free",
    href: siteLinks.hero.getStarted,
  },
  secondaryCta: {
    text: "Book a Demo",
    href: siteLinks.footer.bookDemo,
  },
};

const ctaButtons = {
  primaryCta: {
    text: "Get started",
    href: siteLinks.hero.getStarted,
  },
  secondaryCta: {
    text: "Book a Demo",
    href: siteLinks.footer.bookDemo,
  },
};

export const useCasesData: Record<string, UseCaseData> = {
  "accounts-payable": {
    id: "accounts-payable",
    meta: {
      title: "Accounts Payable Automation — Nico",
      description:
        "Automate accounts payable with Nico. Capture invoices from email or upload, match them to POs, route approvals and post to your ERP.",
      url: "https://nico.fractalhive.com/accounts-payable",
    },
    hero: {
      eyebrow: "ACCOUNTS PAYABLE AUTOMATION",
      titleLead: "Automate ",
      underlinedText: "Accounts Payable",
      titleTail: "\nfrom inbox to ERP.",
      description:
        "Your team stops keying in invoices.\nThey only see the ones that need a decision.",
      ...heroCtas,
    },
    capabilities: {
      eyebrow: "CAPABILITIES",
      title: "Everything after\nthe invoice arrives.",
      items: [
        {
          title: "Invoice Intake",
          description: "Email, upload, API or SFTP.\nEvery invoice lands in one queue.",
          icon: iconInvoiceIntake,
        },
        {
          title: "Document Intelligence",
          description: "Vendor, amounts, line items and tax\npulled out and checked.",
          icon: iconDocIntelligence,
        },
        {
          title: "Validation & Matching",
          description: "Matched against POs and GRNs.\nMismatches flagged with the reason.",
          icon: iconValidationMatching,
        },
        {
          title: "Approvals & Posting",
          description: "Approved invoices posted to your ERP\nwith the approval trail attached.",
          icon: iconApprovalsPosting,
        },
      ],
    },
    workflows: {
      eyebrow: "CONFIGURABLE WORKFLOWS",
      title: STP_WORKFLOW_TITLE,
      stp: {
        title: "Nico Orchestration",
        badge: "STP",
        step1: { title: "Invoice received", iconType: "mail" },
        step2: { title: "NICO PROCESSING", iconType: "lightning" },
        step3: { title: "Post to ERP", iconType: "transfer" },
      },
      exception: {
        title: "Nico Orchestration",
        badge: "Exception",
        ruleNode: {
          badge: "RULES",
          symbol: "₹",
          title: "Amount > ₹5L?",
          subtitle: "Conditional branch",
        },
        noBranch: {
          badge: "NO",
          node1: {
            badge: "AUTO ROUTE",
            iconType: "route",
            title: "Auto-process",
            subtitle: "Under threshold",
          },
          node2: {
            badge: "SUCCESS",
            iconType: "doc",
            title: "Invoice Processed Successfully",
            isGreen: true,
          },
        },
        yesBranch: {
          badge: "YES",
          node1: {
            badge: "HUMAN REVIEW",
            iconType: "user",
            title: "Finance approval",
            subtitle: "Above threshold",
          },
          node2: {
            badge: "ACTION",
            iconType: "transfer",
            title: "Create ERP transaction",
            subtitle: "Post to ERP - Write record",
          },
        },
      },
      ruleSettings: {
        title: "Rule Settings",
        ifField: "Invoice Amount",
        operator: "Greater Than",
        value: "₹500,000",
        thenField: "Route to AP Review",
      },
    },
    cta: {
      title: "Try it on your own invoices.",
      subtitle: CTA_SUBTITLE,
      ...ctaButtons,
    },
  },

  "lending-operations": {
    id: "lending-operations",
    meta: {
      title: "Lending Operations Automation — Nico",
      description:
        "Automate lending operations with Nico. Verify loan applications, apply your credit policy, route underwriter reviews and update your LOS.",
      url: "https://nico.fractalhive.com/lending-operations",
    },
    hero: {
      eyebrow: "LENDING OPERATIONS AUTOMATION",
      titleLead: "Automate ",
      underlinedText: "Lending Operations",
      titleTail: "\nfrom application to LOS.",
      description:
        "Clean files move straight through.\nUnderwriters see only the cases that need them.",
      ...heroCtas,
    },
    capabilities: {
      eyebrow: "CAPABILITIES",
      title: "From application form\nto credit decision.",
      items: [
        {
          title: "Application Intake",
          description: "Portal, email or API,\nall in one queue.",
          icon: iconInvoiceIntake,
        },
        {
          title: "Verification",
          description: "KYC, income, and bank documents\nchecked against the application.",
          icon: iconValidationMatching,
        },
        {
          title: "Rules & Decisioning",
          description: "Your eligibility and credit policy,\napplied the same way every time.",
          icon: iconDocIntelligence,
        },
        {
          title: "LOS Updates",
          description: "Decisions and documents\nwritten back to your LOS.",
          icon: iconApprovalsPosting,
        },
      ],
    },
    workflows: {
      eyebrow: "CONFIGURABLE WORKFLOWS",
      title: STP_WORKFLOW_TITLE,
      stp: {
        title: "Nico Orchestration",
        badge: "STP",
        step1: { title: "Application received", iconType: "doc" },
        step2: { title: "NICO PROCESSING", iconType: "lightning" },
        step3: { title: "Post to LOS", iconType: "transfer" },
      },
      exception: {
        title: "Nico Orchestration",
        badge: "Exception",
        ruleNode: {
          badge: "RULES",
          symbol: "₹",
          title: "Loan > ₹25L?",
          subtitle: "Conditional branch",
        },
        noBranch: {
          badge: "NO",
          node1: {
            badge: "AUTO ROUTE",
            iconType: "route",
            title: "Auto-process",
            subtitle: "Under threshold",
          },
          node2: {
            badge: "SUCCESS",
            iconType: "doc",
            title: "Loan Processed Successfully",
            isGreen: true,
          },
        },
        yesBranch: {
          badge: "YES",
          node1: {
            badge: "HUMAN REVIEW",
            iconType: "user",
            title: "Underwriter Review",
            subtitle: "Above threshold",
          },
          node2: {
            badge: "ACTION",
            iconType: "transfer",
            title: "Create LOS transaction",
            subtitle: "Post to LOS - Write record",
          },
        },
      },
      ruleSettings: {
        title: "Rule Settings",
        ifField: "Loan Amount",
        operator: "Greater Than",
        value: "₹25,00,000",
        thenField: "Route to Underwriter Review",
      },
    },
    cta: {
      title: "Try it on your own loan files.",
      subtitle: CTA_SUBTITLE,
      ...ctaButtons,
    },
  },

  "order-processing": {
    id: "order-processing",
    meta: {
      title: "Order Processing Automation — Nico",
      description:
        "Automate order processing with Nico. Check orders for price, stock and credit, route discount approvals and create sales orders in your ERP.",
      url: "https://nico.fractalhive.com/order-processing",
    },
    hero: {
      eyebrow: "ORDER PROCESSING AUTOMATION",
      titleLead: "Automate ",
      underlinedText: "Order Processing",
      titleTail: "\nfrom intake to fulfilment.",
      description:
        "Orders are checked and posted as they arrive.\nSales steps in only on exceptions.",
      ...heroCtas,
    },
    capabilities: {
      eyebrow: "CAPABILITIES",
      title: "The checks every order needs\nbefore it ships.",
      items: [
        {
          title: "Order Intake",
          description: "Orders from email, portals or API,\nno retyping.",
          icon: iconBox,
        },
        {
          title: "Validation",
          description: "Customer, SKU, quantity, and price\nchecked on arrival.",
          icon: iconValidationMatching,
        },
        {
          title: "Rules & Checks",
          description: "Stock, credit limit, and discount rules\napplied before approval.",
          icon: iconDocIntelligence,
        },
        {
          title: "ERP Actions",
          description: "Sales orders created in SAP, NetSuite\nor your own database.",
          icon: iconApprovalsPosting,
        },
      ],
    },
    workflows: {
      eyebrow: "CONFIGURABLE WORKFLOWS",
      title: STP_WORKFLOW_TITLE,
      stp: {
        title: "Nico Orchestration",
        badge: "STP",
        step1: { title: "Order received", iconType: "box" },
        step2: { title: "NICO PROCESSING", iconType: "lightning" },
        step3: { title: "Post to ERP", iconType: "transfer" },
        step4: { title: "Fulfilment routed", iconType: "truck" },
      },
      exception: {
        title: "Nico Orchestration",
        badge: "Exception",
        ruleNode: {
          badge: "RULES",
          symbol: "%",
          title: "Order Discount > 15%?",
          subtitle: "Conditional branch",
        },
        noBranch: {
          badge: "NO",
          node1: {
            badge: "AUTO ROUTE",
            iconType: "route",
            title: "Auto-process",
            subtitle: "Under threshold",
          },
          node2: {
            badge: "SUCCESS",
            iconType: "truck",
            title: "Fulfilment Routed",
            isGreen: true,
          },
        },
        yesBranch: {
          badge: "YES",
          node1: {
            badge: "HUMAN REVIEW",
            iconType: "user",
            title: "Sales Manager Review",
            subtitle: "Above threshold",
          },
          node2: {
            badge: "ACTION",
            iconType: "transfer",
            title: "Create ERP transaction",
            subtitle: "Post to ERP - Write record",
          },
        },
      },
      ruleSettings: {
        title: "Rule Settings",
        ifField: "Order Discount",
        operator: "Greater Than",
        value: "15%",
        thenField: "Route to Sales Manager",
        buttonText: "Save Rule",
      },
    },
    cta: {
      title: "Try it on your own orders.",
      subtitle: CTA_SUBTITLE,
      ...ctaButtons,
    },
  },

  "customer-onboarding": {
    id: "customer-onboarding",
    meta: {
      title: "Customer Onboarding Automation — Nico",
      description:
        "Automate customer onboarding with Nico. Collect and verify documents, flag missing details and set up approved customers in your CRM.",
      url: "https://nico.fractalhive.com/customer-onboarding",
    },
    hero: {
      eyebrow: "CUSTOMER ONBOARDING AUTOMATION",
      titleLead: "Automate ",
      underlinedText: "Customer Onboarding",
      titleTail: "\nfrom application to activation.",
      description:
        "Incomplete applications are flagged straight away.\nComplete ones go live without waiting.",
      ...heroCtas,
    },
    capabilities: {
      eyebrow: "CAPABILITIES",
      title: "What happens between\nsign-up and go-live.",
      items: [
        {
          title: "Application Intake",
          description: "Forms, portals, and API submissions\nin one place.",
          icon: iconInvoiceIntake,
        },
        {
          title: "Document Intelligence",
          description: "IDs, proofs, and forms\nread and structured.",
          icon: iconDocIntelligence,
        },
        {
          title: "Verification & Rules",
          description: "Missing or mismatched details\nflagged right away.",
          icon: iconValidationMatching,
        },
        {
          title: "Approvals & Updates",
          description: "Approved customers\nset up in your CRM and core systems.",
          icon: iconApprovalsPosting,
        },
      ],
    },
    workflows: {
      eyebrow: "CONFIGURABLE WORKFLOWS",
      title: STP_WORKFLOW_TITLE,
      stp: {
        title: "Nico Orchestration",
        badge: "STP",
        step1: { title: "Application received", iconType: "doc" },
        step2: { title: "NICO PROCESSING", iconType: "lightning" },
        step3: { title: "Post to CRM", iconType: "transfer" },
        step4: { title: "Customer is Activated", iconType: "user" },
      },
      exception: {
        title: "Nico Orchestration",
        badge: "Exception",
        ruleNode: {
          badge: "RULES",
          symbol: "doc",
          title: "Missing Document?",
          subtitle: "Conditional branch",
        },
        noBranch: {
          badge: "NO",
          node1: {
            badge: "AUTO ROUTE",
            iconType: "route",
            title: "Auto-process",
            subtitle: "All documents present",
          },
          node2: {
            badge: "SUCCESS",
            iconType: "user",
            title: "Customer is Activated",
            isGreen: true,
          },
        },
        yesBranch: {
          badge: "YES",
          node1: {
            badge: "HUMAN REVIEW",
            iconType: "user",
            title: "Operations Review",
            subtitle: "Document missing",
          },
          node2: {
            badge: "ACTION",
            iconType: "transfer",
            title: "Create CRM transaction",
            subtitle: "Post to CRM - Write record",
          },
        },
      },
      ruleSettings: {
        title: "Rule Settings",
        ifField: "Required document missing",
        thenField: "Route to Operations Review",
        buttonText: "Save Rule",
      },
    },
    cta: {
      title: "Try it on your own applications.",
      subtitle: CTA_SUBTITLE,
      ...ctaButtons,
    },
  },

  "enterprise-operations": {
    id: "enterprise-operations",
    meta: {
      title: "Enterprise Operations Automation — Nico",
      description:
        "Automate internal operations with Nico. Route requests and approvals across teams, handle policy exceptions and update your systems.",
      url: "https://nico.fractalhive.com/enterprise-operations",
    },
    hero: {
      eyebrow: "ENTERPRISE OPERATIONS AUTOMATION",
      titleLead: "Automate ",
      underlinedText: "Internal Operations",
      titleTail: "\nacross teams and systems.",
      description:
        "Requests, approvals and handoffs\nwithout the email chains.",
      ...heroCtas,
    },
    capabilities: {
      eyebrow: "CAPABILITIES",
      title: "Work that crosses\nteams and systems.",
      items: [
        {
          title: "Request Intake",
          description: "Email, forms, or system triggers\nstart the workflow.",
          icon: iconInvoiceIntake,
        },
        {
          title: "Validation & Rules",
          description: "Your policies decide\nwhere each request goes.",
          icon: iconValidationMatching,
        },
        {
          title: "Approvals & Exceptions",
          description: "Judgement calls go to a person.\nEverything else keeps moving.",
          icon: iconApprovalsPosting,
        },
        {
          title: "System Actions",
          description: "Records updated, next steps triggered\nonce a step is completed.",
          icon: iconDocIntelligence,
        },
      ],
    },
    workflows: {
      eyebrow: "CONFIGURABLE WORKFLOWS",
      title: "Your rules decide\nwhen a decision maker is needed.",
      stp: {
        title: "Nico Orchestration",
        badge: "STP",
        step1: { title: "Request received", iconType: "doc" },
        step2: { title: "NICO PROCESSING", iconType: "lightning" },
        step3: { title: "Post to ERP", iconType: "transfer" },
      },
      exception: {
        title: "Nico Orchestration",
        badge: "Exception",
        ruleNode: {
          badge: "RULES",
          symbol: "doc",
          title: "Policy Exception?",
          subtitle: "Conditional branch",
        },
        noBranch: {
          badge: "NO",
          node1: {
            badge: "AUTO ROUTE",
            iconType: "route",
            title: "Auto-process",
            subtitle: "Within policy",
          },
          node2: {
            badge: "SUCCESS",
            iconType: "doc",
            title: "Outcome Posted",
            isGreen: true,
          },
        },
        yesBranch: {
          badge: "YES",
          node1: {
            badge: "HUMAN REVIEW",
            iconType: "user",
            title: "Operations Review",
            subtitle: "Policy exception",
          },
          node2: {
            badge: "ACTION",
            iconType: "transfer",
            title: "Create ERP transaction",
            subtitle: "Post to ERP · Write record",
          },
        },
      },
      ruleSettings: {
        title: "Rule Settings",
        ifField: "Policy Exception",
        thenField: "Route to Operations Review",
        buttonText: "Save Rule",
      },
    },
    cta: {
      title: "Try it on your own requests.",
      subtitle: CTA_SUBTITLE,
      ...ctaButtons,
    },
  },
};
