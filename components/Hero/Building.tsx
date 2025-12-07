"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BuildingProps {
  href: string;
  label: string;
  color: string;
  shape: "rectangle" | "circle" | "trapezoid" | "ellipse";
  size: {
    width: number;
    height: number;
  };
  position: {
    top: string;
    left: string;
  };
}

export default function Building({
  href,
  label,
  color,
  shape,
  size,
  position,
}: BuildingProps) {
  const shapeClasses = {
    rectangle: "rounded-lg",
    circle: "rounded-full",
    trapezoid: "rounded-b-lg",
    ellipse: "rounded-full",
  };

  return (
    <Link href={href}>
      <motion.div
        className={`absolute cursor-pointer border-4 border-black ${shapeClasses[shape]} flex items-center justify-center shadow-lg`}
        style={{
          backgroundColor: color,
          width: `${size.width}px`,
          height: `${size.height}px`,
          top: position.top,
          left: position.left,
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <span className="text-black font-bold text-sm md:text-base text-center px-2">
          {label}
        </span>
      </motion.div>
    </Link>
  );
}
