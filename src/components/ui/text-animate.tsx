"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextAnimateProps {
  children: string;
  className?: string;
  animation?: "blurInUp" | "fadeIn" | "slideInUp";
  delay?: number;
  once?: boolean;
}

export function TextAnimate({
  children,
  className,
  animation = "blurInUp",
  delay = 0.05,
  once = true,
}: TextAnimateProps) {
  const animations = {
    blurInUp: {
      initial: { filter: "blur(8px)", opacity: 0, y: 10 },
      animate: { filter: "blur(0px)", opacity: 1, y: 0 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    slideInUp: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 }
    }
  };

  return (
    <motion.span
      initial="initial"
      animate="animate"
      variants={animations[animation]}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }}
      viewport={{ once }}
      className={cn("text-white", className)}
    >
      {children}
    </motion.span>
  );
}