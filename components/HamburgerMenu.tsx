"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, BookOpen, User, Bell, Store, Video, Gamepad2, Mail, Users } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // メニューが開いている時は背景のスクロールを無効化
  useEffect(() => {
    if (isOpen) {
      // スクロール位置を保存
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // スクロール位置を復元
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // クリーンアップ
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-3 flex items-center text-[#4A3424] hover:opacity-70 transition-opacity duration-200 z-[60]"
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {isOpen ? (
              <X className="w-6 h-6" strokeWidth={2.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={2.5} />
            )}
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
              className="fixed top-[38px] left-0 right-0 bottom-0 z-50 bg-[#F7CD63] overflow-y-auto flex flex-col"
            >
              {/* グリッドメニュー */}
              <div className="flex-1 p-4">
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  {menuItems.map((item, index) => (
                    <div key={index}>
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
