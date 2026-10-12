import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL("https://addiseats.et"),

  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats — Food Delivery in Addis Ababa",
  },

  description:
    "Order delicious Ethiopian food from Addis Eats and get fast delivery across Addis Ababa.",

  openGraph: {
    title: "Addis Eats — Food Delivery in Addis Ababa",
    description:
      "Order delicious Ethiopian food from Addis Eats and get fast delivery across Addis Ababa.",
    type: "website",
    locale: "en_ET",
    siteName: "Addis Eats",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}