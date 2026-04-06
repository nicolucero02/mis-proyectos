"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, RotateCcw } from "lucide-react";
import { useLanguage } from "@/components/convertify/language-provider";
import { ResultCard } from "@/components/convertify/result-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { LandingAnalysis } from "@/types/analysis";

interface ResultsSectionProps {
  analysis: LandingAnalysis;
  onRegenerate: () => void;
}

export function ResultsSection({
  analysis,
  onRegenerate
}: ResultsSectionProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  async function handleCopy() {
    const formatted = [
      `${t.first_impression}: ${analysis.first_impression}`,
      "",
      `${t.ux_issues}:`,
      ...analysis.ux_issues.map((item) => `- ${item}`),
      "",
      `${t.conversion_issues}:`,
      ...analysis.conversion_issues.map((item) => `- ${item}`),
      "",
      `${t.design_feedback}:`,
      ...analysis.design_feedback.map((item) => `- ${item}`),
      "",
      `${t.improvement_suggestions}:`,
      ...analysis.improvement_suggestions.map((item) => `- ${item}`)
    ].join("\n");

    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-sky-200/70">
            {t.results_eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">
            {t.results_title}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={onRegenerate}>
            <RotateCcw className="mr-2 h-4 w-4" />
            {t.button_regenerate}
          </Button>
          <Button variant="secondary" onClick={handleCopy}>
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? t.button_copied : t.button_copy}
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-sky-300/20 bg-[linear-gradient(135deg,rgba(10,14,30,0.96),rgba(14,25,52,0.92))] p-7 sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_35%)]" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">
            {t.first_impression}
          </p>
          <p className="mt-4 max-w-4xl font-display text-2xl leading-9 text-white sm:text-3xl sm:leading-11">
            {analysis.first_impression}
          </p>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <ResultCard title={t.ux_issues} items={analysis.ux_issues} />
        <ResultCard title={t.conversion_issues} items={analysis.conversion_issues} />
        <ResultCard title={t.design_feedback} items={analysis.design_feedback} />
        <ResultCard title={t.improvement_suggestions} items={analysis.improvement_suggestions} />
      </div>
    </motion.section>
  );
}
