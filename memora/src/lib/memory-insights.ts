import type { TFunction } from 'i18next'
import { getEmotionTranslationKey, getTagTranslationKey } from './i18n-helpers'
import type { Memory, MemoryEmotion } from '../types/memory'

export type MemoryInsights = {
  dominantEmotion: MemoryEmotion | null
  summary: string
}

function getMostFrequentValue<T extends string>(values: T[]) {
  const counts = new Map<T, number>()

  values.forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  })

  let winner: T | null = null
  let highestCount = -1

  counts.forEach((count, value) => {
    if (count > highestCount) {
      highestCount = count
      winner = value
    }
  })

  return winner
}

export function analyzeMemories(
  memories: Memory[],
  t: TFunction,
): MemoryInsights {
  if (memories.length === 0) {
    return {
      dominantEmotion: null,
      summary: t('insights.emptySummary'),
    }
  }

  const dominantEmotion = getMostFrequentValue(
    memories.map((memory) => memory.emotion),
  )
  const dominantTag = getMostFrequentValue(memories.map((memory) => memory.tag))

  const emotionFragment = dominantEmotion
    ? t(`insights.emotionDescriptors.${getEmotionTranslationKey(dominantEmotion)}`)
    : t('insights.emotionDescriptors.fallback')
  const tagFragment = dominantTag
    ? t(`insights.tagDescriptors.${getTagTranslationKey(dominantTag)}`)
    : t('insights.tagDescriptors.fallback')

  return {
    dominantEmotion,
    summary: t('insights.summary', {
      emotion: emotionFragment,
      tag: tagFragment,
    }),
  }
}
