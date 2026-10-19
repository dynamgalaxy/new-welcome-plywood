"use client";
import { useState } from "react";
import Link from "next/link";
import products from "../public/data/products.json";
import { catalogueCategory } from "../lib/catalog";
import { useOrder } from "./OrderContext";

const selections = [
  { slug: "fuse-acoustic-wooden-wall-panel", visual: "panels" },
  { slug: "alnoor-tactile-1050", visual: "plywood" },
  { slug: "drawer-handle-030", visual: "hardware" },
].map(({ slug, visual }) => ({ ...products.find((product) => product.slug === slug), visual }));

function FeatureVisual({ product }) {
  return product.image
    ? <img src={product.image} alt={product.name} loading="lazy" />
    : <span className={`featured-art featured-art-${product.visual}`} aria-hidden="true" />;
}

function FeatureCard({ product, add, outgoing = false, direction, onExit }) {
  const copy = <>
    <FeatureVisual product={product} />
    <span className="featured-card-category">{catalogueCategory(product)}</span>
    <span className="featured-card-copy"><strong>{product.name}</strong><span>Price on enquiry</span>{!product.image && <small>Illustrative image</small>}</span>
  </>;

  return <article
    className={`featured-card ${outgoing ? `is-exiting featured-move-${direction}` : direction ? `is-entering featured-move-${direction}` : ""}`}
    aria-hidden={outgoing || undefined}
    onAnimationEnd={outgoing ? (event) => { if (event.target === event.currentTarget) onExit(); } : undefined}
  >
    {outgoing
      ? <span className="featured-card-link">{copy}</span>
      : <><Link href={`/product/${product.slug}`} className="featured-card-link" aria-label={`View ${product.name}`}>{copy}</Link><button className="featured-add" type="button" onClick={() => add(product.slug)} aria-label={`Add ${product.name} to order list`}>+</button></>}
  </article>;
}

export default function FeaturedProducts() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [outgoing, setOutgoing] = useState(null);
  const { add } = useOrder();
  const select = (offset) => {
    if (outgoing !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive((current) => (current + offset + selections.length) % selections.length);
      return;
    }
    setOutgoing(active);
    setDirection(offset);
    setActive((active + offset + selections.length) % selections.length);
  };
  const product = selections[active];
  const previous = selections[(active + selections.length - 1) % selections.length];
  const next = selections[(active + 1) % selections.length];

  return <section className="featured-products" aria-labelledby="featured-products-title">
    <div className="featured-products-heading"><span className="eyebrow">FROM THE CATALOGUE</span><h2 id="featured-products-title">Featured products</h2></div>
    <div className="featured-stage">
      <button className="featured-side featured-side-left" type="button" onClick={() => select(-1)} aria-label={`View ${previous.name}`}><FeatureVisual key={previous.slug} product={previous} /></button>
      <div className="featured-center">
        <FeatureCard key={product.slug} product={product} add={add} direction={outgoing !== null ? direction : 0} />
        {outgoing !== null && <FeatureCard key={`outgoing-${outgoing}`} product={selections[outgoing]} outgoing direction={direction} onExit={() => setOutgoing(null)} />}
      </div>
      <button className="featured-side featured-side-right" type="button" onClick={() => select(1)} aria-label={`View ${next.name}`}><FeatureVisual key={next.slug} product={next} /></button>
    </div>
    <div className="featured-products-footer"><button type="button" onClick={() => select(-1)} aria-label="Previous featured product">←</button><Link href="/products">Browse all products <span aria-hidden="true">↗</span></Link><button type="button" onClick={() => select(1)} aria-label="Next featured product">→</button></div>
  </section>;
}
