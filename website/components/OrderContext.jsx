"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import products from "../public/data/products.json";

const OrderContext = createContext(null);
export function OrderProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem("welcome-order") || "[]")); } catch { setCart([]); }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("welcome-order", JSON.stringify(cart)); }, [cart, ready]);
  const add = (slug) => setCart((current) => {
    const found = current.find((item) => item.slug === slug);
    return found ? current.map((item) => item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { slug, quantity: 1 }];
  });
  const setQuantity = (slug, quantity) => setCart((current) => quantity < 1 ? current.filter((item) => item.slug !== slug) : current.map((item) => item.slug === slug ? { ...item, quantity } : item));
  const value = useMemo(() => ({ cart, add, setQuantity, count: cart.reduce((sum, item) => sum + item.quantity, 0) }), [cart]);
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
export function useOrder() { return useContext(OrderContext); }
export function getProduct(slug) { return products.find((product) => product.slug === slug); }
