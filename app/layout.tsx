import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import { Loader } from "./ui/Loader";
import SmoothScroll from "./ui/SmoothScroll";

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cinzel",
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
        className={`${cinzel.variable} ${montserrat.variable} font-sans antialiased`}>
        <SmoothScroll>
          <Loader>
            {children}
          </Loader>
        </SmoothScroll>
      </body>
    </html >
  );
}