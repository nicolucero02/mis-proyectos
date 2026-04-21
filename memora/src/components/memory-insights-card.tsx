import { Brain, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getEmotionStyle } from '../lib/emotions'
import { getEmotionLabel } from '../lib/i18n-helpers'
import type { MemoryEmotion } from '../types/memory'

interface MemoryInsightsCardProps {
  dominantEmotion: MemoryEmotion | null
  summary: string
}

export function MemoryInsightsCard({
  dominantEmotion,
  summary,
}: MemoryInsightsCardProps) {
  const { t } = useTranslation()
  const emotionStyle = dominantEmotion
    ? getEmotionStyle(dominantEmotion)
    : null

  return (
    <section className="mb-6 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_20px_60px_rgba(160,140,122,0.12)] backdrop-blur-md">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.4fr]">
        <div className="border-b border-stone-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_0%,rgba(247,242,236,0.95)_100%)] p-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 text-stone-900">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-white">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                {t('insights.simpleAnalysis')}
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                {t('insights.emotionalTone')}
              </h2>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-stone-500">{t('insights.mostFrequentEmotion')}</p>
            {dominantEmotion ? (
              <span
                className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${emotionStyle?.badge}`}
              >
                {getEmotionLabel(t, dominantEmotion)}
              </span>
            ) : (
              <p className="mt-3 text-lg font-semibold text-stone-900">
                {t('insights.noData')}
              </p>
            )}
          </div>
        </div>

        <div className="relative p-6 sm:p-7">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-100/45 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
              <Sparkles className="h-3.5 w-3.5" />
              {t('insights.recentReading')}
            </div>
            <p className="mt-5 max-w-2xl font-serif text-3xl leading-tight text-stone-900 sm:text-4xl">
              {summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
