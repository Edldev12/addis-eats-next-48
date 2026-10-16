
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

const themeScript = `
  try {
    const savedTheme = localStorage.getItem("addis-eats-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const theme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : systemPrefersDark
          ? "dark"
          : "light";

    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  } catch {
    document.documentElement.classList.remove("dark");
  }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>

          <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

        </Providers>
      </body>
    </html>
  );
}
