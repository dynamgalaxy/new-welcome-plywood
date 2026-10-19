import Link from "next/link";
import { notFound } from "next/navigation";
import products from "../../../public/data/products.json";
import { catalogueCategory, whatsappOrderUrl } from "../../../lib/catalog";
import AddToOrder from "./AddToOrder";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? { title: `${product.name} | Welcome Plywood`, description: `${product.name} from Welcome Plywood. Enquire for current pricing and product details.` } : {};
}
export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <main className="detail-page section-wrap">
    <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/#catalogue">Catalogue</Link><span>/</span><span>{product.name}</span></div>
    <div className="detail-layout"><div className="detail-visual">{product.image ? <img src={product.image} alt={product.name}/> : <div className="image-unavailable image-variant-0 detail-placeholder"><span className="unavailable-rule"/><span>ILLUSTRATIVE<br/>MATERIAL IMAGE</span></div>}<span className="visual-category">{catalogueCategory(product)}</span></div>
      <div className="detail-copy"><span className="eyebrow">{catalogueCategory(product)} · WELCOME PLYWOOD</span><h1>{product.name}</h1><p className="detail-price">Price on enquiry</p><p className="detail-note">Contact us for current pricing, availability and product information.</p><div className="detail-actions"><AddToOrder slug={product.slug}/><a className="button button-outline" href={whatsappOrderUrl([{ product, quantity: 1 }])} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a></div><div className="detail-facts"><div><span className="eyebrow">PRODUCT DETAILS</span><p>No specifications are listed for this product yet. Please enquire for details.</p></div><div><span className="eyebrow">PRODUCT LINK</span><a href={product.productUrl} target="_blank" rel="noreferrer">View original listing ↗</a></div></div></div>
    </div><Link href="/#catalogue" className="text-link back-catalogue">← Back to the catalogue</Link>
  </main>;
}

