"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import products from "../public/data/products.json";
import { catalogueCategories, catalogueCategory, whatsappMessageUrl, whatsappOrderUrl } from "../lib/catalog";
import { useOrder } from "../components/OrderContext";
import ProductCard from "../components/ProductCard";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import FeaturedProducts from "../components/FeaturedProducts";
import HubsSection from "../components/HubsSection";
import FAQSection from "../components/FAQSection";
const materialRanges = [
  { name: "Plywood", description: "Boards for cabinetry, joinery and considered interiors.", icon: "M4 5h16v14H4z M4 10h16 M4 15h16" },
  { name: "Wall panels", description: "Texture and depth for the walls that define a space.", icon: "M3 4h18v16H3z M9 4v16 M15 4v16" },
  { name: "Door finishes", description: "Door skins and edge details for a complete finish.", icon: "M6 3h12v18H6z M15 12h.01" },
  { name: "Handles & knobs", description: "The small details that make a lasting impression.", icon: "M5 9h14v6H5z M7 9V7 M17 9V7" },
  { name: "Kitchen items", description: "Practical fittings for the heart of the home.", icon: "M4 5h16v14H4z M4 12h16 M12 12v7" },
  { name: "Hardware", description: "Hinges, channels, locks and fittings for the build.", icon: "M5 8h14 M8 5v14 M16 5v14 M5 16h14" },
];
export default function Home() {
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => products.filter((product) => category === "All" || catalogueCategory(product) === category), [category]);
  const { cart } = useOrder();
  const orderItems = cart.map((entry) => ({ ...entry, product: products.find((product) => product.slug === entry.slug) })).filter((entry) => entry.product);
  const enquiryUrl = orderItems.length ? whatsappOrderUrl(orderItems) : whatsappMessageUrl("Assalamu alaikum, I would like to enquire about Welcome Plywood products.");
  return <main>
    <section className="hero" aria-labelledby="hero-title"><img className="hero-photo" src="/assets/products/hero-showroom.png" alt="" fetchPriority="high"/><div className="hero-atmosphere"/><div className="hero-content"><h1 id="hero-title">Modern <span>Materials</span></h1><p>Plywood, panels and hardware<br className="desktop-break"/> for the spaces you shape.</p><a className="button button-light" href="#catalogue">Start Shopping</a></div></section>
    <section className="intro section-wrap" id="story"><div className="intro-feature"><div className="intro-heading"><span className="eyebrow">MATERIALS FOR THE MAKING</span><h2>Why<br/>New Welcome Plywood?</h2><p>Thoughtful materials and finishing details for the spaces you’re shaping.</p></div><div className="intro-material" aria-label="Antique brass cabinet pull product image"><img src="/assets/why%20welcome.png" alt="Three branch-shaped antique brass cabinet pulls" loading="lazy"/></div></div><div className="intro-values"><article><div className="value-title"><span className="value-number">1/</span><h3>Solid foundations</h3></div><p>Plywood, wall panels and surfaces for the rooms you’re shaping.</p></article><article><div className="value-title"><span className="value-number">2/</span><h3>The finer details</h3></div><p>Hardware, handles, hinges and fittings from our catalogue.</p></article><article><div className="value-title"><span className="value-number">3/</span><h3>A simpler enquiry</h3></div><p>Collect your selections, then confirm pricing with our team.</p></article><a className="intro-more" href="#catalogue" aria-label="Explore the catalogue">↗</a></div></section>
    <section className="catalogue section-wrap" id="catalogue"><div className="section-heading"><div><h2>Best Selling<br/>Product</h2></div><div className="catalogue-heading-filters"><div className="filter-list" role="group" aria-label="Filter products by category"><button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>All</button>{catalogueCategories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div></div>
      {filtered.length ? <><div className="product-grid">{filtered.slice(0, 12).map((product, index) => <ProductCard product={product} index={index} key={product.slug}/>)}</div><div className="catalogue-more"><Link className="button button-outline" href="/products">See more products <span aria-hidden="true">↗</span></Link></div></> : <div className="no-results"><span className="eyebrow">NO MATCHES</span><p>Try another category.</p><button className="text-link" onClick={() => setCategory("All")}>Clear filters ↗</button></div>}
    </section>
    <section className="design-studio section-wrap" aria-labelledby="studio-title"><div className="studio-heading"><span className="eyebrow">VIRTUAL DESIGN STUDIO</span><h2 id="studio-title">Visualize Your Dreams</h2></div><BeforeAfterSlider /></section>
    <section className="material-ranges section-wrap" aria-labelledby="material-ranges-title"><h2 id="material-ranges-title">Browse our range<br/>of materials</h2><div className="material-ranges-grid">{materialRanges.map((item) => <article className="material-range" key={item.name}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.icon}/></svg><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></section>
    <section className="materials-story section-wrap" aria-labelledby="materials-story-title"><div className="materials-story-heading"><div><span className="eyebrow">THE WELCOME COLLECTION</span><h2 id="materials-story-title">Materials shape<br/>the places we make.</h2><Link className="materials-story-link" href="/products">Explore our collection <span aria-hidden="true">↗</span></Link></div><div className="materials-story-copy"><p>From plywood and panels to the finishing details, find the materials that bring a space together.</p><p>Browse the collection, save your selections, and send your enquiry directly to our team.</p></div></div><div className="materials-story-image"><img src="/assets/products/hero-showroom.png" alt="Wood panels and hardware displayed in a warm showroom" loading="lazy"/></div><div className="materials-story-stats" aria-label="Products by collection">{catalogueCategories.map((item) => <div key={item}><strong>{products.filter((product) => catalogueCategory(product) === item).length}</strong><span>{item}</span></div>)}</div></section>
    <FeaturedProducts />
    <HubsSection />
    <FAQSection />
    <section className="order-banner section-wrap" aria-labelledby="order-banner-title">
      <div className="order-banner-lead"><span className="eyebrow">MADE FOR YOUR NEXT PROJECT</span><h2 id="order-banner-title">The right materials<br/><em>start here.</em></h2><a className="order-banner-quote" href={enquiryUrl} target="_blank" rel="noreferrer">Request a quote <span aria-hidden="true">→</span></a></div>
      <div className="order-banner-contact"><p>Have a project in mind? Explore the collection, choose your materials, and send your enquiry directly to our team.</p><div className="order-banner-links"><Link href="/products"><span className="order-link-icon" aria-hidden="true">▦</span><span><small>EXPLORE</small>Catalogue</span><span aria-hidden="true">↗</span></Link><a href={enquiryUrl} target="_blank" rel="noreferrer"><span className="order-link-icon" aria-hidden="true">↗</span><span><small>CONTACT</small>WhatsApp</span><span aria-hidden="true">↗</span></a><a href={orderItems.length ? whatsappOrderUrl(orderItems) : "/products"} target={orderItems.length ? "_blank" : undefined} rel={orderItems.length ? "noreferrer" : undefined}><span className="order-link-icon" aria-hidden="true">＋</span><span><small>YOUR SELECTION</small>{orderItems.length ? `${orderItems.length} product${orderItems.length === 1 ? "" : "s"}` : "Build a list"}</span><span aria-hidden="true">↗</span></a></div></div>
    </section>
    <footer className="site-footer section-wrap" id="contact">
      <div className="site-footer-main"><div className="site-footer-about"><Link href="/" className="footer-brand" aria-label="Welcome Plywood home"><img src="/assets/logo.png" alt="Welcome Plywood" /></Link><p>Wood, surfaces and finishing details for the spaces you shape.</p></div><nav className="site-footer-nav" aria-label="Footer navigation"><div><h2>Explore</h2><Link href="/products">All products</Link><a href="/#catalogue">Collections</a><a href="/#story">Why Welcome</a></div><div><h2>Information</h2><a href="/#faq">FAQs</a><a href="/#contact">Contact</a><a href={enquiryUrl} target="_blank" rel="noreferrer">WhatsApp enquiry ↗</a></div></nav></div>
      <div className="site-footer-bottom"><small>© {new Date().getFullYear()} New Welcome Plywood. All rights reserved.</small><span>Wood · Surface · Form</span></div>
    </footer>
  </main>;
}



