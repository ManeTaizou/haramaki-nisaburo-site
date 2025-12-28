import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#F7CD63] text-[#4A3424] py-4 border-t-4 border-black">
      <div className="container mx-auto px-4 text-center">
        {/* ロゴ */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="腹巻二三郎"
              width={150}
              height={50}
              className="object-contain cursor-pointer hover:opacity-80 transition-opacity duration-200"
            />
          </Link>
        </div>

        {/* SNSアイコン */}
        <div className="mt-4 mb-4 flex justify-center gap-4">
          <a
            href="https://x.com/Nisaburou_H"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="腹巻二三郎 Xアカウント（別タブで開く）"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF6D9] hover:scale-110 hover:shadow-md transition-all duration-200"
          >
            <FaXTwitter className="text-[#4A3424] text-base" />
          </a>
          <a
            href="https://instagram.com/nisaburou_h"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagramでnisaburou_hを見る"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF6D9] hover:scale-110 hover:shadow-md transition-all duration-200"
          >
            <FaInstagram className="text-[#4A3424] text-base" />
          </a>
          <a
            href="https://www.tiktok.com/@nisaburou"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTokでnisaburouを見る"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FFF6D9] hover:scale-110 hover:shadow-md transition-all duration-200"
          >
            <FaTiktok className="text-[#4A3424] text-base" />
          </a>
        </div>

        {/* フッターリンク */}
        <div className="mb-3 flex justify-center gap-4">
          <Link href="/contact" className="text-xs text-[#4A3424] hover:underline font-bold">
            お問い合わせ
          </Link>
          <span className="text-xs text-[#4A3424]">|</span>
          <Link href="/privacy-policy" className="text-xs text-[#4A3424] hover:underline font-bold">
            プライバシーポリシー
          </Link>
        </div>

        <p className="text-sm text-center">
          © 2025 KOTOMANE STUDIO
        </p>
      </div>
    </footer>
  );
}
