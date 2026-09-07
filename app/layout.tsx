import type { Metadata } from "next";
import { Geist, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soeun Kwon",
  description: "Software developer portfolio of Soeun Kwon.",
  openGraph: {
    title: "Soeun Kwon",
    description: "Software Developer Portfolio",
    url: "https://soeun-portfolio.vercel.app",
    siteName: "Soeun Kwon",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soeun Kwon portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soeun Kwon",
    description: "Software Developer Portfolio",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
