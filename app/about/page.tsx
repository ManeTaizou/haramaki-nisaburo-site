// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <main className="min-h-screen pt-20 bg-[color:var(--color-retro-gray)]">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            雑居ビル - About
          </h1>
          <p className="text-center text-white mb-8">
            腹巻二三郎についての情報は準備中です。お楽しみに！
          </p>
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-[color:var(--color-retro-orange)] text-white px-6 py-3 rounded-lg border-4 border-black font-bold hover:scale-105 transition-transform"
            >
              トップに戻る
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
