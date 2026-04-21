import { BookHeart, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface HeaderProps {
  count: number
  onCreate: () => void
}

export function Header({ count, onCreate }: HeaderProps) {
  const { t, i18n } = useTranslation()

  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-white/65 bg-white/80 p-6 shadow-[0_24px_80px_rgba(130,113,101,0.16)] backdrop-blur-xl sm:p-8">
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
      <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
        <div className="inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/72 p-1 shadow-sm backdrop-blur-md">
          <button
            type="button"
            onClick={() => void i18n.changeLanguage('es')}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] transition ${
              i18n.language === 'es'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            aria-label={t('common.spanish')}
          >
            {t('common.spanish')}
          </button>
          <span className="text-xs text-stone-300">|</span>
          <button
            type="button"
            onClick={() => void i18n.changeLanguage('en')}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] transition ${
              i18n.language === 'en'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
            aria-label={t('common.english')}
          >
            {t('common.english')}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-stone-50">
            <BookHeart className="h-4 w-4" />
            {t('header.eyebrow')}
          </div>
          <div className="space-y-3">
            <h1 className="font-serif text-5xl leading-none text-stone-900 sm:text-6xl">
              Memora
            </h1>
            <p className="max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              {t('header.description')}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="rounded-3xl border border-stone-200/70 bg-stone-50/90 px-5 py-4 shadow-inner">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
              {t('header.savedMemories')}
            </p>
            <p className="mt-2 text-3xl font-semibold text-stone-900">{count}</p>
          </div>

          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-stone-800"
          >
            <Plus className="h-4 w-4" />
            {t('header.newMemory')}
          </button>
        </div>
      </div>
    </header>
  )
}
