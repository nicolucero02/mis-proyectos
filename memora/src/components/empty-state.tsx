import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface EmptyStateProps {
  onCreate: () => void
}

export function EmptyState({ onCreate }: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <section className="rounded-[2rem] border border-dashed border-stone-300 bg-white/70 px-6 py-16 text-center shadow-[0_18px_50px_rgba(184,166,151,0.12)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 text-white shadow-lg shadow-stone-900/10">
          <Sparkles className="h-7 w-7" />
        </div>
        <h2 className="mt-6 font-serif text-4xl text-stone-900">
          {t('emptyState.title')}
        </h2>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          {t('emptyState.description')}
        </p>
        <button
          type="button"
          onClick={onCreate}
          className="mt-8 inline-flex items-center rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-stone-800"
        >
          {t('emptyState.cta')}
        </button>
      </div>
    </section>
  )
}
