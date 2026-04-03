"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroForm } from "@/components/hero-form";
import { LanguageToggle } from "@/components/language-toggle";
import { ResultsPanel } from "@/components/results-panel";
import { StatusBanner } from "@/components/status-banner";
import { useLanguage } from "@/lib/i18n/language-context";
import { generateMockConcept } from "@/lib/mocks/generate-concept";
import type { ConceptResult, ToneOption } from "@/types/concept";

type StatusKey = "ready" | "generating" | "generated" | "copied";

export default function HomePage() {
  const { language, t } = useLanguage();
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState<ToneOption>("Techy");
  const [result, setResult] = useState<ConceptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusKey, setStatusKey] = useState<StatusKey>("ready");

  const canGenerate = idea.trim().length >= 12 && !isLoading;
  const status = t.status[statusKey];

  const generatedAt = useMemo(() => {
    if (!result) return null;
    return new Intl.DateTimeFormat(language === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    }).format(new Date(result.generatedAt));
  }, [language, result]);

  useEffect(() => {
    if (!result && !isLoading && statusKey === "generated") {
      setStatusKey("ready");
    }
  }, [isLoading, result, statusKey]);

  async function handleGenerate() {
    if (!canGenerate) return;

    setIsLoading(true);
    setStatusKey("generating");

    try {
      const response = await generateMockConcept({
        idea,
        tone,
        language,
      });

      setResult(response);
      setStatusKey("generated");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;

    const payload = [
      `${t.results.labels.productName}: ${result.product_name}`,
      `${t.results.labels.tagline}: ${result.tagline}`,
      `${t.results.labels.valueProposition}: ${result.value_proposition}`,
      `${t.results.labels.targetAudience}: ${result.target_audience}`,
      `${t.results.labels.coreFeatures}: ${result.core_features.join(", ")}`,
      `${t.results.labels.heroHeadline}: ${result.hero_headline}`,
      `${t.results.labels.heroSubheadline}: ${result.hero_subheadline}`,
      `${t.results.labels.cta}: ${result.cta}`,
    ].join("\n");

    await navigator.clipboard.writeText(payload);
    setStatusKey("copied");
  }

  function handleExampleSelect(value: string) {
    setIdea(value);
    setStatusKey("ready");
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 -mx-4 mb-8 border-b border-white/6 bg-black/20 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-sm font-semibold tracking-[0.18em] text-white shadow-[0_12px_40px_rgba(139,92,246,0.12)]">
                B
              </div>
              <div>
                <div className="text-sm font-medium tracking-[0.18em] text-white/88">
                  {t.header.badge}
                </div>
                <div className="text-xs text-white/40">{t.header.mvp}</div>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm text-white/42 lg:flex">
              <a href="#hero" className="transition-colors duration-300 hover:text-white/80">
                {t.header.nav.product}
              </a>
              <a href="#how-it-works" className="transition-colors duration-300 hover:text-white/80">
                {t.header.nav.workflow}
              </a>
              <a href="#results" className="transition-colors duration-300 hover:text-white/80">
                {t.header.nav.output}
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <LanguageToggle />
            </div>
          </div>
        </header>

        <section id="hero" className="relative flex flex-1 flex-col justify-center pb-14 pt-6 sm:pt-12 lg:pb-20">
          <div className="absolute left-1/2 top-12 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl sm:h-80 sm:w-80" />
          <div className="absolute right-[10%] top-28 h-40 w-40 rounded-full bg-emerald-400/8 blur-3xl" />
          <div className="relative mx-auto w-full max-w-5xl">
            <div className="mb-12 text-center transition-all duration-300 sm:mb-14">
              <p className="mb-5 text-sm uppercase tracking-[0.34em] text-white/45">
                {t.hero.eyebrow}
              </p>
              <h1 className="mx-auto max-w-5xl text-balance text-[3rem] font-semibold leading-[0.92] tracking-tight sm:text-[4.25rem] lg:text-[5.5rem]">
                {t.hero.title}
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-pretty text-base leading-7 text-white/64 sm:text-lg sm:leading-8">
                {t.hero.subtitle}
              </p>
            </div>

            <HeroForm
              idea={idea}
              tone={tone}
              isLoading={isLoading}
              canGenerate={canGenerate}
              exampleIdeas={t.hero.examples}
              onIdeaChange={setIdea}
              onToneChange={setTone}
              onExampleSelect={handleExampleSelect}
              onGenerate={handleGenerate}
            />

            <div className="mt-6">
              <StatusBanner
                status={status}
                isLoading={isLoading}
                generatedAt={generatedAt}
              />
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="relative scroll-mt-28 border-t border-white/6 py-16 sm:py-20"
        >
          <div className="mb-10 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/42">
              {t.howItWorks.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
              {t.howItWorks.title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {t.howItWorks.steps.map((step, index) => (
              <article
                key={step.title}
                className="glass-panel rounded-[1.9rem] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/14 sm:p-7"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-sm font-semibold text-white/82">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/58">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <ResultsPanel
          result={result}
          isLoading={isLoading}
          onCopy={handleCopy}
          onRegenerate={handleGenerate}
        />

        <footer className="mt-16 border-t border-white/6 py-8 sm:mt-20 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-lg font-medium text-white/86">{t.footer.tagline}</p>
              <p className="mt-2 text-sm leading-6 text-white/44">{t.footer.note}</p>
            </div>
            <div className="text-sm text-white/34">Buildify</div>
          </div>
        </footer>
      </div>
    </main>
  );
}
