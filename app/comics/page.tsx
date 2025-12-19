"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { episodes } from "./episodes";

type Format = "4コマ" | "10コマ";

export default function ComicsPage() {
  const [selectedFormat, setSelectedFormat] = useState<Format>("10コマ");

  const formats: Format[] = ["4コマ", "10コマ"];

  const filteredEpisodes = episodes.filter((ep) => ep.format === selectedFormat);

  return (
    <div className="min-h-screen bg-[#F7CD63] flex flex-col">
      <main className="flex-1 min-h-screen">
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-8 w-full">
          {/* ページタイトル */}
          <header className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-black text-[#4A3424] mb-6">
              エピソード集
            </h1>

            {/* フィルターボタン */}
            <div className="flex flex-wrap justify-center gap-3">
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-6 py-2 rounded-full font-black text-sm transition-all duration-200 ${
                    selectedFormat === format
                      ? "bg-[#4A3424] text-[#FFF6D9] shadow-md scale-105"
                      : "bg-white text-[#4A3424] border-2 border-[#4A3424] hover:bg-[#FFF6D9]"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </header>

          {/* 作品一覧グリッド */}
          {filteredEpisodes.length > 0 ? (
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEpisodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/comics/${ep.slug}`}
                  className={`group relative w-full overflow-hidden rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-200 hover:-translate-y-1 ${
                    ep.format === "4コマ" ? "aspect-[16/9]" : "aspect-[4/5]"
                  }`}
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
          ) : (
            <div className="text-center py-16">
              <p className="text-[#4A3424] font-black text-lg">
                {selectedFormat}のエピソードは準備中です
              </p>
              <p className="text-[#4A3424]/70 font-bold text-sm mt-2">
                お楽しみに！
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
