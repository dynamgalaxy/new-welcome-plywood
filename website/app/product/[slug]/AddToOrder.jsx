"use client";
import { useState } from "react";
import { useOrder } from "../../../components/OrderContext";
export default function AddToOrder({ slug }) {
  const { add } = useOrder();
  const [added, setAdded] = useState(false);
  return <button className="button button-dark" onClick={() => { add(slug); setAdded(true); }}>{added ? "Added to your list ✓" : "Add to order list +"}</button>;
}
