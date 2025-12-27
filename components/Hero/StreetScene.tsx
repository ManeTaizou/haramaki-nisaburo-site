"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function StreetScene() {
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
        </div>
      </div>
    </section>
  );
}
