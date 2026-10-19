import ProductsCatalogue from "../../components/ProductsCatalogue";

export const metadata = {
  title: "Products | Welcome Plywood",
  description: "Browse plywood, panels, hardware and kitchen items from the Welcome Plywood catalogue.",
};

export default function ProductsPage() {
  return <main className="products-page"><ProductsCatalogue /></main>;
}
