import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bizora — Workforce Attendance OS",
  description: "Smart Attendance. Seamless Management. Accept your workplace invitation and join your team on Bizora.",
  metadataBase: new URL("https://bizora.app"),
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    siteName: "Bizora",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
