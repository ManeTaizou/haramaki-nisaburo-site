import Image from "next/image";
import Link from "next/link";
import { FaXTwitter, FaInstagram, FaLine } from "react-icons/fa6";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--color-retro-cream)] border-b-4 border-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-1" />

        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <Image
            src="/logo.png"
            alt="腹巻二三郎"
            width={180}
            height={60}
            priority
            className="h-auto w-auto max-h-16"
          />
        </Link>

        <div className="flex-1 flex justify-end gap-3 items-center">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-[color:var(--color-retro-orange)] transition-all hover:scale-110 border-2 border-black"
            aria-label="X (Twitter)"
          >
            <FaXTwitter className="text-white text-lg" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:scale-110 transition-all border-2 border-black"
            aria-label="Instagram"
          >
            <FaInstagram className="text-white text-lg" />
          </a>
          <a
            href="https://line.me"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#06C755] hover:bg-[color:var(--color-retro-green)] transition-all hover:scale-110 border-2 border-black"
            aria-label="LINE"
          >
            <FaLine className="text-white text-lg" />
          </a>
        </div>
      </div>
    </header>
  );
}
