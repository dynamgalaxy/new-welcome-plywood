"use client";
import { useMemo, useState } from "react";
import products from "../public/data/products.json";
import { catalogueCategories, matchesCatalogueCategory, productHasBrand } from "../lib/catalog";
import ProductCard from "./ProductCard";

export default function ProductsCatalogue({ initialFilters = {} }) {
  const [category, setCategory] = useState(initialFilters.category || "All");
  const [source, setSource] = useState(initialFilters.source || "");
  const [brand, setBrand] = useState(initialFilters.brand || "");
  const [query, setQuery] = useState(initialFilters.search || "");
  const filtered = useMemo(() => products.filter((product) =>
    matchesCatalogueCategory(product, category) &&
    (!source || (product.category || "").toLowerCase() === source.toLowerCase()) &&
    (!brand || productHasBrand(product, brand)) &&
    `${product.name} ${product.category || ""}`.toLowerCase().includes(query.trim().toLowerCase())
  ), [category, source, brand, query]);
  const clearFilters = () => { setQuery(""); setCategory("All"); setSource(""); setBrand(""); };

  return <section className="products-catalogue section-wrap" aria-labelledby="products-title">
    <div className="products-page-heading"><span className="eyebrow">THE COLLECTION</span><h1 id="products-title">All Products</h1><p>Browse, filter and build your list.</p></div>
    <div className="products-controls"><label className="products-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" aria-label="Search products"/></label><div className="filter-list" role="group" aria-label="Filter products by category"><button className={category === "All" && !source && !brand ? "active" : ""} onClick={clearFilters}>All</button>{catalogueCategories.map((item) => <button key={item} className={category === item && !source && !brand ? "active" : ""} onClick={() => { setCategory(item); setSource(""); setBrand(""); }}>{item}</button>)}</div></div>
    {(source || brand) && <div className="products-active-filter"><span>{source || brand}</span><button type="button" onClick={clearFilters} aria-label="Clear selected filter">×</button></div>}
    {filtered.length ? <div className="product-grid">{filtered.map((product, index) => <ProductCard product={product} index={index} key={product.slug}/>)}</div> : <div className="no-results"><span className="eyebrow">NO MATCHES</span><p>Try another search or category.</p><button className="text-link" onClick={clearFilters}>Clear filters ↗</button></div>}
  </section>;
}
