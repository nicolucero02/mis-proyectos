import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

const STORAGE_KEY_FORM = 'calorie-form'
const STORAGE_KEY_LANG = 'calorie-lang'

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

const goalAdjustments = {
  lose: -500,
  maintain: 0,
  gain: 300,
}

const translations = {
  es: {
    title: 'Calculadora de Calorías',
    subtitle: 'Calcula tu metabolismo basal y gasto energético diario en segundos',
    age: 'Edad',
    agePlaceholder: 'ej. 30',
    ageHelper: 'Tu edad en años completos',
    weight: 'Peso (kg)',
    weightPlaceholder: 'ej. 75',
    weightHelper: 'Peso actual en kilogramos',
    height: 'Altura (cm)',
    heightPlaceholder: 'ej. 175',
    heightHelper: 'Altura sin zapatos',
    sex: 'Sexo biológico',
    male: 'Hombre',
    female: 'Mujer',
    activity: 'Nivel de actividad',
    selectActivity: 'Selecciona tu actividad diaria',
    sedentary: 'Sedentario (poco o nada de ejercicio)',
    light: 'Ligero (1-3 días/semana)',
    moderate: 'Moderado (3-5 días/semana)',
    active: 'Activo (6-7 días/semana)',
    very_active: 'Muy activo (trabajo físico o doble sesión)',
    goal: 'Objetivo principal',
    lose: 'Perder peso',
    maintain: 'Mantener peso',
    gain: 'Ganar músculo',
    bmr: 'Metabolismo basal (TMB)',
    tdee: 'Gasto total diario (GET)',
    target: 'Calorías recomendadas',
    kcalDay: 'kcal / día',
    emptyTitle: 'Tu resultado aparecerá aquí',
    emptyBody: 'Completa todos los campos del formulario para calcular tu TMB, GET y calorías ideales para tu objetivo.',
    explainTitle: '¿Qué significan estos números?',
    explainBmr: '<strong>TMB:</strong> Las calorías que tu cuerpo quema en reposo absoluto manteniendo funciones vitales como la respiración y la circulación.',
    explainTdee: '<strong>GET:</strong> El total de calorías que quemas en un día completo, incluyendo tu actividad física y ejercicio.',
    explainGoal: '<strong>Objetivo:</strong> Tu GET ajustado según tu meta. Un déficit de ~500 kcal suele resultar en ~0,5 kg de pérdida semanal. Un superávit moderado favorece la ganancia muscular.',
    disclaimerTitle: 'Información importante',
    disclaimerBody: 'Estas cifras son estimaciones basadas en la ecuación de Mifflin-St Jeor, una de las fórmulas más precisas disponibles. Sin embargo, cada cuerpo es diferente. Para planes nutricionales o médicos personalizados, consulta siempre a un profesional de la salud o a un nutricionista deportivo certificado.',
    seoDescription: 'Calculadora gratuita de calorías diarias. Calcula tu TMB, GET y calorías recomendadas para perder peso, mantener o ganar músculo.',
  },
  en: {
    title: 'Calorie Calculator',
    subtitle: 'Calculate your basal metabolic rate and daily energy expenditure in seconds',
    age: 'Age',
    agePlaceholder: 'e.g. 30',
    ageHelper: 'Your age in full years',
    weight: 'Weight (kg)',
    weightPlaceholder: 'e.g. 75',
    weightHelper: 'Current weight in kilograms',
    height: 'Height (cm)',
    heightPlaceholder: 'e.g. 175',
    heightHelper: 'Height without shoes',
    sex: 'Biological Sex',
    male: 'Male',
    female: 'Female',
    activity: 'Activity Level',
    selectActivity: 'Select your daily activity',
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Light (1–3 days/week)',
    moderate: 'Moderate (3–5 days/week)',
    active: 'Active (6–7 days/week)',
    very_active: 'Very active (physical job or double sessions)',
    goal: 'Primary Goal',
    lose: 'Lose weight',
    maintain: 'Maintain weight',
    gain: 'Build muscle',
    bmr: 'Basal Metabolic Rate (BMR)',
    tdee: 'Total Daily Energy (TDEE)',
    target: 'Recommended Calories',
    kcalDay: 'kcal / day',
    emptyTitle: 'Your result will appear here',
    emptyBody: 'Fill in all the form fields to calculate your BMR, TDEE, and ideal calories for your goal.',
    explainTitle: 'What do these numbers mean?',
    explainBmr: '<strong>BMR:</strong> Calories your body burns at complete rest to maintain vital functions like breathing and circulation.',
    explainTdee: '<strong>TDEE:</strong> Total calories you burn in a full day, including physical activity and exercise.',
    explainGoal: '<strong>Goal:</strong> Your TDEE adjusted for your target. A ~500 kcal deficit typically yields ~0.5 kg weekly loss. A moderate surplus supports muscle gain.',
    disclaimerTitle: 'Important Information',
    disclaimerBody: 'These figures are estimates based on the Mifflin-St Jeor equation, one of the most accurate formulas available. However, every body is different. For personalized nutrition or medical plans, always consult a certified health professional or sports nutritionist.',
    seoDescription: 'Free daily calorie calculator. Calculate your BMR, TDEE, and recommended calories to lose weight, maintain, or build muscle.',
  },
}

function useLanguage() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LANG) || 'es'
    } catch {
      return 'es'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang)
    } catch {}
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]
  return { lang, setLang, t }
}

function usePersistentForm() {
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FORM)
      if (saved) return JSON.parse(saved)
    } catch {}
    return { age: '', weight: '', height: '', sex: '', activity: '', goal: 'maintain' }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(form))
    } catch {}
  }, [form])

  const update = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { form, update }
}

function calculateCalories({ age, weight, height, sex, activity, goal }) {
  const a = Number(age)
  const w = Number(weight)
  const h = Number(height)
  if (!a || !w || !h || !sex || !activity) return null

  let bmr = 10 * w + 6.25 * h - 5 * a
  bmr += sex === 'male' ? 5 : -161

  const tdee = Math.round(bmr * activityMultipliers[activity])
  const target = tdee + goalAdjustments[goal || 'maintain']

  return { bmr: Math.round(bmr), tdee, target }
}

function useAnimatedNumber(target, duration = 550) {
  const [display, setDisplay] = useState(target ?? 0)
  const rafRef = useRef()
  const prevRef = useRef(target)

  useEffect(() => {
    if (target == null) {
      setDisplay(0)
      return
    }
    if (target === prevRef.current) return
    const startVal = prevRef.current ?? 0
    const diff = target - startVal
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(startVal + diff * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        prevRef.current = target
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

function ResultValue({ value, lang, accent }) {
  const animated = useAnimatedNumber(value)
  const locale = lang === 'es' ? 'es-ES' : 'en-US'
  const formatted = animated.toLocaleString(locale)

  return (
    <span className={`result-value ${accent ? 'accent' : ''}`} key={value}>
      {formatted}
    </span>
  )
}

function EmptyResultCard({ t }) {
  return (
    <section className="card result empty">
      <div className="empty-icon" aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      </div>
      <h3 className="empty-title">{t.emptyTitle}</h3>
      <p className="empty-body">{t.emptyBody}</p>
      <div className="result-grid preview">
        <div>
          <span className="result-label">{t.bmr}</span>
          <span className="result-value placeholder">—</span>
          <span className="result-unit">{t.kcalDay}</span>
        </div>
        <div>
          <span className="result-label">{t.tdee}</span>
          <span className="result-value placeholder">—</span>
          <span className="result-unit">{t.kcalDay}</span>
        </div>
        <div className="highlight">
          <span className="result-label">{t.target}</span>
          <span className="result-value placeholder accent">—</span>
          <span className="result-unit">{t.kcalDay}</span>
        </div>
      </div>
    </section>
  )
}

function ResultCard({ result, lang, t }) {
  if (!result) {
    return <EmptyResultCard t={t} />
  }

  return (
    <section className="card result">
      <div className="result-grid">
        <div>
          <span className="result-label">{t.bmr}</span>
          <ResultValue value={result.bmr} lang={lang} />
          <span className="result-unit">{t.kcalDay}</span>
        </div>
        <div>
          <span className="result-label">{t.tdee}</span>
          <ResultValue value={result.tdee} lang={lang} />
          <span className="result-unit">{t.kcalDay}</span>
        </div>
        <div className="highlight">
          <span className="result-label">{t.target}</span>
          <ResultValue value={result.target} lang={lang} accent />
          <span className="result-unit">{t.kcalDay}</span>
        </div>
      </div>
    </section>
  )
}

function ExplainCard({ t }) {
  return (
    <section className="card explain">
      <h2>{t.explainTitle}</h2>
      <div className="explain-grid">
        <p dangerouslySetInnerHTML={{ __html: t.explainBmr }} />
        <p dangerouslySetInnerHTML={{ __html: t.explainTdee }} />
        <p dangerouslySetInnerHTML={{ __html: t.explainGoal }} />
      </div>
    </section>
  )
}

function DisclaimerCard({ t }) {
  return (
    <section className="card disclaimer">
      <div className="disclaimer-header">
        <span className="disclaimer-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </span>
        <h3>{t.disclaimerTitle}</h3>
      </div>
      <p>{t.disclaimerBody}</p>
    </section>
  )
}

export default function App() {
  const { lang, setLang, t } = useLanguage()
  const { form, update } = usePersistentForm()
  const result = calculateCalories(form)

  const isComplete = form.age && form.weight && form.height && form.sex && form.activity

  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.content = t.seoDescription
  }, [t])

  return (
    <>
      <header className="app-header">
        <div className="lang-toggle">
          <button
            className={lang === 'es' ? 'active' : ''}
            onClick={() => setLang('es')}
            aria-label="Español"
          >
            ES
          </button>
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
            aria-label="English"
          >
            EN
          </button>
        </div>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </header>

      <section className="card form-card">
        <div className="field-group">
          <label htmlFor="age">{t.age}</label>
          <input
            id="age"
            type="number"
            min="10"
            max="120"
            placeholder={t.agePlaceholder}
            value={form.age}
            onChange={(e) => update('age', e.target.value)}
          />
          <span className="helper">{t.ageHelper}</span>
        </div>

        <div className="row">
          <div className="field-group">
            <label htmlFor="weight">{t.weight}</label>
            <input
              id="weight"
              type="number"
              min="20"
              max="300"
              placeholder={t.weightPlaceholder}
              value={form.weight}
              onChange={(e) => update('weight', e.target.value)}
            />
            <span className="helper">{t.weightHelper}</span>
          </div>
          <div className="field-group">
            <label htmlFor="height">{t.height}</label>
            <input
              id="height"
              type="number"
              min="50"
              max="300"
              placeholder={t.heightPlaceholder}
              value={form.height}
              onChange={(e) => update('height', e.target.value)}
            />
            <span className="helper">{t.heightHelper}</span>
          </div>
        </div>

        <div className="field-group">
          <span className="label">{t.sex}</span>
          <div className="segmented">
            {['male', 'female'].map((s) => (
              <button
                key={s}
                type="button"
                className={form.sex === s ? 'active' : ''}
                onClick={() => update('sex', s)}
              >
                {t[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="activity">{t.activity}</label>
          <select
            id="activity"
            value={form.activity}
            onChange={(e) => update('activity', e.target.value)}
          >
            <option value="">{t.selectActivity}</option>
            {Object.keys(activityMultipliers).map((key) => (
              <option key={key} value={key}>
                {t[key]}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <span className="label">{t.goal}</span>
          <div className="segmented">
            {['lose', 'maintain', 'gain'].map((g) => (
              <button
                key={g}
                type="button"
                className={form.goal === g ? 'active' : ''}
                onClick={() => update('goal', g)}
              >
                {t[g]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ResultCard result={result} lang={lang} t={t} />

      {isComplete && result && <ExplainCard t={t} />}

      <DisclaimerCard t={t} />
    </>
  )
}
