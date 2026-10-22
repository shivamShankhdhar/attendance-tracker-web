import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Bizora — Workforce Attendance OS",
  description: "Smart Attendance. Seamless Management. Accept your workplace invitation and join your team on Bizora.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.bizora.shivamshankhdhar.online"
  ),
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: {
    siteName: "Bizora",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
}
