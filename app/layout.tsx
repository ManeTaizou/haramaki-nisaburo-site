import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-mplus-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "腹巻二三郎 公式サイト",
  description: "昭和レトロでゆるくてポップな漫画IP「腹巻二三郎」の公式Webサイト",
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
        {children}
      </body>
    </html>
  );
}
