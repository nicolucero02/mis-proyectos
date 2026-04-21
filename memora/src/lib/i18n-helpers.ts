import type { TFunction } from 'i18next'
import type { MemoryEmotion, MemoryTag } from '../types/memory'

const emotionKeyMap: Record<MemoryEmotion, string> = {
  Feliz: 'happy',
  Nostalgico: 'nostalgic',
  Importante: 'important',
  'En paz': 'peaceful',
  Inspirado: 'inspired',
  Agradecido: 'grateful',
}

const tagKeyMap: Record<MemoryTag, string> = {
  Personal: 'personal',
  Idea: 'idea',
  Viaje: 'travel',
  Trabajo: 'work',
  Familia: 'family',
}

export function getEmotionTranslationKey(emotion: MemoryEmotion) {
  return emotionKeyMap[emotion]
}

export function getTagTranslationKey(tag: MemoryTag) {
  return tagKeyMap[tag]
}

export function getEmotionLabel(t: TFunction, emotion: MemoryEmotion) {
  return t(`memoryEmotions.${getEmotionTranslationKey(emotion)}`)
}

export function getTagLabel(t: TFunction, tag: MemoryTag) {
  return t(`memoryTags.${getTagTranslationKey(tag)}`)
}
