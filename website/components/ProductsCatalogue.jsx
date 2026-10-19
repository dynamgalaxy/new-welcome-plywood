"use client";
import { useMemo, useState } from "react";
import products from "../public/data/products.json";
import { catalogueCategories, catalogueCategory } from "../lib/catalog";
import ProductCard from "./ProductCard";

export default function ProductsCatalogue() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => products.filter((product) =>
    (category === "All" || catalogueCategory(product) === category) &&
    `${product.name} ${product.category || ""}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [category, query]);

  return <section className="products-catalogue section-wrap" aria-labelledby="products-title">
    <div className="products-page-heading"><span className="eyebrow">THE COLLECTION</span><h1 id="products-title">All Products</h1><p>Explore the catalogue and add the materials you need to your order list.</p></div>
    <div className="products-controls"><label className="products-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products"/></label><div className="filter-list" role="group" aria-label="Filter products by category"><button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>All</button>{catalogueCategories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
    {filtered.length ? <div className="product-grid">{filtered.map((product, index) => <ProductCard product={product} index={index} key={product.slug}/>)}</div> : <div className="no-results"><span className="eyebrow">NO MATCHES</span><p>Try another product name or category.</p><button className="text-link" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters ↗</button></div>}
  </section>;
}
