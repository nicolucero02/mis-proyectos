import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from './components/header'
import { EmptyState } from './components/empty-state'
import { MemoryCard } from './components/memory-card'
import { MemoryDetailModal } from './components/memory-detail-modal'
import { MemoryFormModal } from './components/memory-form-modal'
import { MemoryInsightsCard } from './components/memory-insights-card'
import { useLocalStorage } from './hooks/use-local-storage'
import { analyzeMemories } from './lib/memory-insights'
import type { Memory, MemoryDraft } from './types/memory'

const STORAGE_KEY = 'memora.memories'

function App() {
  const { t } = useTranslation()
  const [storedMemories, setStoredMemories] = useLocalStorage<Memory[]>(STORAGE_KEY, [])
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [highlightedMemoryId, setHighlightedMemoryId] = useState<string | null>(null)

  const memories = storedMemories.map((memory) => ({
    ...memory,
    emotion: memory.emotion ?? 'Importante',
  }))

  const orderedMemories = [...memories].sort(
    (first, second) =>
      second.date.localeCompare(first.date) ||
      second.createdAt.localeCompare(first.createdAt),
  )
  const insights = analyzeMemories(orderedMemories, t)

  const handleCreateMemory = async (draft: MemoryDraft) => {
    const nextMemory: Memory = {
      id: crypto.randomUUID(),
      title: draft.title,
      description: draft.description,
      date: draft.date,
      tag: draft.tag,
      emotion: draft.emotion,
      createdAt: new Date().toISOString(),
    }

    setStoredMemories((current) => [nextMemory, ...current])
    setHighlightedMemoryId(nextMemory.id)
    setIsComposerOpen(false)

    window.setTimeout(() => {
      setHighlightedMemoryId((current) =>
        current === nextMemory.id ? null : current,
      )
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(244,236,227,0.88),transparent_32%),linear-gradient(180deg,#f7f2ec_0%,#f3ede6_42%,#efe7dd_100%)] text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="animate-rise">
          <Header count={memories.length} onCreate={() => setIsComposerOpen(true)} />
        </div>

        <main className="mt-8 flex-1 animate-rise [animation-delay:120ms]">
          <section className="mb-6 grid gap-4 rounded-[2rem] border border-white/60 bg-white/45 p-5 shadow-[0_20px_60px_rgba(160,140,122,0.08)] backdrop-blur-sm sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                {t('dashboard.rhythm')}
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                {memories.length === 0
                  ? t('dashboard.rhythmEmpty')
                  : t('dashboard.rhythmGrowing')}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                {t('dashboard.format')}
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                {t('dashboard.formatValue')}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                {t('dashboard.storage')}
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-900">
                {t('dashboard.storageValue')}
              </p>
            </div>
          </section>

          {orderedMemories.length > 0 && (
            <MemoryInsightsCard
              dominantEmotion={insights.dominantEmotion}
              summary={insights.summary}
            />
          )}

          {orderedMemories.length === 0 ? (
            <EmptyState onCreate={() => setIsComposerOpen(true)} />
          ) : (
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {orderedMemories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  isNew={highlightedMemoryId === memory.id}
                  onOpen={setSelectedMemory}
                />
              ))}
            </section>
          )}
        </main>
      </div>

      <MemoryFormModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onSubmit={handleCreateMemory}
      />
      <MemoryDetailModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />
    </div>
  )
}

export default App
