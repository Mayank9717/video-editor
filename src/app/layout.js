import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  // Make your desired changes within the component
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
