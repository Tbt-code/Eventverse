"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Section({ children, className = "", delay = 0 }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`w-full max-w-[1000px] mx-auto px-6 py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function HeroTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
      {children}
    </h1>
  );
}