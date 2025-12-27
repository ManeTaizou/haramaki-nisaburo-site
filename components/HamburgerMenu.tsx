"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BookOpen, User, Bell, Store, Video, Gamepad2, Mail, Users } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: <Home className="w-10 h-10" />,
      href: "/",
    },
    {
      icon: <Bell className="w-10 h-10" />,
      href: "#",
      disabled: true,
    },
    {
      icon: <Users className="w-10 h-10" />,
      href: "#",
      disabled: true,
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      href: "/comics/shigoto-sagashi",
    },
    {
      icon: <Store className="w-10 h-10" />,
      href: "#",
      disabled: true,
    },
    {
      icon: <Video className="w-10 h-10" />,
      href: "#",
      disabled: true,
    },
    {
      icon: <Gamepad2 className="w-10 h-10" />,
      href: "#",
      disabled: true,
    },
    {
      icon: <Mail className="w-10 h-10" />,
      href: "#",
      disabled: true,
    },
    {
      icon: <User className="w-10 h-10" />,
      href: "/profile",
    },
  ];

  return (
    <>
      {/* 固定ヘッダーバー（モバイルのみ） */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#F7CD63] border-b-2 border-[#4A3424] shadow-md">
        <div className="flex items-center justify-center h-[36px] relative">
          {/* ロゴ（中央） */}
          <Link href="/" className="flex items-center mt-[5px]">
            <Image
              src="/logo.png"
              alt="腹巻二三郎"
              width={95}
              height={31}
              className="block"
            />
          </Link>

          {/* ハンバーガーメニューボタン（右端） */}
          <button
            onClick={() => setIsOpen(true)}
            className="absolute right-3 flex items-center text-[#4A3424] hover:opacity-70 transition-opacity duration-200"
            aria-label="メニューを開く"
          >
            <Menu className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* メニュー全画面 */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[38px] left-0 right-0 bottom-0 z-50 bg-[#F7CD63] overflow-hidden flex flex-col"
            >
              {/* ヘッダー */}
              <div className="relative pt-3 pb-2 border-b-2 border-[#4A3424]">
                {/* 閉じるボタン */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#4A3424] text-[#FFF6D9] hover:scale-110 transition-transform duration-200"
                  aria-label="閉じる"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* グリッドメニュー */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center p-4 rounded-lg bg-white shadow-md transition-all duration-200 ${
                            item.disabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:scale-105 hover:shadow-lg"
                          }`}
                        >
                          <div className="text-[#4A3424]">{item.icon}</div>
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => !item.disabled && setIsOpen(false)}
                          className={`flex items-center justify-center p-4 rounded-lg bg-white shadow-md transition-all duration-200 ${
                            item.disabled
                              ? "opacity-50 cursor-not-allowed pointer-events-none"
                              : "hover:scale-105 hover:shadow-lg"
                          }`}
                        >
                          <div className="text-[#4A3424]">{item.icon}</div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
