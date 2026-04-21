import { useEffect } from 'react'
import { CalendarDays, Tag, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDisplayDate } from '../lib/date'
import { getEmotionStyle } from '../lib/emotions'
import { getEmotionLabel, getTagLabel } from '../lib/i18n-helpers'
import type { Memory } from '../types/memory'

interface MemoryDetailModalProps {
  memory: Memory | null
  onClose: () => void
}

export function MemoryDetailModal({
  memory,
  onClose,
}: MemoryDetailModalProps) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (!memory) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [memory, onClose])

  if (!memory) {
    return null
  }

  const emotionStyle = getEmotionStyle(memory.emotion)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <article className="relative z-10 w-full max-w-3xl animate-rise overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(246,241,235,0.97)_100%)] shadow-[0_34px_120px_rgba(51,39,30,0.2)]">
        <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${emotionStyle.glow}`} />
        <div className="relative flex items-start justify-between px-6 py-5 sm:px-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              {t('memoryDetail.eyebrow')}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-stone-600">
                {getTagLabel(t, memory.tag)}
              </span>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${emotionStyle.badge}`}
              >
                {getEmotionLabel(t, memory.emotion)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-200 p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
            aria-label={t('memoryDetail.close')}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative px-6 pb-8 sm:px-8">
          <h2 className="max-w-2xl font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">
            {memory.title}
          </h2>

          <div className="mt-6 flex flex-col gap-3 text-sm text-stone-600 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {formatDisplayDate(memory.date, i18n.language)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {getTagLabel(t, memory.tag)}
            </span>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/80 bg-white/80 p-6 shadow-[0_20px_70px_rgba(165,150,135,0.12)]">
            <p className="text-base leading-8 text-stone-700">{memory.description}</p>
          </div>
        </div>
      </article>
    </div>
  )
}
