import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Loader } from "./ui/Loader";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair-display",
});

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Notariusz Paulina Kędzierska | Notariusz w Warszawie",
  description: "Kancelaria notarialna na Saskiej Kępie, Praga Południe Warszawa. Notariusz Paulina Kędzierska",
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
        className={`${playfairDisplay.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <Loader>

          {children}
        </Loader>
      </body>
    </html>
  );
}