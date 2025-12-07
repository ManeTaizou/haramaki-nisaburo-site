import Image from "next/image";
import Footer from "@/components/Footer";
import { M_PLUS_Rounded_1c } from "next/font/google";

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function NisaburoPage() {
  return (
    <div className="min-h-screen bg-[#f3d070] flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          {/* キャラクター画像 */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md aspect-[3/4]">
              <Image
                src="/characters/nisaburo/front.png"
                alt="腹巻二三郎 正面立ち絵"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* キャラクター名 */}
          <header className="text-center mb-8">
            <h1
              className={`text-3xl md:text-4xl font-bold text-neutral-800 ${mPlusRounded.className}`}
            >
              腹巻二三郎
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mt-2">
              （はらまき にさぶろう）
            </p>
          </header>

          {/* プロフィール */}
          <section className="bg-white/60 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="space-y-4 text-neutral-800 leading-relaxed">
              <p>30代独身。昼寝と腹巻が好きな、どこか抜けた主人公。</p>
              <p>
                生まれは大阪だが、現在は田舎の「腹巻商店」でなんとなく働いている。
              </p>
              <p>
                性格はのんびりしているが、時折とんでもない行動力を発揮することがある。
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
