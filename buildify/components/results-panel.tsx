import { Copy, RefreshCcw } from "lucide-react";
import { ResultCard } from "@/components/result-card";
import { SkeletonCard } from "@/components/skeleton-card";
import { useLanguage } from "@/lib/i18n/language-context";
import type { ConceptResult } from "@/types/concept";

type ResultsPanelProps = {
  result: ConceptResult | null;
  isLoading: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
};

export function ResultsPanel({
  result,
  isLoading,
  onCopy,
  onRegenerate,
}: ResultsPanelProps) {
  const { t } = useLanguage();

  return (
    <section id="results" className="mt-16 scroll-mt-28 sm:mt-20">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-white/45">{t.results.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.8rem]">
            {t.results.title}
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCcw className="h-4 w-4" />
            {t.results.regenerate}
          </button>
          <button
            type="button"
            onClick={onCopy}
            disabled={!result || isLoading}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white px-4 py-2 text-sm text-black transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35"
          >
            <Copy className="h-4 w-4" />
            {t.results.copy}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 7 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : result ? (
        <div className="grid animate-[fadeUp_560ms_ease-out] gap-4 md:grid-cols-2 xl:grid-cols-3">
          <ResultCard label={t.results.labels.productName} value={result.product_name} />
          <ResultCard label={t.results.labels.tagline} value={result.tagline} />
          <ResultCard
            label={t.results.labels.valueProposition}
            value={result.value_proposition}
            className="xl:col-span-2"
          />
          <ResultCard label={t.results.labels.targetAudience} value={result.target_audience} />
          <ResultCard
            label={t.results.labels.coreFeatures}
            list={result.core_features}
            className="xl:col-span-2"
          />
          <ResultCard label={t.results.labels.heroHeadline} value={result.hero_headline} />
          <ResultCard
            label={t.results.labels.heroSubheadline}
            value={result.hero_subheadline}
            className="md:col-span-2"
          />
          <ResultCard label={t.results.labels.cta} value={result.cta} />
        </div>
      ) : (
        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-lg text-white/70 shadow-[0_16px_48px_rgba(139,92,246,0.12)]">
              B
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t.results.emptyTitle}
            </h3>
            <p className="mt-4 text-base leading-7 text-white/58 sm:text-lg">
              {t.results.emptyHint}
            </p>
            <p className="mt-6 text-sm uppercase tracking-[0.22em] text-white/32">
              {t.results.empty}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
