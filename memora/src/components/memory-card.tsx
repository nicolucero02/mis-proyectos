import { CalendarDays } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDisplayDate } from '../lib/date'
import { getEmotionStyle } from '../lib/emotions'
import { getEmotionLabel, getTagLabel } from '../lib/i18n-helpers'
import type { Memory } from '../types/memory'

interface MemoryCardProps {
  memory: Memory
  isNew?: boolean
  onOpen: (memory: Memory) => void
}

export function MemoryCard({ memory, isNew = false, onOpen }: MemoryCardProps) {
  const { t, i18n } = useTranslation()
  const emotionStyle = getEmotionStyle(memory.emotion)

  return (
    <button
      type="button"
      onClick={() => onOpen(memory)}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 p-5 text-left shadow-[0_20px_60px_rgba(165,150,135,0.12)] backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(165,150,135,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/70 ${
        isNew ? 'animate-memory-pop' : ''
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${emotionStyle.glow}`} />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-stone-600 uppercase">
              {getTagLabel(t, memory.tag)}
            </span>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${emotionStyle.badge}`}
            >
              {getEmotionLabel(t, memory.emotion)}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">
            {memory.title}
          </h2>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <CalendarDays className="h-5 w-5" />
        </div>
      </div>

      <p className="relative line-clamp-4 text-sm leading-7 text-stone-600">
        {memory.description}
      </p>

      <footer className="relative mt-6 flex items-center justify-between border-t border-stone-100 pt-4 text-sm text-stone-500">
        <span>{formatDisplayDate(memory.date, i18n.language)}</span>
        <span className="text-stone-400">{t('memoryCard.viewDetail')}</span>
      </footer>
    </button>
  )
}
