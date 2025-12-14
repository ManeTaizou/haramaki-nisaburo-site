"use client";

import { useState, useEffect, useRef } from "react";
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
    "内緒にしとってや。",
    "わて、背ぇ伸びたんやろか。",
    "あんた、相撲やっとったんか？",
    "足、冷たいなぁ。",
    "マスクの脇からからチラ見。",
    "プロバイダってなんのことでござる？",
    "面接なしって、どゆこと？",
    "スッパイダーマンの格好でもええの？",
    "クロッキーの意味、教えて〜な。",
    "床屋、苦手やねん...。",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthorCommentOpen, setIsAuthorCommentOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const showAuthorComment = () => {
    setIsAuthorCommentOpen(true);
  };

  const hideAuthorComment = () => {
    setIsAuthorCommentOpen(false);
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

  // スワイプ機能（方向判定付き）
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      isHorizontalSwipe.current = null; // リセット
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX.current = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;

      // 方向がまだ判定されていない場合
      if (isHorizontalSwipe.current === null) {
        const deltaX = Math.abs(touchEndX.current - touchStartX.current);
        const deltaY = Math.abs(touchCurrentY - touchStartY.current);

        // 一定以上の動きがあれば方向を判定（10px以上）
        if (deltaX > 10 || deltaY > 10) {
          isHorizontalSwipe.current = deltaX > deltaY;
        }
      }

      // 横スワイプの場合は縦スクロールを防止
      if (isHorizontalSwipe.current === true) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      // 横スワイプの場合のみコマ送り
      if (isHorizontalSwipe.current === true) {
        const diff = touchStartX.current - touchEndX.current;

        // 右→左へ50px以上スワイプで次へ
        if (diff > 50) {
          goToNext();
        }
        // 左→右へ50px以上スワイプで前へ
        else if (diff < -50) {
          goToPrevious();
        }
      }

      // リセット
      isHorizontalSwipe.current = null;
    };

    const imageContainer = document.getElementById('comic-container');
    if (imageContainer) {
      imageContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      imageContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
      imageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (imageContainer) {
        imageContainer.removeEventListener('touchstart', handleTouchStart);
        imageContainer.removeEventListener('touchmove', handleTouchMove);
        imageContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex]);

  // キーボード操作対応（PC）
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
      <main className="flex-1 relative">
        {/* カルーセルセクション */}
        <section className="flex items-center justify-center py-8 md:py-12">
          <div className="w-full px-0 md:px-4 flex justify-center">
            {/* 画像表示エリア（スマホ：白カードなし全幅、iPad/PC：白カードあり） */}
            <div className="relative bg-transparent md:bg-white rounded-none md:rounded-2xl shadow-none md:shadow-lg px-0 md:px-8 py-0 md:py-8 w-full max-w-full md:max-w-4xl">
              <div
                id="comic-container"
                className="relative w-full aspect-[1080/1350] md:aspect-auto md:h-[600px] mx-auto overflow-hidden"
              >
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
                      {/* スマホ版: 通常のImage */}
                      <Image
                        src={page.src}
                        alt={page.alt}
                        fill
                        sizes="100vw"
                        className="object-contain md:object-contain"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* 矢印ボタン（iPad/PCのみ表示） */}
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                aria-label="前のコマ"
                className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={goToNext}
                disabled={currentIndex === comicPages.length - 1}
                aria-label="次のコマ"
                className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-all duration-200 disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-md"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </section>

        {/* iPad/PC版：アイコンの横に固定の吹き出し */}
        {isAuthorCommentOpen && authorComments[currentIndex] && (
          <div className="hidden md:block absolute bottom-6 right-48 max-w-sm z-50">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-sm text-neutral-800 leading-relaxed">
                {authorComments[currentIndex]}
              </p>
            </div>
          </div>
        )}

        {/* ドットインジケーター */}
        <div className="flex justify-center gap-2 pb-20 md:pb-16">
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

        {/* スマホ版：アイコンと吹き出し（ドットの下） */}
        {authorComments[currentIndex] && (
          <div className="block md:hidden w-[90%] mx-auto pb-10">
            <div className="flex items-center gap-3 justify-end">
              {/* 吹き出し */}
              <div className={`flex-1 bg-white rounded-lg shadow-lg p-4 min-h-[80px] flex items-center transition-opacity duration-200 ${
                isAuthorCommentOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {authorComments[currentIndex]}
                </p>
              </div>

              {/* アイコンボタン */}
              <button
                onMouseDown={showAuthorComment}
                onMouseUp={hideAuthorComment}
                onMouseLeave={hideAuthorComment}
                onDragStart={(e) => { e.preventDefault(); hideAuthorComment(); }}
                onDrag={hideAuthorComment}
                onTouchStart={showAuthorComment}
                onTouchEnd={hideAuthorComment}
                onTouchCancel={hideAuthorComment}
                onTouchMove={hideAuthorComment}
                onContextMenu={(e) => e.preventDefault()}
                aria-label="作者コメントを表示/非表示"
                className="flex-shrink-0 w-14 h-14 rounded-full shadow-lg overflow-hidden ring-4 ring-white select-none"
                style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                draggable={false}
              >
                <Image
                  src="/icons/author.png"
                  alt="作者アイコン"
                  width={64}
                  height={64}
                  className="object-cover pointer-events-none select-none"
                  style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                />
              </button>
            </div>
          </div>
        )}

        {/* 作者アイコンボタン（iPad/PC版のみ：コンテンツエリア右下に配置） */}
        {authorComments[currentIndex] && (
          <button
            onMouseDown={showAuthorComment}
            onMouseUp={hideAuthorComment}
            onMouseLeave={hideAuthorComment}
            onDragStart={(e) => { e.preventDefault(); hideAuthorComment(); }}
            onDrag={hideAuthorComment}
            onTouchStart={showAuthorComment}
            onTouchEnd={hideAuthorComment}
            onTouchCancel={hideAuthorComment}
            onTouchMove={hideAuthorComment}
            onContextMenu={(e) => e.preventDefault()}
            aria-label="作者コメントを表示/非表示"
            className="hidden md:block absolute bottom-6 right-28 w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 overflow-hidden ring-4 ring-white z-40 select-none"
            style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            draggable={false}
          >
            <Image
              src="/icons/author.png"
              alt="作者アイコン"
              width={64}
              height={64}
              className="object-cover pointer-events-none select-none"
              style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
            />
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}
