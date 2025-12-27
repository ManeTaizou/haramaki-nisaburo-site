"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface HotspotProps {
  href: string;
  label: string;
  position: {
    top: string;
    left: string;
  };
  size: {
    width: string;
    height: string;
  };
}

function Hotspot({ href, label, position, size }: HotspotProps) {
  return (
    <Link href={href}>
      <motion.div
        className="absolute cursor-pointer group"
        style={{
          top: position.top,
          left: position.left,
          width: size.width,
          height: size.height,
        }}
        whileHover={{ scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <div className="w-full h-full bg-[color:var(--color-retro-yellow)] opacity-0 group-hover:opacity-30 transition-opacity rounded-lg border-4 border-transparent group-hover:border-black" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-bold border-2 border-white">
            {label}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function StreetScene() {
  const BLIMP_DURATION = 120; // 秒
  const [showBlimp, setShowBlimp] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBlimp(false), BLIMP_DURATION * 1000);
    return () => clearTimeout(timer);
  }, []);

  // const hotspots = [
  //   {
  //     href: "/news",
  //     label: "ガソリンスタンド",
  //     position: { top: "35%", left: "35%" },
  //     size: { width: "30%", height: "35%" },
  //   },
  //   {
  //     href: "/shop",
  //     label: "駄菓子屋",
  //     position: { top: "65%", left: "5%" },
  //     size: { width: "15%", height: "20%" },
  //   },
  //   {
  //     href: "/story",
  //     label: "公園",
  //     position: { top: "40%", left: "5%" },
  //     size: { width: "20%", height: "25%" },
  //   },
  //   {
  //     href: "/about",
  //     label: "建物",
  //     position: { top: "45%", left: "75%" },
  //     size: { width: "20%", height: "30%" },
  //   },
  //   {
  //     href: "/contact",
  //     label: "お問い合わせ",
  //     position: { top: "75%", left: "70%" },
  //     size: { width: "15%", height: "15%" },
  //   },
  // ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[color:var(--color-retro-cream)]">
      <div className="relative w-full min-h-screen">
        <div className="relative w-full h-screen">
          <Image
            src="/top.png"
            alt="腹巻村の街並み - 腹巻商店とポスト"
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0">
            {hotspots.map((hotspot, index) => (
              <Hotspot key={index} {...hotspot} />
            ))}
          </div> */}

          {/* 飛行船アニメーション */}
          {showBlimp && (
            <motion.img
              src="/hikosen.png"
              alt="腹巻二三郎 飛行船"
              className="pointer-events-none select-none absolute top-[1%] left-0 z-10 w-[130px] md:w-[160px] object-contain"
              initial={{ x: "110vw", opacity: 1 }}
              animate={{ x: "-110vw", opacity: 1 }}
              transition={{ duration: BLIMP_DURATION, ease: "linear" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
