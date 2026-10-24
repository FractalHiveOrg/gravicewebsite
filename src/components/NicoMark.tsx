import Image from "next/image";

type Props = {
  /** Background the mark sits on */
  on?: "dark" | "light";
  className?: string;
  /** Display height in CSS pixels; width scales with asset aspect */
  height?: number;
};

const assets = {
  dark: { src: "/brand/nico-on-dark.png", width: 71, height: 42 },
  light: { src: "/brand/nico-on-light.png", width: 79, height: 42 },
} as const;

export function NicoMark({
  on = "dark",
  className = "",
  height = 18,
}: Props) {
  const asset = assets[on];
  const width = Math.round((asset.width / asset.height) * height);

  return (
    <Image
      src={asset.src}
      alt="NICO"
      width={asset.width}
      height={asset.height}
      className={`inline-block max-w-none ${className}`}
      style={{ height, width }}
      unoptimized
    />
  );
}
