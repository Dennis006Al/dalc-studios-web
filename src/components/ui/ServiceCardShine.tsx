"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShineBorder } from "./shine-border";
import { ChevronDown, ChevronUp, BadgeCheck, Star } from "lucide-react";

interface Plan {
  name: string;
  benefits: string[];
}

interface Props {
  title: string;
  description: string;
  plans?: Plan[];
  prices?: string[];
  cta?: string;
  ctaHref?: string;
  shineColor?: string | string[];
  featured?: boolean;
  hideIcon?: boolean;
  defaultOpenPlans?: number[];
}

export default function ServiceCardShine({
  title,
  description,
  plans = [],
  prices = [],
  cta = "Más detalles",
  ctaHref = "#contact",
  shineColor = ["#3b82f6", "#60a5fa", "#93c5fd"],
  featured = false,
  defaultOpenPlans = [],
}: Props) {
  const [openPlan, setOpenPlan] = useState<number | null>(null);

  useEffect(() => {
    const isDesktopXL = window.matchMedia("(min-width: 1025px)").matches;

    if (isDesktopXL && defaultOpenPlans.length > 0) {
      setOpenPlan(defaultOpenPlans[0]);
    } else {
      setOpenPlan(null);
    }
  }, []);

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      const ev = new CustomEvent("select-service", {
        detail: { service: title },
      });
      window.dispatchEvent(ev);

      if (ctaHref.startsWith("#")) {
        const el = document.querySelector(ctaHref);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 50);
        }
      } else {
        window.location.href = ctaHref;
      }
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: featured ? 1.03 : 1.015 }}
      className="relative h-auto isolate"
    >
      {featured && (
        <span
          className="
            absolute -top-4 left-0 z-50
            inline-flex items-center gap-2
            bg-gradient-to-br from-yellow-400 to-yellow-300
            text-black
            border border-yellow-400
            px-3 py-1 rounded-full text-sm font-bold
            shadow-lg transform -rotate-12
            pointer-events-none
          "
          aria-hidden="true"
        >
          <Star size={16} /> Más vendido
        </span>
      )}

      <ShineBorder
        borderWidth={featured ? 3 : 2}
        shineColor={shineColor}
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
      />

      <div
        className={`
          relative z-10 p-7 rounded-2xl flex flex-col
          bg-[#0d111f]/50 backdrop-blur-xl
          border border-white/10 shadow-xl
          ${featured ? "ring-1 ring-blue-500/40" : ""}
        `}
      >
        <header className="mb-6">
          <h3 className={`font-extrabold leading-tight ${featured ? "text-3xl" : "text-2xl"}`}>
            {title}
          </h3>

          <p className="text-gray-300 mt-3 text-sm leading-relaxed">
            {description}
          </p>
        </header>

        {prices.length > 0 && (
          <div className="mb-6">
            {prices.map((price, i) => (
              <span
                key={i}
                className={`inline-block font-extrabold ${featured ? "text-2xl" : "text-xl"}`}
              >
                {price}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-3 flex-grow">
          {plans.map((plan, index) => {
            const isOpen = openPlan === index;

            return (
              <div key={index} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenPlan(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center p-3 text-left"
                >
                  <span className="font-medium text-white">{plan.name}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-3 pt-2 pb-3 border-t border-white/10"
                    >
                      <ul className="space-y-2 text-sm text-gray-300">
                        {plan.benefits.map((b, i) => (
                          <li key={i} className="flex gap-4 mb-2">
                            <BadgeCheck
                              size={16}
                              className="text-blue-400 mt-[2px]"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <a
          href={ctaHref}
          onClick={handleCta}
          className="
            mt-6 w-full text-center py-2.5 rounded-xl font-semibold
            bg-blue-600 hover:bg-blue-700 transition
          "
          aria-label={cta}
        >
          {cta}
        </a>
      </div>
    </motion.article>
  );
}
