"use client";
import Link from "next/link";
import { catalogueCategory } from "../lib/catalog";
import { useOrder } from "./OrderContext";

export default function ProductCard({ product, index }) {
  const { add } = useOrder();
  return <article className="product-card">
    <Link className="product-visual" href={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
      {product.image ? <img src={product.image} alt={product.name} loading="lazy"/> : <div className={`image-unavailable image-variant-${index % 4}`} aria-hidden="true"/>}
      <span className="visual-category">{catalogueCategory(product)}</span>
    </Link>
    <div className="product-meta"><div><h3><Link href={`/product/${product.slug}`}>{product.name}</Link></h3><p>Price on enquiry</p></div><button className="add-button" type="button" onClick={() => add(product.slug)} aria-label={`Add ${product.name} to order list`}>+</button></div>
  </article>;
}
