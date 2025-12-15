import Image from "next/image";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#F7CD63] text-[#4A3424] py-8 border-t-4 border-black">
      <div className="container mx-auto px-4 text-center">
        {/* ロゴ */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/logo.png"
            alt="腹巻二三郎"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>

        <p className="text-sm text-center">
          © 2025 ManeTaizou
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <a
            href="https://x.com/Nisaburou_H"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="腹巻二三郎公式Xアカウント（別タブで開く）"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A3424] hover:scale-110 hover:shadow-md transition-all duration-200"
          >
            <FaXTwitter className="text-[#FFF6D9] text-xl" />
          </a>
          <a
            href="https://instagram.com/ManeTaizou"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="InstagramでManeTaizouを見る"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#4A3424] hover:scale-110 hover:shadow-md transition-all duration-200"
          >
            <FaInstagram className="text-[#FFF6D9] text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
}
