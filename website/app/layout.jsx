import "./globals.css";
import { OrderProvider } from "../components/OrderContext";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Welcome Plywood | Materials for considered spaces",
  description: "Explore plywood, architectural panels, hardware and finishing essentials from Welcome Plywood. Browse the catalogue and order directly on WhatsApp.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><OrderProvider><SiteHeader />{children}</OrderProvider></body></html>;
}
