"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BookOpen, User, Bell } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: <Home className="w-10 h-10" />,
      label: "ホーム",
      href: "/",
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      label: "作品",
      href: "/comics/shigoto-sagashi",
    },
    {
      icon: <User className="w-10 h-10" />,
      label: "プロフィール",
      href: "/profile",
    },
    {
      icon: <FaXTwitter className="w-10 h-10" />,
      label: "X (Twitter)",
      href: "https://x.com/Nisaburou_H",
      external: true,
    },
    {
      icon: <FaInstagram className="w-10 h-10" />,
      label: "Instagram",
      href: "https://instagram.com/ManeTaizou",
      external: true,
    },
    {
      icon: <Bell className="w-10 h-10" />,
      label: "お知らせ",
      href: "#",
      disabled: true,
    },
  ];

  return (
    <>
      {/* ハンバーガーボタン（モバイル/タブレットのみ表示） */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] shadow-lg hover:scale-110 transition-transform duration-200"
        aria-label="メニューを開く"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* メニューオーバーレイ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 背景オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* メニューコンテンツ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-4 z-50 bg-[#F7CD63] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* ヘッダー */}
              <div className="relative pt-8 pb-6 border-b-4 border-[#4A3424]">
                {/* ロゴ */}
                <div className="flex justify-center mb-2">
                  <Image
                    src="/logo.png"
                    alt="腹巻二三郎"
                    width={200}
                    height={67}
                    className="object-contain"
                  />
                </div>

                {/* 閉じるボタン */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-transform duration-200"
                  aria-label="閉じる"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* グリッドメニュー */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md transition-all duration-200 ${
                            item.disabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:scale-105 hover:shadow-lg"
                          }`}
                        >
                          <div className="text-[#4A3424] mb-3">{item.icon}</div>
                          <span className="text-sm font-bold text-[#4A3424] text-center">
                            {item.label}
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => !item.disabled && setIsOpen(false)}
                          className={`flex flex-col items-center justify-center p-6 rounded-xl bg-white shadow-md transition-all duration-200 ${
                            item.disabled
                              ? "opacity-50 cursor-not-allowed pointer-events-none"
                              : "hover:scale-105 hover:shadow-lg"
                          }`}
                        >
                          <div className="text-[#4A3424] mb-3">{item.icon}</div>
                          <span className="text-sm font-bold text-[#4A3424] text-center">
                            {item.label}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 底部装飾（作者アイコン） */}
              <div className="relative h-24 border-t-4 border-[#4A3424] bg-white/50">
                <div className="absolute bottom-0 right-8 w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#4A3424] shadow-lg">
                  <Image
                    src="/icons/author.png"
                    alt="作者"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
