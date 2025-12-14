import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "The Disposable Depot – Premium Catalogue",
  description: "Best Wholesale Prices in Jalandhar for Packaged Water & Disposables",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}