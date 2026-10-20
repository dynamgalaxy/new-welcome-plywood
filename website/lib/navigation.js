import products from "../public/data/products.json";
import { brandNames, catalogueCategories, productHasBrand } from "./catalog";

const sources = new Set(products.map((product) => (product.category || "").toLowerCase()));
const hasName = (term) => products.some((product) => product.name.toLowerCase().includes(term.toLowerCase()));
const categoryLink = (label) => ({ label, href: `/products?category=${encodeURIComponent(label)}` });
const sourceLink = (source, label) => sources.has(source.toLowerCase()) ? { label, href: `/products?source=${encodeURIComponent(source)}` } : null;
const searchLink = (term, label = term) => hasName(term) ? { label, href: `/products?search=${encodeURIComponent(term)}` } : null;
const section = (title, links) => ({ title, links: links.filter(Boolean) });

export const megaMenus = [
  {
    id: "shop", label: "Shop", href: "/products", action: "View all products",
    sections: [
      section("Collections", [{ label: "Explore products", href: "/#catalogue" }, ...catalogueCategories.map(categoryLink)]),
      section("Surfaces", [sourceLink("WALL PANEL", "Wall Panels"), sourceLink("Door Skin", "Door Skin"), sourceLink("EDGE BANDING TAPE", "Edge Banding Tape"), sourceLink("LCB", "LCB")]),
      section("More materials", [sourceLink("CHEMICALS", "Chemicals"), sourceLink("WARDROBE", "Wardrobe"), sourceLink("GOLA-BEEDING", "Gola-Beeding")]),
    ],
  },
  {
    id: "hardware", label: "Hardware", href: "/products?category=Hardware", action: "View hardware",
    sections: [
      section("Handles & locks", [sourceLink("Door Handle Lock", "Door Handle Lock"), sourceLink("DOOR ROZET LOCKS", "Door Rozet Locks"), searchLink("Thumb Locks"), sourceLink("Door Handle", "Door Handle"), sourceLink("Drawer Knob Handle", "Drawer Knob Handle"), sourceLink("DRAWER HANDLE", "Drawer Handle")]),
        section("Hinges & fittings", [searchLink("Hinges"), sourceLink("3D Hinges", "3D Hinges"), searchLink("Legs"), sourceLink("Bracket", "Bracket"), sourceLink("Channels", "Channels"), sourceLink("Cutter", "Cutter"), sourceLink("HARDWARE", "All hardware fittings")]),
    ],
  },
  {
    id: "plywood", label: "Plywood", href: "/products?category=Plywood", action: "View plywood",
    sections: [
      section("Boards & panels", [sourceLink("PLYWOOD", "Plywood"), sourceLink("WALL PANEL", "Wall Panels"), sourceLink("LCB", "LCB")]),
      section("Finishes", [searchLink("Tactile Select"), searchLink("Tactile"), sourceLink("Door Skin", "Door Skin"), sourceLink("EDGE BANDING TAPE", "Edge Banding Tape")]),
    ],
  },
  {
    id: "brands", label: "Brand", href: "/products?category=Brand", action: "View all brands",
    sections: [section("Browse brands", brandNames.filter((brand) => products.some((product) => productHasBrand(product, brand))).map((brand) => ({ label: brand, href: `/products?brand=${encodeURIComponent(brand)}` })))],
  },
];
