import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair-display",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Notariusz Paulina Kędzierska | Kancelaria Notarialna Warszawa",
  description: "Profesjonalna kancelaria notarialna na Saskiej Kępie. Notariusz Paulina Kędzierska - pewność, bezpieczeństwo i terminowość czynności notarialnych.",
  icons: {
    icon: "/logo.svg", 
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body
        className={`${playfairDisplay.variable} ${montserrat.variable} font-sans antialiased bg-[#201F1D] text-[#E9AB6E] selection:bg-[#E9AB6E] selection:text-[#201F1D]`}
      >
        {children}
      </body>
    </html>
  );
}