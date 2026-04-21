import type { MemoryEmotion } from '../types/memory'

type EmotionStyle = {
  badge: string
  glow: string
}

const emotionStyles: Record<MemoryEmotion, EmotionStyle> = {
  Feliz: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
    glow: 'from-amber-100/70 via-transparent to-transparent',
  },
  Nostalgico: {
    badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
    glow: 'from-rose-100/70 via-transparent to-transparent',
  },
  Importante: {
    badge: 'bg-stone-100 text-stone-700 border-stone-200/90',
    glow: 'from-stone-200/60 via-transparent to-transparent',
  },
  'En paz': {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    glow: 'from-emerald-100/70 via-transparent to-transparent',
  },
  Inspirado: {
    badge: 'bg-sky-50 text-sky-700 border-sky-200/80',
    glow: 'from-sky-100/70 via-transparent to-transparent',
  },
  Agradecido: {
    badge: 'bg-orange-50 text-orange-700 border-orange-200/80',
    glow: 'from-orange-100/70 via-transparent to-transparent',
  },
}

export function getEmotionStyle(emotion: MemoryEmotion) {
  return emotionStyles[emotion]
}
