// import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <main className="min-h-screen pt-20 bg-[color:var(--color-retro-pink)]">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-black mb-8 text-center">
            ガソリンスタンド - ニュース
          </h1>
          <p className="text-center text-gray-700 mb-8">
            最新ニュースは準備中です。お楽しみに！
          </p>
          <div className="text-center">
            <Link
              href="/"
              className="inline-block bg-[color:var(--color-retro-blue)] text-white px-6 py-3 rounded-lg border-4 border-black font-bold hover:scale-105 transition-transform"
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
