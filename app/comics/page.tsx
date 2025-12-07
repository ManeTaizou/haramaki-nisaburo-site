import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { episodes } from "./episodes";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function ComicsPage() {
  return (
    <div className="min-h-screen bg-[#F7CD63] flex flex-col">
      <main className="flex-1 min-h-screen">
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-8 w-full">
          {/* ページタイトル */}
          <header className="mb-10 text-center">
            <h1 className={`text-2xl font-bold tracking-wide text-neutral-800 ${mPlusRounded.className}`}>
              腹巻二三郎のエピソード集
            </h1>
            <p className="mt-1.5 text-sm text-neutral-700">
              1コマ・4コマ・10コマなどの漫画エピソード
            </p>
          </header>

          {/* 作品一覧グリッド */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((ep) => (
              <Link
                key={ep.id}
                href={`/comics/${ep.slug}`}
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-sm transition-transform duration-150 hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={ep.thumbnail}
                  alt={ep.title}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                  className="object-contain"
                />
              </Link>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
