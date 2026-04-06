"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/convertify/language-provider";

export function LoadingState() {
  const { t } = useLanguage();

  return (
    <div className="rounded-3xl border border-sky-300/15 bg-sky-300/6 p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-2.5 w-2.5 rounded-full bg-sky-300"
              animate={{ y: [0, -8, 0], opacity: [0.45, 1, 0.45] }}
              transition={{
                duration: 0.9,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.14
              }}
            />
          ))}
        </div>
        <p className="text-sm text-slate-300 sm:text-base">
          {t.loading}
        </p>
      </div>
    </div>
  );
}
