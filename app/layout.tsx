import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import Script from "next/script";
import HamburgerMenu from "@/components/HamburgerMenu";
import "./globals.css";

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-mplus-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "腹巻二三郎｜HARAMAKI NISABUROU Official",
  metadataBase: new URL('https://nisaburou.com'),
  openGraph: {
    title: "腹巻二三郎",
    url: 'https://nisaburou.com',
    siteName: "腹巻二三郎",
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "腹巻二三郎",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-31HHW4PZKF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-31HHW4PZKF');
          `}
        </Script>
      </head>
      <body
        className={`${mPlusRounded.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-mplus-rounded)", fontWeight: "700" }}
      >
        <HamburgerMenu />
        {children}
      </body>
    </html>
  );
}
