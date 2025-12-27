"use client";

import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F7CD63] flex flex-col">
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8 md:pt-24 md:pb-12">
        {/* プロフィールカード */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* プロフィール画像 */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-[#4A3424] shadow-lg">
              <Image
                src="/icons/author.png"
                alt="ManeTaizou"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
          </div>

          {/* 名前 */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#4A3424] text-center mb-2">
            ManeTaizou
          </h1>
          <p className="text-lg text-[#4A3424]/70 text-center mb-6">
            デジタルクリエイター
          </p>

          {/* 自己紹介 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#4A3424] mb-4 border-b-2 border-[#4A3424] pb-2">
              自己紹介
            </h2>
            <p className="text-[#4A3424] leading-relaxed whitespace-pre-line">
              子どもの頃の夢は漫画家。遠回りして、半世紀後にやっとスタートできました。
            </p>
          </div>

          {/* SNSリンク */}
          <div>
            <h2 className="text-xl font-bold text-[#4A3424] mb-4 border-b-2 border-[#4A3424] pb-2">
              SNS
            </h2>
            <div className="flex justify-center gap-4">
              <a
                href="https://x.com/Nisaburou_H"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#4A3424] text-[#FFF6D9] rounded-lg hover:scale-105 transition-transform"
              >
                <FaXTwitter className="text-xl" />
                <span>X (Twitter)</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
