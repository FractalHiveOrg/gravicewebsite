/** Cal.com booking config for Gravice demo pages. */
export const CAL_USERNAME =
  process.env.NEXT_PUBLIC_CAL_USERNAME ?? "gravice-nv1yfi";

/** Default Gravice demo event. */
export const CAL_DEFAULT_EVENT_SLUG =
  process.env.NEXT_PUBLIC_CAL_EVENT_SLUG ?? "gravice-demo";

/** Product-specific event slugs when dedicated Cal events exist. */
export const CAL_EVENT_BY_PRODUCT: Record<string, string> = {
  nico: "nico-demo",
  elevaterm: CAL_DEFAULT_EVENT_SLUG,
  "v-track": CAL_DEFAULT_EVENT_SLUG,
};

export function getCalEventSlug(product?: string | null): string {
  if (!product) return CAL_DEFAULT_EVENT_SLUG;
  return CAL_EVENT_BY_PRODUCT[product] ?? CAL_DEFAULT_EVENT_SLUG;
}
