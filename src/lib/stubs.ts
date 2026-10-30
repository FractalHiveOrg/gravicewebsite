export type Stub = {
  title: string;
  description: string;
  cta?: { label: string; href: string };
  /** When false, hides the “jump to products” line. Defaults to true. */
  showProductsLink?: boolean;
};

export const stubs: Record<string, Stub> = {
 
};
