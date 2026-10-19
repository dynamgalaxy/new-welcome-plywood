"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import products from "../public/data/products.json";
import { whatsappMessageUrl, whatsappOrderUrl, catalogueCategory } from "../lib/catalog";
import { megaMenus } from "../lib/navigation";
import { useOrder } from "./OrderContext";

export default function SiteHeader() {
  const { cart, count, setQuantity } = useOrder();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const [headerMode, setHeaderMode] = useState("top");
  const headerRef = useRef(null);
  const hoverTimer = useRef(null);
  const closeTimer = useRef(null);
  const cancelTimers = () => { clearTimeout(hoverTimer.current); clearTimeout(closeTimer.current); };
  const closeMenus = () => { cancelTimers(); setActiveMenu(null); setMobileOpen(false); setMobileGroup(null); };
  const scheduleOpen = (id) => { cancelTimers(); hoverTimer.current = setTimeout(() => setActiveMenu(id), 110); };
  const scheduleClose = () => { cancelTimers(); closeTimer.current = setTimeout(() => setActiveMenu(null), 170); };
  useEffect(() => { closeMenus(); }, [pathname]);
  useEffect(() => {
    const onPointerDown = (event) => { if (!headerRef.current?.contains(event.target)) closeMenus(); };
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      const focusTarget = headerRef.current?.querySelector(".mega-trigger.is-active") || (headerRef.current?.querySelector(".mobile-navigation.is-open") ? headerRef.current?.querySelector(".menu-toggle") : null);
      closeMenus();
      focusTarget?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => { cancelTimers(); document.removeEventListener("pointerdown", onPointerDown); document.removeEventListener("keydown", onKeyDown); };
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);
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
  const menuContent = (menu) => <>
    <div className="mega-groups">{menu.sections.map((group) => <div className="mega-group" key={group.title}><h3>{group.title}</h3>{group.links.map((link) => <Link href={link.href} key={`${group.title}-${link.href}`} onClick={closeMenus}>{link.label}<span aria-hidden="true">↗</span></Link>)}</div>)}</div>
  </>;
  const selectedMenu = megaMenus.find((menu) => menu.id === activeMenu);
  const enquiryUrl = whatsappMessageUrl("Assalamu alaikum, I would like to enquire about Welcome Plywood products.");
  return <>
    {mobileOpen && <button className="mobile-nav-backdrop" type="button" aria-label="Close navigation" onClick={closeMenus}/>}
    <header ref={headerRef} className={`site-header ${mobileOpen ? "mobile-menu-open" : ""} ${headerMode === "top" ? "header-top" : headerMode === "hidden" && !mobileOpen && !activeMenu ? "header-hidden" : "header-scrolled"}`} onPointerLeave={scheduleClose} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose(); }}>
      <Link href="/" className="brand" aria-label="Welcome Plywood home" onPointerEnter={scheduleClose}><img src="/assets/logo.png" alt="Welcome Plywood"/></Link>
      <nav className="main-nav" aria-label="Main navigation">{megaMenus.map((menu) => <button type="button" className={`mega-trigger ${activeMenu === menu.id ? "is-active" : ""}`} key={menu.id} aria-expanded={activeMenu === menu.id} aria-controls="site-mega-panel" onPointerEnter={(event) => { if (event.pointerType === "mouse") scheduleOpen(menu.id); }} onKeyDown={(event) => { if (event.key === "ArrowDown") { event.preventDefault(); cancelTimers(); setActiveMenu(menu.id); requestAnimationFrame(() => headerRef.current?.querySelector("#site-mega-panel a")?.focus()); } }} onClick={() => { cancelTimers(); setActiveMenu(activeMenu === menu.id ? null : menu.id); }}>{menu.label}<span className="mega-chevron" aria-hidden="true"/></button>)}<Link href="/#story" onPointerEnter={scheduleClose} onFocus={scheduleClose} onClick={closeMenus}>About Us</Link><Link href="/#contact" onPointerEnter={scheduleClose} onFocus={scheduleClose} onClick={closeMenus}>Contact</Link></nav>
      <div className="header-actions" onPointerEnter={scheduleClose}><Link className="search-action" href="/products" onClick={closeMenus} aria-label="Search products"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.4 15.4 4.2 4.2"/></svg></Link><button className="bag-button" onClick={() => { closeMenus(); setOpen(true); }} aria-label={`Open order list, ${count} items`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.5h13l1 12h-15l1-12Z"/><path d="M9 8.5V6a3 3 0 0 1 6 0v2.5"/></svg><span className="bag-count">{String(count).padStart(2, "0")}</span></button><button className="menu-toggle" type="button" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => { cancelTimers(); setMobileOpen(!mobileOpen); setMobileGroup(null); }}><span/><span/><span/></button></div>
      <div className={`mega-panel mega-panel--${activeMenu || "closed"} ${activeMenu ? "is-open" : ""}`} id="site-mega-panel" role="region" aria-label={selectedMenu ? `${selectedMenu.label} menu` : "Product menu"} aria-hidden={!activeMenu} onPointerEnter={cancelTimers}>{selectedMenu && <><div className="mega-panel-main"><div className="mega-panel-links">{menuContent(selectedMenu)}</div><div className="mega-promo"><img src="/assets/footer-showroom.webp" alt="Warm wood and plywood displays in a premium showroom"/><Link href={selectedMenu.href} onClick={closeMenus}>{selectedMenu.action}<span aria-hidden="true">↗</span></Link></div></div><div className="mega-panel-footer"><Link href="/" className="mega-footer-brand" aria-label="Welcome Plywood home" onClick={closeMenus}><img src="/assets/logo.png" alt="Welcome Plywood"/></Link><div className="mega-footer-links"><a href={enquiryUrl} target="_blank" rel="noreferrer" onClick={closeMenus}>WhatsApp enquiry <span aria-hidden="true">↗</span></a><Link href="/#contact" onClick={closeMenus}>Contact <span aria-hidden="true">↗</span></Link></div></div></>}</div>
      <nav className={`mobile-navigation ${mobileOpen ? "is-open" : ""}`} id="mobile-navigation" aria-label="Mobile navigation" aria-hidden={!mobileOpen} inert={!mobileOpen}>{megaMenus.map((menu) => <div className="mobile-nav-group" key={menu.id}><button type="button" aria-expanded={mobileGroup === menu.id} aria-controls={`mobile-${menu.id}`} onClick={() => setMobileGroup(mobileGroup === menu.id ? null : menu.id)}>{menu.label}<span aria-hidden="true">{mobileGroup === menu.id ? "−" : "+"}</span></button><div className={`mobile-nav-content ${mobileGroup === menu.id ? "is-open" : ""}`} id={`mobile-${menu.id}`}>{mobileGroup === menu.id && <>{menuContent(menu)}<Link className="mega-all" href={menu.href} onClick={closeMenus}>{menu.action} <span aria-hidden="true">↗</span></Link></>}</div></div>)}<Link href="/#story" onClick={closeMenus}>About Us</Link><Link href="/#contact" onClick={closeMenus}>Contact</Link></nav>
    </header>
    {open && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <aside className="order-drawer" aria-label="Your order list">
        <div className="drawer-head"><div><span className="eyebrow">YOUR SELECTION</span><h2>Order list <small>({count})</small></h2></div><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close order list">×</button></div>
        {!items.length ? <div className="empty-cart"><span className="empty-mark">W.</span><p>Your list is empty.</p><button className="text-link" onClick={() => setOpen(false)}>Continue browsing ↗</button></div> : <>
          <div className="cart-items">{items.map(({ product, quantity }) => <div className="cart-line" key={product.slug}><div className="cart-copy"><Link href={`/product/${product.slug}`} onClick={() => setOpen(false)}>{product.name}</Link><span>{catalogueCategory(product)} · Price on enquiry</span></div><div className="quantity-control"><button onClick={() => setQuantity(product.slug, quantity - 1)} aria-label={`Remove one ${product.name}`}>−</button><span>{quantity}</span><button onClick={() => setQuantity(product.slug, quantity + 1)} aria-label={`Add one ${product.name}`}>+</button></div></div>)}</div>
          <div className="drawer-footer"><p>We’ll confirm pricing and availability.</p><a className="button button-dark full-button" href={whatsappOrderUrl(items)} target="_blank" rel="noreferrer">Continue on WhatsApp <span>↗</span></a></div>
        </>}
      </aside>
    </div>}
  </>;
}


