import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductAccordion } from "@/components/product/product-accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductRow } from "@/components/product/product-row";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { getProductBySlug, getProductSlugs, getRelatedProducts } from "@/db/queries/products";
import { formatPrice } from "@/lib/products";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Atelier Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);

  return (
    <main>
      <div className="container-page pt-4 md:pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-caption text-muted">
            <li>
              <Link href="/" className="link-subtle">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="#" className="link-subtle">
                {product.category}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-4 grid gap-8 md:mt-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>

          <div className="lg:col-span-5 xl:col-span-4 xl:col-start-9">
            <div className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]">
              <div className="flex flex-col gap-3">
                <Link href="#" className="eyebrow link-subtle self-start text-muted">
                  {product.category}
                </Link>
                <h1 className="font-serif text-display-md">{product.name}</h1>
                <p className="text-body-lg">{formatPrice(product.price)}</p>
                <p className="text-caption text-muted">Color: {product.color}</p>
              </div>

              <PurchasePanel product={product} />

              <ProductAccordion product={product} />
            </div>
          </div>
        </div>
      </div>

      <ProductRow title="You may also like" href="#" products={related} />
    </main>
  );
}
