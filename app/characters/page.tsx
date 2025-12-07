import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { characters } from "./characters";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export default function CharactersPage() {
  return (
    <div className="min-h-screen bg-[#f3d070] flex flex-col">
      <main className="flex-1 min-h-screen">
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-8 w-full">
          {/* ページタイトル */}
          <header className="mb-10 text-center">
            <h1
              className={`text-2xl font-bold tracking-wide text-neutral-800 ${mPlusRounded.className}`}
            >
              登場人物
            </h1>
            <p className="mt-1.5 text-sm text-neutral-700">
              腹巻二三郎の世界に登場するキャラクターたち
            </p>
          </header>

          {/* キャラクター一覧グリッド */}
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => (
              <Link
                key={character.id}
                href={`/characters/${character.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-150 hover:-translate-y-1 hover:shadow-md"
              >
                {/* キャラクター画像 */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f3d070]">
                  <Image
                    src={character.thumbnail}
                    alt={character.name}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>

                {/* テキスト情報 */}
                <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
                  <h2
                    className={`text-lg font-bold text-neutral-800 ${mPlusRounded.className}`}
                  >
                    {character.name}
                  </h2>
                  <p className="text-xs text-neutral-600 mb-2">
                    （{character.nameKana}）
                  </p>
                  <p className="text-sm text-neutral-700 line-clamp-2">
                    {character.description}
                  </p>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
