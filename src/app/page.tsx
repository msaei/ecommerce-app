import { CampaignBanner } from "@/components/home/campaign-banner";
import { CategoryGrid } from "@/components/home/category-grid";
import { EditorialPair } from "@/components/home/editorial-pair";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { ProductRow } from "@/components/product/product-row";
import { Services } from "@/components/home/services";
import { getProducts } from "@/db/queries/products";

export default async function Home() {
  const newArrivals = await getProducts();

  return (
    <main>
      <Hero />
      <Intro />
      <EditorialPair />
      <ProductRow title="New arrivals" href="#" products={newArrivals} />
      <CampaignBanner />
      <CategoryGrid />
      <Services />
    </main>
  );
}
