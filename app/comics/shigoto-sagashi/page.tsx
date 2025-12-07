"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function ShigotoSagashiPage() {
  const comicPages = [
    { src: "/IMG_2726 2.PNG", alt: "仕事探しの巻 - 1コマ目" },
    { src: "/IMG_2762 2.PNG", alt: "仕事探しの巻 - 2コマ目" },
    { src: "/IMG_2706 2.PNG", alt: "仕事探しの巻 - 3コマ目" },
    { src: "/IMG_2764 2.PNG", alt: "仕事探しの巻 - 4コマ目" },
    { src: "/IMG_2722 2 2.PNG", alt: "仕事探しの巻 - 5コマ目" },
    { src: "/IMG_2705 2.PNG", alt: "仕事探しの巻 - 6コマ目" },
    { src: "/IMG_2736 2.PNG", alt: "仕事探しの巻 - 7コマ目" },
    { src: "/IMG_2768 2.png", alt: "仕事探しの巻 - 8コマ目" },
    { src: "/IMG_2711 2.PNG", alt: "仕事探しの巻 - 9コマ目" },
    { src: "/IMG_2730 2.PNG", alt: "仕事探しの巻 - 10コマ目" },
  ];

  // 作者コメント配列（null の場合はそのコマでアイコン非表示）
  const authorComments: (string | null)[] = [
    "はらまきニャーズとスッパイダーマンやで。",
    "わて、背ぇ、伸びたんちゃうか。",
    "あんた、相撲は諦めはったんか？",
    "はくの？はかないの？どっち？ってか・・・。",
    "腹巻商店での日常。ここでの暮らしは平和そのもの。",
    "時折見せる、とんでもない行動力！これが二三郎流。",
    "大阪出身らしいノリの良さが出てきました。",
    "ゆうとくけど、スッパイダーマンやで。",
    "クロッキーってなんやねん？",
    "仕事探しの結末は…？続きをお楽しみに！",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthorCommentOpen, setIsAuthorCommentOpen] = useState(false);

  const toggleAuthorComment = () => {
    setIsAuthorCommentOpen((prev) => !prev);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(comicPages.length - 1, prev + 1));
  };

  const goToPage = (index: number) => {
    setCurrentIndex(index);
  };

  // キーボード操作対応
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="relative min-h-screen bg-[#F7CD63] flex flex-col">
      <main className="flex-1">
        {/* カルーセルセクション */}
        <section className="flex items-center justify-center min-h-full py-10">
          <div className="max-w-4xl w-full px-4">
          {/* 画像表示エリア */}
          <div className="relative bg-white rounded-2xl shadow-lg p-4 md:p-8 mb-6">
            <div className="relative aspect-square md:aspect-[3/4] max-h-[600px] mx-auto overflow-hidden">
              <motion.div
                className="flex h-full"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              >
                {comicPages.map((page, index) => (
                  <div
                    key={index}
                    className="relative w-full h-full flex-shrink-0"
                  >
                    <Image
                      src={page.src}
                      alt={page.alt}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* 矢印ボタン */}
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="前のコマ"
              className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={goToNext}
              disabled={currentIndex === comicPages.length - 1}
              aria-label="次のコマ"
              className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          {/* ページ番号表示 */}
          <div className="text-center mb-4">
            <p className="text-xl md:text-2xl font-bold text-[#4A3424]">
              {currentIndex + 1} / {comicPages.length}
            </p>
          </div>

          {/* ドットインジケーター */}
          <div className="flex justify-center gap-2">
            {comicPages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                aria-label={`${index + 1}コマ目に移動`}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-[#4A3424] scale-125"
                    : "bg-[#4A3424]/30 hover:bg-[#4A3424]/50"
                }`}
              />
            ))}
          </div>
          </div>
        </section>
      </main>

      {/* 作者アイコンボタン（黄色背景の右下に固定、コメントがある場合のみ表示） */}
      {authorComments[currentIndex] && (
        <button
          onClick={toggleAuthorComment}
          aria-label="作者コメントを表示/非表示"
          className="fixed bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 overflow-hidden ring-4 ring-white z-40"
        >
          <Image
            src="/icons/author.png"
            alt="作者アイコン"
            width={64}
            height={64}
            className="object-cover"
          />
        </button>
      )}

      {/* 作者コメント吹き出し（トグル表示） */}
      {isAuthorCommentOpen && authorComments[currentIndex] && (
        <div className="fixed bottom-24 right-6 md:bottom-6 md:right-28 w-[calc(100vw-3rem)] max-w-xs md:max-w-sm z-50">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <p className="text-sm text-neutral-800 leading-relaxed">
              {authorComments[currentIndex]}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
