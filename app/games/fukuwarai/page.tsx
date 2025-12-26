"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import HamburgerMenu from "@/components/HamburgerMenu";

type PartPosition = {
  x: number;
  y: number;
};

type PartPositions = {
  hidarimayu: PartPosition;
  migimayu: PartPosition;
  hidarime: PartPosition;
  migime: PartPosition;
  hana: PartPosition;
  kuchi: PartPosition;
};

// 完成図の正解座標（500px幅の顔コンテナ基準、PC/モバイル共通）
const PERFECT_POSITIONS: PartPositions = {
  hidarimayu: { x: 180, y: 140 },
  migimayu: { x: 320, y: 140 },
  hidarime: { x: 180, y: 200 },
  migime: { x: 320, y: 200 },
  hana: { x: 250, y: 260 },
  kuchi: { x: 250, y: 340 },
};

// 各パーツのサイズ（width × height）
const PART_SIZES: Record<keyof PartPositions, { width: number; height: number }> = {
  hidarimayu: { width: 95, height: 42 },
  migimayu: { width: 95, height: 42 },
  hidarime: { width: 95, height: 44 },
  migime: { width: 94, height: 44 },
  hana: { width: 87, height: 87 },
  kuchi: { width: 117, height: 82 },
};

// 初期配置（顔画像約y:688までの下、y:710以降に左右2列で整然と配置）
const INITIAL_POSITIONS: PartPositions = {
  hidarimayu: { x: 120, y: 710 },
  migimayu: { x: 300, y: 710 },
  hidarime: { x: 120, y: 780 },
  migime: { x: 300, y: 780 },
  hana: { x: 120, y: 850 },
  kuchi: { x: 300, y: 850 },
};

export default function FukuwaraiPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const [positions, setPositions] = useState<PartPositions>(INITIAL_POSITIONS);
  const [score, setScore] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const gameBoardRef = useRef<HTMLDivElement>(null);

  // 画面サイズを検知してスケールを計算
  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setScale(Math.min(1, window.innerWidth / 540));
      } else {
        setScale(1);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 初回読み込み時のテスト
  useEffect(() => {
    console.log("=== 初期状態テスト ===");
    console.log("初期位置:", INITIAL_POSITIONS.kuchi);
    console.log("完璧位置:", PERFECT_POSITIONS.kuchi);
    console.log("口のサイズ:", PART_SIZES.kuchi);

    // 初期状態での重なりをテスト
    const testOverlap = calculateOverlapArea(
      { x: PERFECT_POSITIONS.kuchi.x, y: PERFECT_POSITIONS.kuchi.y, width: 117, height: 82 },
      { x: INITIAL_POSITIONS.kuchi.x, y: INITIAL_POSITIONS.kuchi.y, width: 117, height: 82 }
    );
    console.log("初期状態での口の重なり面積:", testOverlap);
    console.log("期待値: 0 (初期位置は完璧位置と重ならないはず)");

    // 完璧位置同士の重なりをテスト
    const testPerfect = calculateOverlapArea(
      { x: PERFECT_POSITIONS.kuchi.x, y: PERFECT_POSITIONS.kuchi.y, width: 117, height: 82 },
      { x: PERFECT_POSITIONS.kuchi.x, y: PERFECT_POSITIONS.kuchi.y, width: 117, height: 82 }
    );
    console.log("完璧位置同士の重なり面積:", testPerfect);
    console.log("期待値:", 117 * 82, "(完全一致)");
    console.log("==================\n");
  }, []);

  const handleDragEnd = (partName: keyof PartPositions, info: any) => {
    const oldPos = positions[partName];
    const newPos = {
      x: oldPos.x + info.offset.x,
      y: oldPos.y + info.offset.y,
    };
    console.log(`ドラッグ終了 [${partName}]: (${oldPos.x}, ${oldPos.y}) → (${newPos.x.toFixed(1)}, ${newPos.y.toFixed(1)})`);

    setPositions((prev) => ({
      ...prev,
      [partName]: newPos,
    }));
  };

  // 2つの矩形の重なり面積を計算
  const calculateOverlapArea = (
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number }
  ): number => {
    const x1 = Math.max(rect1.x, rect2.x);
    const y1 = Math.max(rect1.y, rect2.y);
    const x2 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width);
    const y2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);

    if (x2 <= x1 || y2 <= y1) {
      return 0; // 重なりなし
    }

    return (x2 - x1) * (y2 - y1);
  };

  const calculateScore = () => {
    let totalOverlapPercentage = 0;

    console.log("=== 採点開始 ===");
    console.table(positions);

    Object.keys(PERFECT_POSITIONS).forEach((key) => {
      const partName = key as keyof PartPositions;
      const perfect = PERFECT_POSITIONS[partName];
      const current = positions[partName];
      const size = PART_SIZES[partName];

      // 完璧な位置の矩形
      const perfectRect = {
        x: perfect.x,
        y: perfect.y,
        width: size.width,
        height: size.height,
      };

      // 現在の位置の矩形
      const currentRect = {
        x: current.x,
        y: current.y,
        width: size.width,
        height: size.height,
      };

      // 重なり面積を計算
      const overlapArea = calculateOverlapArea(perfectRect, currentRect);
      const totalArea = size.width * size.height;
      const overlapPercentage = (overlapArea / totalArea) * 100;

      console.log(`${partName}: ${overlapPercentage.toFixed(1)}%`);

      totalOverlapPercentage += overlapPercentage;
    });

    // 6パーツの平均重なり率が得点
    const score = totalOverlapPercentage / 6;
    console.log(`最終: ${score.toFixed(1)}点`);
    console.log("===============\n");

    return Math.round(score);
  };

  const handleScore = () => {
    const calculatedScore = calculateScore();
    setScore(calculatedScore);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3000);
  };

  const handleReset = () => {
    setPositions(INITIAL_POSITIONS);
    setScore(null);
    setIsAnimating(false);
  };

  // テスト用：完璧な位置に配置
  const handleSetPerfect = () => {
    console.log("完璧な位置に配置");
    setPositions(PERFECT_POSITIONS);
    setScore(null);
    setIsAnimating(false);
  };

  const getReaction = (score: number) => {
    if (score === 100) {
      return { text: "完璧や！わて、感激やで！", emoji: "🎉" };
    } else if (score >= 80) {
      return { text: "もうちょいやな〜", emoji: "😊" };
    } else if (score >= 50) {
      return { text: "わてのことまだわかっとらんな", emoji: "🤔" };
    } else {
      return { text: "これは…わてか？", emoji: "😱" };
    }
  };

  return (
    <div className="min-h-screen bg-[#F7CD63] flex flex-col">
      <HamburgerMenu />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#4A3424] text-center mb-8">
          二三郎の福笑い
        </h1>

        <div className="max-w-4xl mx-auto">
          {/* ゲームエリア */}
          <div className="relative bg-white rounded-2xl shadow-lg border-4 border-[#4A3424] p-8">
            {/* ゲームボード */}
            <div
              ref={gameBoardRef}
              className="relative mx-auto"
              style={{
                width: "500px",
                height: "900px",
                maxWidth: "100%",
                transform: `scale(${scale})`,
                transformOrigin: "top center",
              }}
            >
              {/* レイヤー1: 顔ベース */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  width: "500px",
                  height: "700px",
                  zIndex: 1,
                }}
              >
                <Image
                  src="/game/fukuwarai/atama.png"
                  alt="顔ベース"
                  fill
                  className="object-contain pointer-events-none"
                />
              </div>

              {/* レイヤー2: ドラッグ可能なパーツ */}
              <div className="absolute inset-0" style={{ zIndex: 2 }}>
                {/* 左眉 */}
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(e, info) => handleDragEnd("hidarimayu", info)}
                  animate={{
                    x: positions.hidarimayu.x,
                    y: positions.hidarimayu.y,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  style={{
                    position: "absolute",
                    cursor: "grab",
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <Image
                    src="/game/fukuwarai/hidarimayu.png"
                    alt="左眉"
                    width={95}
                    height={42}
                    className="pointer-events-none"
                    unoptimized
                  />
                </motion.div>

                {/* 右眉 */}
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(e, info) => handleDragEnd("migimayu", info)}
                  animate={{
                    x: positions.migimayu.x,
                    y: positions.migimayu.y,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  style={{
                    position: "absolute",
                    cursor: "grab",
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <Image
                    src="/game/fukuwarai/migimayu.png"
                    alt="右眉"
                    width={95}
                    height={42}
                    className="pointer-events-none"
                    unoptimized
                  />
                </motion.div>

                {/* 左目 */}
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(e, info) => handleDragEnd("hidarime", info)}
                  animate={{
                    x: positions.hidarime.x,
                    y: positions.hidarime.y,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  style={{
                    position: "absolute",
                    cursor: "grab",
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <Image
                    src="/game/fukuwarai/hidarime.png"
                    alt="左目"
                    width={95}
                    height={44}
                    className="pointer-events-none"
                    unoptimized
                  />
                </motion.div>

                {/* 右目 */}
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(e, info) => handleDragEnd("migime", info)}
                  animate={{
                    x: positions.migime.x,
                    y: positions.migime.y,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  style={{
                    position: "absolute",
                    cursor: "grab",
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <Image
                    src="/game/fukuwarai/migime.png"
                    alt="右目"
                    width={94}
                    height={44}
                    className="pointer-events-none"
                    unoptimized
                  />
                </motion.div>

                {/* 鼻 */}
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(e, info) => handleDragEnd("hana", info)}
                  animate={{
                    x: positions.hana.x,
                    y: positions.hana.y,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  style={{
                    position: "absolute",
                    cursor: "grab",
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <Image
                    src="/game/fukuwarai/hana.png"
                    alt="鼻"
                    width={87}
                    height={87}
                    className="pointer-events-none"
                    unoptimized
                  />
                </motion.div>

                {/* 口 */}
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0}
                  onDragEnd={(e, info) => handleDragEnd("kuchi", info)}
                  animate={{
                    x: positions.kuchi.x,
                    y: positions.kuchi.y,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 50 }}
                  style={{
                    position: "absolute",
                    cursor: "grab",
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <Image
                    src="/game/fukuwarai/kuchi.png"
                    alt="口"
                    width={117}
                    height={82}
                    className="pointer-events-none"
                    unoptimized
                  />
                </motion.div>
              </div>

              {/* スコア表示とリアクション */}
              {score !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white border-4 border-[#4A3424] rounded-xl p-4 shadow-lg"
                  style={{ zIndex: 10 }}
                >
                  <div className="text-center">
                    <p className="text-4xl font-black text-[#4A3424] mb-2">
                      {score}点
                    </p>
                    <div className="flex items-center gap-2 justify-center">
                      <span className="text-2xl">{getReaction(score).emoji}</span>
                      <p className="font-black text-[#4A3424]">
                        {getReaction(score).text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* ボタン */}
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <button
                onClick={handleScore}
                disabled={isAnimating}
                className="bg-[#4A3424] text-[#FFF6D9] px-8 py-3 rounded-lg font-black text-lg hover:bg-[#4A3424]/90 transition-colors disabled:opacity-50"
              >
                採点する
              </button>
              <button
                onClick={handleReset}
                className="bg-white text-[#4A3424] border-2 border-[#4A3424] px-8 py-3 rounded-lg font-black text-lg hover:bg-[#FFF6D9] transition-colors"
              >
                リセット
              </button>
              <button
                onClick={handleSetPerfect}
                className="bg-blue-500 text-white border-2 border-blue-700 px-6 py-3 rounded-lg font-black text-sm hover:bg-blue-600 transition-colors"
              >
                完璧配置（テスト）
              </button>
            </div>
          </div>

          {/* 遊び方説明 */}
          <div className="mt-8 bg-white rounded-xl border-4 border-[#4A3424] p-6">
            <h2 className="text-xl font-black text-[#4A3424] mb-4">遊び方</h2>
            <ul className="space-y-2 text-[#4A3424] font-bold">
              <li>1. 顔のパーツをドラッグして正しい位置に配置してください</li>
              <li>2. 「採点する」ボタンを押すと点数が表示されます</li>
              <li>3. 100点満点を目指してチャレンジ！</li>
              <li className="text-sm text-[#4A3424]/70 mt-4">
                ※完全にピッタリ重ならないと100点は出ません。1pxでもズレたら99点以下です！
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
