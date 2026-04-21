import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { LoaderCircle, Sparkles, Wand2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { memoryEmotions } from '../data/emotions'
import { memoryTags } from '../data/tags'
import { formatInputDate } from '../lib/date'
import { getEmotionLabel, getTagLabel } from '../lib/i18n-helpers'
import { requestMemoryAssist } from '../lib/openai-assist'
import type { MemoryDraft } from '../types/memory'

const initialDraft: MemoryDraft = {
  title: '',
  description: '',
  date: formatInputDate(),
  tag: 'Personal',
  emotion: 'Feliz',
}

interface MemoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (draft: MemoryDraft) => Promise<void>
}

export function MemoryFormModal({
  isOpen,
  onClose,
  onSubmit,
}: MemoryFormModalProps) {
  const { t } = useTranslation()
  const [draft, setDraft] = useState<MemoryDraft>(initialDraft)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuggestingTitle, setIsSuggestingTitle] = useState(false)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [isDetectingEmotion, setIsDetectingEmotion] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setDraft({
        ...initialDraft,
        date: formatInputDate(),
      })
      setStatusMessage(null)
      setIsSubmitting(false)
      setIsSuggestingTitle(false)
      setIsSummarizing(false)
      setIsDetectingEmotion(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleChange =
    (field: keyof MemoryDraft) =>
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setDraft((current) => ({
        ...current,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!draft.description.trim()) {
      setStatusMessage(t('memoryForm.errors.missingDescriptionSave'))
      return
    }

    void (async () => {
      setIsSubmitting(true)
      setStatusMessage(null)

      try {
        let nextDraft = {
          ...draft,
          title: draft.title.trim(),
          description: draft.description.trim(),
        }

        if (!nextDraft.title) {
          const assisted = await requestMemoryAssist({
            title: '',
            description: nextDraft.description,
          })

          nextDraft = {
            ...nextDraft,
            title: assisted.suggestedTitle,
            emotion: assisted.detectedEmotion,
          }
        }

        await onSubmit(nextDraft)
      } catch (error) {
        setStatusMessage(
          error instanceof Error
            ? error.message
            : t('memoryForm.errors.saveFailed'),
        )
      } finally {
        setIsSubmitting(false)
      }
    })()
  }

  const handleSummarize = async () => {
    if (!draft.description.trim()) {
      setStatusMessage(t('memoryForm.errors.missingDescriptionSummarize'))
      return
    }

    setIsSummarizing(true)
    setStatusMessage(null)

    try {
      const assisted = await requestMemoryAssist({
        title: draft.title,
        description: draft.description.trim(),
      })

      setDraft((current) => ({
        ...current,
        description: assisted.summary,
      }))
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : t('memoryForm.errors.summarizeFailed'),
      )
    } finally {
      setIsSummarizing(false)
    }
  }

  const handleSuggestTitle = async () => {
    if (!draft.description.trim()) {
      setStatusMessage(t('memoryForm.errors.missingDescriptionTitle'))
      return
    }

    setIsSuggestingTitle(true)
    setStatusMessage(null)

    try {
      const assisted = await requestMemoryAssist({
        title: draft.title,
        description: draft.description.trim(),
      })

      setDraft((current) => ({
        ...current,
        title: assisted.suggestedTitle,
      }))
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : t('memoryForm.errors.titleFailed'),
      )
    } finally {
      setIsSuggestingTitle(false)
    }
  }

  const handleDetectEmotion = async () => {
    if (!draft.description.trim()) {
      setStatusMessage(t('memoryForm.errors.missingDescriptionEmotion'))
      return
    }

    setIsDetectingEmotion(true)
    setStatusMessage(null)

    try {
      const assisted = await requestMemoryAssist({
        title: draft.title,
        description: draft.description.trim(),
      })

      setDraft((current) => ({
        ...current,
        emotion: assisted.detectedEmotion,
      }))
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : t('memoryForm.errors.emotionFailed'),
      )
    } finally {
      setIsDetectingEmotion(false)
    }
  }

  return (
    <div className="animate-modal-overlay-in fixed inset-0 z-50 bg-black/30 backdrop-blur-md">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[10%] h-32 w-32 rounded-full bg-amber-100/35 blur-3xl" />
        <div className="absolute bottom-[10%] right-[12%] h-40 w-40 rounded-full bg-rose-100/20 blur-3xl" />
      </div>
      <div className="relative flex min-h-full items-center justify-center px-4 py-6 sm:px-6 sm:py-10">
        <div className="relative z-10 w-full max-w-[700px] animate-modal-entry overflow-hidden rounded-[2.5rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,241,234,0.96)_100%)] shadow-[0_28px_90px_rgba(39,29,21,0.18)]">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-amber-100/55 via-white/30 to-transparent" />

          <div className="max-h-[90vh] overflow-y-auto overscroll-contain">
            <div className="relative mx-auto flex max-w-[600px] items-start justify-between px-7 pb-0 pt-9 sm:px-10 sm:pt-11">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  {t('memoryForm.eyebrow')}
                </p>
                <h2 className="mt-2 font-serif text-4xl text-stone-900">
                  {t('memoryForm.title')}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600">
                  {t('memoryForm.description')}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/80 bg-white/75 p-2 text-stone-500 shadow-sm backdrop-blur transition hover:bg-stone-100 hover:text-stone-900"
                aria-label={t('memoryForm.close')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              className="relative mx-auto max-w-[600px] space-y-8 px-7 pb-9 pt-9 sm:px-10 sm:pb-12 sm:pt-10"
              onSubmit={handleSubmit}
            >
              <div className="space-y-7">
                <label className="block">
                  <span className="mb-3 block text-sm font-medium text-stone-700">
                    {t('memoryForm.titleLabel')}
                  </span>
                  <div className="rounded-[1.6rem] border border-white/80 bg-white/85 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition focus-within:border-stone-400 focus-within:bg-white">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <input
                        type="text"
                        value={draft.title}
                        onChange={handleChange('title')}
                        placeholder={t('memoryForm.titlePlaceholder')}
                        className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-stone-900 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => void handleSuggestTitle()}
                        disabled={isSuggestingTitle || isSubmitting}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSuggestingTitle ? (
                          <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="h-3.5 w-3.5" />
                        )}
                        {t('memoryForm.suggestTitle')}
                      </button>
                    </div>
                  </div>
                </label>

                <label className="block">
                  <span className="mb-3 block text-sm font-medium text-stone-700">
                    {t('memoryForm.descriptionLabel')}
                  </span>
                  <textarea
                    value={draft.description}
                    onChange={handleChange('description')}
                    placeholder={t('memoryForm.descriptionPlaceholder')}
                    rows={10}
                    className="w-full rounded-[1.85rem] border border-white/80 bg-white/90 px-5 py-5 text-[15px] leading-8 text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition focus:border-stone-400 focus:bg-white"
                    required
                  />
                </label>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => void handleDetectEmotion()}
                    disabled={isDetectingEmotion || isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/75 px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isDetectingEmotion ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                    {t('memoryForm.detectEmotion')}
                  </button>

                  <button
                    type="button"
                    onClick={() => void handleSummarize()}
                    disabled={isSummarizing || isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white/75 px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSummarizing ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                    {t('memoryForm.summarize')}
                  </button>
                </div>

                {statusMessage && (
                  <p className="rounded-2xl bg-stone-50/85 px-4 py-3 text-sm text-stone-600">
                    {statusMessage}
                  </p>
                )}

                <div className="grid gap-4 border-t border-stone-200/70 pt-6 sm:grid-cols-3">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-stone-700">
                      {t('memoryForm.dateLabel')}
                    </span>
                    <input
                      type="date"
                      value={draft.date}
                      onChange={handleChange('date')}
                      className="w-full rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-stone-700">
                      {t('memoryForm.tagLabel')}
                    </span>
                    <select
                      value={draft.tag}
                      onChange={handleChange('tag')}
                      className="w-full rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white"
                    >
                      {memoryTags.map((tag) => (
                        <option key={tag} value={tag}>
                          {getTagLabel(t, tag)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-stone-700">
                      {t('memoryForm.emotionLabel')}
                    </span>
                    <select
                      value={draft.emotion}
                      onChange={handleChange('emotion')}
                      className="w-full rounded-2xl border border-white/80 bg-white/85 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white"
                    >
                      {memoryEmotions.map((emotion) => (
                        <option key={emotion} value={emotion}>
                          {getEmotionLabel(t, emotion)}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-stone-200/80 pt-6 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-stone-200 bg-white/80 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
                >
                  {t('memoryForm.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-900/10 transition hover:-translate-y-0.5 hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? t('memoryForm.saving') : t('memoryForm.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
