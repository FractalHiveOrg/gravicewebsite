import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StubPage } from "@/components/StubPage";
import { stubs } from "@/lib/stubs";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  return Object.keys(stubs).map((path) => ({
    slug: path.split("/"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const stub = stubs[key];
  if (!stub) return {};
  return { title: stub.title, description: stub.description };
}

export default async function CatchAllStub({ params }: Props) {
  const { slug } = await params;
  const key = slug.join("/");
  const stub = stubs[key];
  if (!stub) notFound();
  return (
    <StubPage
      title={stub.title}  
      description={stub.description}
      cta={stub.cta}
      showProductsLink={stub.showProductsLink}
    />
  );
}
