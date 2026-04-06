"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { LanguageToggle } from "@/components/convertify/language-toggle";
import { useLanguage } from "@/components/convertify/language-provider";
import { LoadingState } from "@/components/convertify/loading-state";
import { ResultsSection } from "@/components/convertify/results-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { translateExistingAnalysis } from "@/lib/mock-analysis";
import { analyzer } from "@/services/analysis/analyzer";
import type { LandingAnalysis } from "@/types/analysis";

export function HeroSection() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<LandingAnalysis | null>(null);
  const [isPending, startTransition] = useTransition();
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const { language, t } = useLanguage();

  const runAnalysis = () => {
    if (!input.trim()) {
      return;
    }

    startTransition(async () => {
      const nextAnalysis = await analyzer.analyze(input.trim(), language);
      setAnalysis(nextAnalysis);
    });
  };

  useEffect(() => {
    if (analysis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis]);

  useEffect(() => {
    setAnalysis((currentAnalysis) => {
      if (!currentAnalysis || currentAnalysis.language === language) {
        return currentAnalysis;
      }

      return translateExistingAnalysis(currentAnalysis, language);
    });
  }, [language]);

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-20 pt-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-sky-300/15 bg-sky-300/8 p-2 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
              <Sparkles className="h-5 w-5 text-sky-200" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-white">
                Convertify
              </p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                {t.product_tagline}
              </p>
            </div>
          </div>
          <LanguageToggle />
        </header>

        <motion.section
          key={language}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="flex flex-1 items-center py-14 sm:py-20"
        >
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-8">
              <SectionHeading
                eyebrow={t.hero_eyebrow}
                title={t.hero_title}
                description={t.hero_subtitle}
              />
              <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  {t.hero_chip_teardown}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  {t.hero_chip_ux}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  {t.hero_chip_design}
                </span>
              </div>
            </div>

            <Card className="relative overflow-hidden p-5 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.18),transparent_40%)]" />
              <div className="relative space-y-5">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
                    {t.input_eyebrow}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {t.input_heading}
                  </h2>
                </div>
                <label className="block">
                  <span className="sr-only">{t.input_sr_label}</span>
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    rows={8}
                    placeholder={t.input_placeholder}
                    className="min-h-56 w-full resize-none rounded-[28px] border border-white/10 bg-slate-950/65 px-5 py-4 text-base leading-7 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-sky-300/40 focus:bg-slate-950"
                  />
                </label>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky-200/70">
                      {t.examples_heading}
                    </p>
                    <p className="text-sm text-slate-400">{t.examples_helper}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {t.example_prompts.map((prompt) => (
                      <motion.button
                        key={prompt}
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setInput(prompt)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-left text-sm leading-6 text-slate-200 transition hover:border-sky-300/30 hover:bg-sky-300/10 hover:text-white"
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-sm leading-6 text-slate-400">
                    {t.helper_copy}
                  </p>
                  <Button
                    type="button"
                    onClick={runAnalysis}
                    disabled={isPending || !input.trim()}
                    className="min-w-48"
                  >
                    {t.button_analyze}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.section>

        <div ref={resultsRef} className="space-y-8">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
              >
                <LoadingState />
              </motion.div>
            ) : analysis ? (
              <ResultsSection key={analysis.id} analysis={analysis} onRegenerate={runAnalysis} />
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 sm:p-10">
                  <p className="text-sm uppercase tracking-[0.28em] text-sky-200/70">
                    {t.preview_eyebrow}
                  </p>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                    {t.preview_body}
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
