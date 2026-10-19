export function formatCategory(value = "") {
  return value.toLowerCase().replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}
const catalogueCategories = ["Hardware", "Plywood", "Kitchen Items", "Brand"];
const brandNames = ["Alnoor", "DINKO", "SMC", "J & I", "J&I", "Wellmax", "SSadeen", "Sitara", "Jary", "FIXO"];
export function catalogueCategory(product) {
  const name = product.name || "";
  if (brandNames.some((brand) => name.toLowerCase().includes(brand.toLowerCase()))) return "Brand";
  const source = (product.category || "").toLowerCase().replace(/[ _-]/g, "");
  if (["plywood", "wallpanel", "doorskin", "edgebandingtape"].includes(source)) return "Plywood";
  if (["kitchenitems", "wardrobe"].includes(source)) return "Kitchen Items";
  return "Hardware";
}
export { catalogueCategories };
export function whatsappMessageUrl(message) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
export function whatsappOrderUrl(items) {
  const lines = ["Assalamu alaikum, I would like to enquire about:", ""];
  for (const { product, quantity } of items) {
    lines.push(`${quantity} × ${product.name}`);
    if (product.price != null) lines.push(`Price: ${product.currency ? `${product.currency} ` : ""}${product.price}`);
    lines.push(`Product: ${product.productUrl}`, "");
  }
  lines.push("Please confirm current pricing and availability.");
  return whatsappMessageUrl(lines.join("\n"));
}
