import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";
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
      <body
        className={`${mPlusRounded.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-mplus-rounded)", fontWeight: "700" }}
      >
        {children}
      </body>
    </html>
  );
}
