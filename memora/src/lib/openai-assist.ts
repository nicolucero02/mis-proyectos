import type { MemoryEmotion } from '../types/memory'

export interface MemoryAssistResult {
  summary: string
  suggestedTitle: string
  detectedEmotion: MemoryEmotion
}

export async function requestMemoryAssist(payload: {
  title?: string
  description: string
}) {
  const response = await fetch('/api/memory-assist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as
    | MemoryAssistResult
    | { error?: string }

  if (!response.ok) {
    throw new Error(
      'error' in data && data.error
        ? data.error
        : 'No se pudo obtener asistencia con OpenAI.',
    )
  }

  return data as MemoryAssistResult
}
