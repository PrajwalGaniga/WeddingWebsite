import type { Metadata } from "next";
import { Cinzel, Great_Vibes, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neslin-gaywin-wedding.vercel.app"),
  title: "Neslin & Gaywin | Wedding Invitation",
  description:
    "We cordially invite you to celebrate the wedding of Neslin & Gaywin on December 21, 2026 in Mangalore, India.",
  openGraph: {
    title: "The Wedding of Neslin & Gaywin",
    description: "December 21, 2026 • Mangalore, India. Join us in celebrating our holy matrimony.",
    images: ["/assets/floral_frame_hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${greatVibes.variable} ${cormorant.variable} ${montserrat.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#2A1E19] text-[#382A24] antialiased selection:bg-[#C06C4E] selection:text-[#FAF5EE]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

