"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  price: string;
  releaseDate: string;
  image: string;
  description: string;
  specs?: string[];
  note?: string;
}

export default function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [supportCount, setSupportCount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const products: Product[] = [
    {
      id: "choumetal-nisaburo",
      name: "超メタル「腹巻二三郎」",
      price: "¥23,600(税込)",
      releaseDate: "2035年頃",
      image: "/IMG_4829.png",
      description:
        "全高174mm（1/10スケール）、15箇所以上の可動を実現した超精密ダイキャストフィギュア。腹巻は取り外し可能で、様々なポーズを楽しめます。",
      specs: [
        "全高：約174mm（1/10スケール）",
        "可動箇所：15箇所以上",
        "素材：ダイキャスト、ABS、PVC",
        "付属品：専用台座、交換用手パーツ×3種（グー、チョキ、パー）",
      ],
      note: "※発売時期はみんなの応援次第でめっちゃ早まる可能性あり",
    },
    {
      id: "yojigen-haramaki",
      name: "四次元はらまき",
      price: "¥2,360(税込)",
      releaseDate: "みんなの応援次第",
      image: "/placeholder-haramaki.jpg",
      description:
        "二三郎イエロー、まるで夢のよう。なんと腹巻からなんでも出てきます（腹巻に入るものだけど）。",
      specs: [
        "カラー：二三郎イエロー",
        "サイズ：フリーサイズ",
        "素材：伸縮性ポリエステル、四次元ポケット素材",
        "収納可能サイズ：腹巻に入るものまで",
      ],
      note: "※実際の四次元収納機能はありません\n※本商品は架空の商品です。実際の商品化予定はありません。",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7CD63] flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 min-h-[calc(100vh-200px)]">
        {/* ヘッダー */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#4A3424] mb-4">
            腹巻商店
          </h1>
          <p className="text-[#4A3424]/70 font-bold">
            ※こちらは架空のオンラインショップです
          </p>
        </div>

        {/* 商品ラインナップ */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl font-black text-[#4A3424] mb-6 md:mb-10 text-center">
            ラインナップ
          </h2>

          {/* 商品グリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto pb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-[#4A3424] hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* 商品画像 */}
                <div className="relative aspect-square bg-[#FFF6D9] m-4 rounded-2xl p-4">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* 商品情報 */}
                <div className="p-4">
                  <h3 className="font-black text-[#4A3424] mb-2 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#4A3424]/70 font-bold mb-1">
                    価格：{product.price}
                  </p>
                  <p className="text-xs text-[#4A3424]/70 font-bold">
                    発売時期：{product.releaseDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 商品詳細モーダル */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* 背景オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedProduct(null)}
            />

            {/* モーダルコンテンツ */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl max-h-[90vh] md:max-h-[85vh] bg-white rounded-t-3xl md:rounded-2xl shadow-2xl z-50 flex flex-col"
            >
              {/* ヘッダー */}
              <div className="relative flex-shrink-0 px-6 pt-4 pb-2 border-b border-gray-200">
                {/* モバイル用ハンドル */}
                <div className="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>

                {/* 閉じるボタン */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-transform z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* 商品名（ヘッダー内） */}
                <h2 className="text-xl md:text-2xl font-black text-[#4A3424] pr-12">
                  {selectedProduct.name}
                </h2>
              </div>

              {/* コンテンツエリア（モバイル: 縦、PC: 横2カラム） */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  {/* 左カラム: 商品画像（PC時） */}
                  <div className="md:w-1/2 flex-shrink-0">
                    <div className="relative aspect-square bg-[#FFF6D9] rounded-2xl p-4 md:p-8">
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 右カラム: 商品情報（PC時） */}
                  <div className="md:w-1/2 flex flex-col">
                    {/* 価格・発売時期 */}
                    <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b-2 border-[#4A3424]">
                      <div>
                        <span className="text-sm text-[#4A3424]/70 font-bold">
                          ■{selectedProduct.id === "choumetal-nisaburo" ? "妄想価格" : "価格"}：
                        </span>
                        <span className="font-black text-[#4A3424] ml-1">
                          {selectedProduct.price}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-[#4A3424]/70 font-bold">
                          ■発売時期：
                        </span>
                        <span className="font-black text-[#4A3424] ml-1">
                          {selectedProduct.releaseDate}
                        </span>
                      </div>
                    </div>

                    {/* 商品説明 */}
                    <div className="mb-4">
                      <p className="text-sm md:text-base text-[#4A3424] leading-relaxed whitespace-pre-line font-bold">
                        {selectedProduct.description}
                      </p>
                    </div>

                    {/* スペック */}
                    {selectedProduct.specs && (
                      <div className="mb-4">
                        <h3 className="font-black text-[#4A3424] mb-2">
                          【スペック】
                        </h3>
                        <ul className="space-y-1">
                          {selectedProduct.specs.map((spec, index) => (
                            <li key={index} className="text-xs md:text-sm text-[#4A3424] font-bold">
                              • {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 注意書き */}
                    {selectedProduct.note && (
                      <div className="bg-[#FFF6D9] border-2 border-[#4A3424] rounded-lg p-3 md:p-4 mb-4">
                        <p className="text-xs text-[#4A3424] whitespace-pre-line font-bold">
                          {selectedProduct.note}
                        </p>
                      </div>
                    )}

                    {/* 購入ボタン / 応援ボタン */}
                    {selectedProduct.id === "choumetal-nisaburo" ? (
                      <div className="mt-auto">
                        <button
                          onClick={() => setIsPopupOpen(true)}
                          className="w-full bg-[#4A3424] text-[#FFF6D9] py-3 md:py-4 rounded-lg font-black text-base md:text-lg hover:bg-[#4A3424]/90 transition-colors flex items-center justify-center gap-2 mb-3"
                        >
                          <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                          商品化を応援する（投票）
                        </button>
                        <div className="text-center">
                          <span className="text-sm md:text-base font-black text-[#4A3424]">
                            【現在の応援数 {supportCount.toString().padStart(2, '0')} 人】
                          </span>
                        </div>
                      </div>
                    ) : (
                      <button className="w-full bg-[#4A3424] text-[#FFF6D9] py-3 md:py-4 rounded-lg font-black text-base md:text-lg hover:bg-[#4A3424]/90 transition-colors flex items-center justify-center gap-2 mt-auto">
                        <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                        購入する（準備中）
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 応援ポップアップ */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* 背景オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsPopupOpen(false)}
            />

            {/* ポップアップコンテンツ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6"
            >
              {/* 閉じるボタン */}
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ポップアップ内容（後で変更予定） */}
              <div className="text-center pt-4">
                <h3 className="text-2xl font-black text-[#4A3424] mb-4">
                  ネタバラシページ
                </h3>
                <p className="text-[#4A3424] font-bold mb-6">
                  ここにポップアップの内容が入ります
                </p>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-[#4A3424] text-[#FFF6D9] px-6 py-3 rounded-lg font-black hover:bg-[#4A3424]/90 transition-colors"
                >
                  閉じる
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
