"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import products from "../public/data/products.json";
import { catalogueCategories, matchesCatalogueCategory, whatsappMessageUrl, whatsappOrderUrl } from "../lib/catalog";
import { useOrder } from "../components/OrderContext";
import ProductCard from "../components/ProductCard";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import FAQSection from "../components/FAQSection";
const materialRanges = [
  { name: "Plywood", description: "Boards for cabinetry and interiors.", href: "/products?source=PLYWOOD", icon: "M4 5h16v14H4z M4 10h16 M4 15h16" },
  { name: "Wall panels", description: "Texture and depth for walls.", href: "/products?source=WALL%20PANEL", icon: "M3 4h18v16H3z M9 4v16 M15 4v16" },
  { name: "Door finishes", description: "Door skins and edge details.", href: "/products?source=Door%20Skin", icon: "M6 3h12v18H6z M15 12h.01" },
  { name: "Handles & knobs", description: "Finishing touches for every room.", href: "/products?search=Handle", icon: "M5 9h14v6H5z M7 9V7 M17 9V7" },
  { name: "Kitchen items", description: "Practical kitchen fittings.", href: "/products?source=KITCHEN-ITEMS", icon: "M4 5h16v14H4z M4 12h16 M12 12v7" },
  { name: "Hardware", description: "Hinges, channels, locks and fittings.", href: "/products?category=Hardware", icon: "M5 8h14 M8 5v14 M16 5v14 M5 16h14" },
];
export default function Home() {
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => products.filter((product) => matchesCatalogueCategory(product, category)), [category]);
  const { cart } = useOrder();
  const orderItems = cart.map((entry) => ({ ...entry, product: products.find((product) => product.slug === entry.slug) })).filter((entry) => entry.product);
  const enquiryUrl = orderItems.length ? whatsappOrderUrl(orderItems) : whatsappMessageUrl("Assalamu alaikum, I would like to enquire about Welcome Plywood products.");
  return <main>
    <section className="hero" aria-labelledby="hero-title"><img className="hero-photo" src="/assets/products/hero-showroom.png" alt="" fetchPriority="high"/><div className="hero-atmosphere"/><div className="hero-content"><h1 id="hero-title">Modern <span>Materials</span></h1><p>Plywood, panels and hardware<br className="desktop-break"/> for the spaces you shape.</p><a className="button button-light" href="#catalogue">Start Shopping</a></div></section>
    <section className="intro section-wrap" id="story"><div className="intro-feature"><div className="intro-heading"><span className="eyebrow">MATERIALS FOR THE MAKING</span><h2>Why<br/>New Welcome Plywood?</h2><p>Browse surfaces, fittings and finishing details in one catalogue.</p></div><div className="intro-material" aria-label="Antique brass cabinet pull product image"><img src="/assets/why%20welcome.png" alt="Three branch-shaped antique brass cabinet pulls" loading="lazy"/></div></div><div className="intro-values"><article><div className="value-title"><span className="value-number">1/</span><h3>Surface selection</h3></div><p>Plywood, wall panels and door skins.</p></article><article><div className="value-title"><span className="value-number">2/</span><h3>Finishing details</h3></div><p>Handles, hinges and kitchen fittings.</p></article><article><div className="value-title"><span className="value-number">3/</span><h3>One enquiry list</h3></div><p>Collect products and send their links together.</p></article><a className="intro-more" href="#catalogue" aria-label="Explore the catalogue">↗</a></div></section>
    <section className="catalogue section-wrap" id="catalogue"><div className="section-heading"><div><h2>Explore<br/>Products</h2></div><div className="catalogue-heading-filters"><div className="filter-list" role="group" aria-label="Filter products by category"><button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>All</button>{catalogueCategories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div></div>
      {filtered.length ? <><div className="product-grid">{filtered.slice(0, 12).map((product, index) => <ProductCard product={product} index={index} key={product.slug}/>)}</div><div className="catalogue-more"><Link className="button button-outline" href="/products">See more products <span aria-hidden="true">↗</span></Link></div></> : <div className="no-results"><span className="eyebrow">NO MATCHES</span><p>Try another category.</p><button className="text-link" onClick={() => setCategory("All")}>Clear filters ↗</button></div>}
    </section>
    <section className="design-studio section-wrap" aria-labelledby="studio-title"><div className="studio-heading"><span className="eyebrow">VIRTUAL DESIGN STUDIO</span><h2 id="studio-title">Visualize Your Dreams</h2></div><BeforeAfterSlider /></section>
    <section className="material-ranges section-wrap" aria-labelledby="material-ranges-title"><h2 id="material-ranges-title">Browse our range<br/>of materials</h2><div className="material-ranges-grid">{materialRanges.map((item) => <Link className="material-range" href={item.href} key={item.name}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg><h3>{item.name}</h3><p>{item.description}</p><span className="material-range-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <section className="materials-story section-wrap" aria-labelledby="materials-story-title"><div className="materials-story-heading"><div><span className="eyebrow">THE WELCOME COLLECTION</span><h2 id="materials-story-title">Materials shape<br/>the places we make.</h2><Link className="materials-story-link" href="/products">Explore our collection <span aria-hidden="true">↗</span></Link></div><div className="materials-story-copy"><p>From plywood to hardware, find what your project needs.</p></div></div><div className="materials-story-image"><img src="/assets/products/hero-showroom.png" alt="Wood panels and hardware displayed in a warm showroom" loading="lazy"/></div><div className="materials-story-stats" aria-label="Products by collection">{catalogueCategories.map((item) => <div key={item}><strong>{products.filter((product) => matchesCatalogueCategory(product, item)).length}</strong><span>{item}</span></div>)}</div></section>
    <FeaturedProducts />
    <FAQSection />
    <section className="order-banner section-wrap" aria-labelledby="order-banner-title">
      <img className="order-banner-image" src="/assets/footer-showroom.webp" alt="" loading="lazy" />
      <div className="order-banner-content"><span className="eyebrow">MATERIALS FOR THE MAKING</span><h2 id="order-banner-title">Shape what<br/><em>comes next.</em></h2><p>Explore plywood, panels and finishing details.</p><Link className="order-banner-quote" href="/products">Explore products <span aria-hidden="true">↗</span></Link></div>
    </section>
    <footer className="site-footer section-wrap" id="contact">
      <div className="site-footer-main"><div className="site-footer-about"><Link href="/" className="footer-brand" aria-label="Welcome Plywood home"><img src="/assets/logo.png" alt="Welcome Plywood" /></Link><p>Wood, surfaces and finishing details.</p></div><nav className="site-footer-nav" aria-label="Footer navigation"><div><h2>Shop</h2><Link href="/products">All products</Link><a href="/#catalogue">Best selling</a></div><div><h2>Discover</h2><a href="/#story">Why Welcome</a><a href="/#faq">FAQs</a></div><div><h2>Contact</h2><a href={enquiryUrl} target="_blank" rel="noreferrer">WhatsApp enquiry ↗</a></div></nav></div>
      <div className="site-footer-bottom"><small>© {new Date().getFullYear()} New Welcome Plywood.</small></div>
      <div className="footer-wordmark" aria-hidden="true">NEW WELCOME PLYWOOD</div>
    </footer>
  </main>;
}



