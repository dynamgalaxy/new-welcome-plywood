"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import products from "../public/data/products.json";
import { whatsappOrderUrl, catalogueCategory } from "../lib/catalog";
import { useOrder } from "./OrderContext";

export default function SiteHeader() {
  const { cart, count, setQuantity } = useOrder();
  const [open, setOpen] = useState(false);
  const [headerMode, setHeaderMode] = useState("top");
  useEffect(() => {
    let previousY = window.scrollY;
    if (previousY > 80) setHeaderMode("scrolled");
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 80) setHeaderMode("top");
      else if (currentY > previousY + 2) setHeaderMode("hidden");
      else if (currentY < previousY - 2) setHeaderMode("scrolled");
      previousY = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const items = cart.map((entry) => ({ ...entry, product: products.find((product) => product.slug === entry.slug) })).filter((entry) => entry.product);
  return <>
    <header className={`site-header ${headerMode === "top" ? "header-top" : headerMode === "hidden" ? "header-hidden" : "header-scrolled"}`}>
      <Link href="/" className="brand" aria-label="Welcome Plywood home"><img src="/assets/logo.png" alt="Welcome Plywood"/></Link>
      <nav className="main-nav" aria-label="Main navigation"><a href="/products">Shop</a><a className="nav-secondary" href="/#catalogue">Plywood</a><a className="nav-secondary" href="/#catalogue">Panels</a><a href="/#story">About Us</a><a href="/#contact">Contact</a></nav>
      <div className="header-actions"><a className="search-action" href="/products" aria-label="Search products"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.4 15.4 4.2 4.2"/></svg></a><button className="bag-button" onClick={() => setOpen(true)} aria-label={`Open order list, ${count} items`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.5h13l1 12h-15l1-12Z"/><path d="M9 8.5V6a3 3 0 0 1 6 0v2.5"/></svg><span className="bag-count">{String(count).padStart(2, "0")}</span></button></div>
    </header>
    {open && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <aside className="order-drawer" aria-label="Your order list">
        <div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Order list <small>({count})</small></h2></div><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close order list">×</button></div>
        {!items.length ? <div className="empty-cart"><span className="empty-mark">W.</span><p>Your list is waiting for its first piece.</p><button className="text-link" onClick={() => setOpen(false)}>Explore the catalogue ↗</button></div> : <>
          <div className="cart-items">{items.map(({ product, quantity }) => <div className="cart-line" key={product.slug}><div className="cart-copy"><Link href={`/product/${product.slug}`} onClick={() => setOpen(false)}>{product.name}</Link><span>{catalogueCategory(product)} · Price on enquiry</span></div><div className="quantity-control"><button onClick={() => setQuantity(product.slug, quantity - 1)} aria-label={`Remove one ${product.name}`}>−</button><span>{quantity}</span><button onClick={() => setQuantity(product.slug, quantity + 1)} aria-label={`Add one ${product.name}`}>+</button></div></div>)}</div>
          <div className="drawer-footer"><p>We’ll confirm pricing and availability with you directly.</p><a className="button button-dark full-button" href={whatsappOrderUrl(items)} target="_blank" rel="noreferrer">Continue on WhatsApp <span>↗</span></a></div>
        </>}
      </aside>
    </div>}
  </>;
}


