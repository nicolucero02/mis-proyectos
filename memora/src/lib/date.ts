export function formatDisplayDate(date: string, language = 'es') {
  const locale = language === 'en' ? 'en-US' : 'es-AR'

  const formatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return formatter.format(new Date(`${date}T00:00:00`))
}

export function formatInputDate(date = new Date()) {
  return date.toISOString().split('T')[0]
}
