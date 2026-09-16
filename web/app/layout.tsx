import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { IndexerProvider } from "@/components/indexer";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ChainForge",
    template: "%s · ChainForge",
  },
  description:
    "From raw blockchain data to structured onchain intelligence. ChainForge indexes, decodes and models blockchain data into reliable datasets for developers, analysts and researchers.",
  metadataBase: new URL("https://chainforge.cn"),
  openGraph: {
    title: "ChainForge",
    description: "From raw blockchain data to structured onchain intelligence.",
    siteName: "ChainForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChainForge",
    description: "From raw blockchain data to structured onchain intelligence.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "ChainForge",
      url: "https://chainforge.cn",
      logo: "https://chainforge.cn/logo.png",
      sameAs: ["https://github.com/chainforge"],
    },
    {
      "@type": "WebSite",
      name: "ChainForge",
      url: "https://chainforge.cn",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
        <IndexerProvider>
          <Header />
          {children}
          <Footer />
        </IndexerProvider>
      </body>
    </html>
  );
}
