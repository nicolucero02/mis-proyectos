export type MemoryTag = 'Personal' | 'Idea' | 'Viaje' | 'Trabajo' | 'Familia'
export type MemoryEmotion =
  | 'Feliz'
  | 'Nostalgico'
  | 'Importante'
  | 'En paz'
  | 'Inspirado'
  | 'Agradecido'

export interface Memory {
  id: string
  title: string
  description: string
  date: string
  tag: MemoryTag
  emotion: MemoryEmotion
  createdAt: string
}

export interface MemoryDraft {
  title: string
  description: string
  date: string
  tag: MemoryTag
  emotion: MemoryEmotion
}
