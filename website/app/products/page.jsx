import ProductsCatalogue from "../../components/ProductsCatalogue";

export const metadata = {
  title: "Products | Welcome Plywood",
  description: "Browse plywood, panels, hardware and kitchen items from the Welcome Plywood catalogue.",
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const value = (key) => typeof params?.[key] === "string" ? params[key] : "";
  return <main className="products-page"><ProductsCatalogue key={JSON.stringify(params || {})} initialFilters={{
    category: value("category") || "All",
    source: value("source"),
    brand: value("brand"),
    search: value("search"),
  }}/></main>;
}
