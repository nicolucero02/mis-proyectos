import { useEffect, useMemo, useState } from 'react';
import { generate, generateAllVariations, copyText, buildHTML, OPTIONS } from './generator';

const STORAGE_KEY = 'ai-landing-builder-data';

const LABELS = {
  es: {
    title: 'Creador de Landing Pages con IA',
    name: 'Nombre del negocio o producto',
    businessType: 'Tipo de negocio',
    industry: 'Industria',
    audience: 'Audiencia objetivo',
    benefit: 'Beneficio principal',
    tone: 'Tono',
    tones: { professional: 'Profesional', friendly: 'Amigable', bold: 'Audaz', minimal: 'Minimalista' },
    generate: 'Generar landing page',
    copy: 'Copiar texto',
    copied: 'Copiado',
    download: 'Descargar HTML',
    downloaded: 'Descargado',
    heroPreview: 'Vista previa',
    featuresTitle: 'Características',
    socialTitle: 'Lo que dicen nuestros usuarios',
    faqTitle: 'Preguntas frecuentes',
    emptyName: 'El nombre del negocio es obligatorio',
    variation: 'Versión',
    newVariation: 'Generar otra versión',
    navFeatures: 'Características',
    navTestimonial: 'Testimonio',
    navFaq: 'FAQ',
    footerBrand: 'Hecho con AI Landing Page Builder',
    selectPlaceholder: 'Seleccionar...',
    other: 'Otro',
  },
  en: {
    title: 'AI Landing Page Builder',
    name: 'Business or product name',
    businessType: 'Business type',
    industry: 'Industry',
    audience: 'Target audience',
    benefit: 'Main benefit',
    tone: 'Tone',
    tones: { professional: 'Professional', friendly: 'Friendly', bold: 'Bold', minimal: 'Minimal' },
    generate: 'Generate landing page',
    copy: 'Copy text',
    copied: 'Copied',
    download: 'Download HTML',
    downloaded: 'Downloaded',
    heroPreview: 'Preview',
    featuresTitle: 'Features',
    socialTitle: 'What our users say',
    faqTitle: 'Frequently asked questions',
    emptyName: 'Business name is required',
    variation: 'Version',
    newVariation: 'Generate another version',
    navFeatures: 'Features',
    navTestimonial: 'Testimonial',
    navFaq: 'FAQ',
    footerBrand: 'Made with AI Landing Page Builder',
    selectPlaceholder: 'Select...',
    other: 'Other',
  },
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return null;
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export default function App() {
  const saved = loadState();
  const [lang, setLang] = useState(saved?.lang || 'es');
  const [name, setName] = useState(saved?.name || '');
  const [businessType, setBusinessType] = useState(saved?.businessType || 'b2b');
  const [industry, setIndustry] = useState(saved?.industry || '');
  const [industryOther, setIndustryOther] = useState(saved?.industryOther || '');
  const [audience, setAudience] = useState(saved?.audience || '');
  const [benefit, setBenefit] = useState(saved?.benefit || '');
  const [tone, setTone] = useState(saved?.tone || 'professional');
  const [landing, setLanding] = useState(null);
  const [variations, setVariations] = useState([]);
  const [activeVariation, setActiveVariation] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState('');

  const t = LABELS[lang];
  const opts = OPTIONS[lang];

  useEffect(() => {
    saveState({ lang, name, businessType, industry, industryOther, audience, benefit, tone });
  }, [lang, name, businessType, industry, industryOther, audience, benefit, tone]);

  const effectiveIndustry = industry === t.other ? industryOther : industry;

  const handleGenerate = () => {
    setError('');
    if (!name.trim()) { setError(t.emptyName); return; }
    const all = generateAllVariations({
      name: name.trim(),
      industry: effectiveIndustry.trim() || (lang === 'es' ? 'tu industria' : 'your industry'),
      audience: audience.trim() || (lang === 'es' ? 'profesionales' : 'professionals'),
      benefit: benefit.trim() || (lang === 'es' ? 'ahorrar tiempo' : 'save time'),
      tone,
      lang,
      businessType,
    });
    setVariations(all);
    setLanding(all[0]);
    setActiveVariation(0);
    setCopied(false);
    setDownloaded(false);
  };

  const handleNewVariation = () => {
    if (!name.trim() || variations.length === 0) return;
    const all = generateAllVariations({
      name: name.trim(),
      industry: effectiveIndustry.trim() || (lang === 'es' ? 'tu industria' : 'your industry'),
      audience: audience.trim() || (lang === 'es' ? 'profesionales' : 'professionals'),
      benefit: benefit.trim() || (lang === 'es' ? 'ahorrar tiempo' : 'save time'),
      tone,
      lang,
      businessType,
    });
    let next = Math.floor(Math.random() * all.length);
    if (next === activeVariation && all.length > 1) next = (next + 1) % all.length;
    setVariations(all);
    setLanding(all[next]);
    setActiveVariation(next);
  };

  const handleCopy = async () => {
    if (!landing) return;
    try {
      await navigator.clipboard.writeText(copyText(landing));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const handleDownload = () => {
    if (!landing) return;
    const html = buildHTML(landing, name.trim() || (lang === 'es' ? 'Tu Negocio' : 'Your Business'));
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(name.trim() || 'landing').toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const defaultIndustry = lang === 'es' ? 'tu industria' : 'your industry';
  const defaultAudience = lang === 'es' ? 'profesionales' : 'professionals';
  const defaultBenefit = lang === 'es' ? 'ahorrar tiempo' : 'save time';

  const preview = useMemo(
    () =>
      landing ||
      generate({
        name: name.trim() || (lang === 'es' ? 'Tu Negocio' : 'Your Business'),
        industry: effectiveIndustry.trim() || defaultIndustry,
        audience: audience.trim() || defaultAudience,
        benefit: benefit.trim() || defaultBenefit,
        tone,
        lang,
        businessType,
      }),
    [landing, name, industry, industryOther, audience, benefit, tone, lang, businessType, defaultIndustry, defaultAudience, defaultBenefit, effectiveIndustry]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="logo">{t.title}</h1>
        <div className="lang-toggle">
          <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
        </div>
      </header>

      <main className="app-main">
        <section className="form-section">
          <div className="field">
            <label htmlFor="name">{t.name}</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Acme Inc." />
          </div>

          <div className="field">
            <label htmlFor="businessType">{t.businessType}</label>
            <select
              id="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="field-select"
            >
              {opts.businessTypes.map((b) => (
                <option key={b.key} value={b.key}>{b.label}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="industry">{t.industry}</label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="field-select"
            >
              <option value="">{t.selectPlaceholder}</option>
              {opts.industries.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            {industry === t.other && (
              <input
                className="field-other"
                value={industryOther}
                onChange={(e) => setIndustryOther(e.target.value)}
                placeholder={lang === 'es' ? 'Especifica tu industria' : 'Specify your industry'}
              />
            )}
          </div>

          <div className="field">
            <label htmlFor="audience">{t.audience}</label>
            <select
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="field-select"
            >
              <option value="">{t.selectPlaceholder}</option>
              {opts.audiences.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="benefit">{t.benefit}</label>
            <input
              id="benefit"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              placeholder={lang === 'es' ? 'Ej. ahorrar tiempo, ganar clientes' : 'e.g. save time, gain clients'}
            />
          </div>

          <div className="field">
            <label>{t.tone}</label>
            <div className="tone-options">
              {(['professional', 'friendly', 'bold', 'minimal']).map((tKey) => (
                <button key={tKey} className={tone === tKey ? 'active' : ''} onClick={() => setTone(tKey)}>
                  {t.tones[tKey]}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="btn-primary" onClick={handleGenerate}>
            {t.generate}
          </button>
        </section>

        <section className="preview-section">
          <div className="preview-header">
            <h2>{t.heroPreview}</h2>
            <div className="preview-actions">
              <button className="btn-copy" onClick={handleCopy} disabled={!landing}>
                {copied ? t.copied : t.copy}
              </button>
              <button className="btn-download" onClick={handleDownload} disabled={!landing}>
                {downloaded ? t.downloaded : t.download}
              </button>
            </div>
          </div>

          {variations.length > 0 && (
            <div className="variation-tabs">
              {variations.map((_, i) => (
                <button
                  key={i}
                  className={activeVariation === i ? 'active' : ''}
                  onClick={() => { setActiveVariation(i); setLanding(variations[i]); }}
                >
                  {t.variation} {i + 1}
                </button>
              ))}
              <button className="btn-new-var" onClick={handleNewVariation}>
                {t.newVariation}
              </button>
            </div>
          )}

          <div className="preview-frame">
            <nav className="preview-navbar">
              <div className="preview-brand">{name.trim() || (lang === 'es' ? 'Tu Negocio' : 'Your Business')}</div>
              <div className="preview-nav-links">
                <span>{t.navFeatures}</span>
                <span>{t.navTestimonial}</span>
                <span>{t.navFaq}</span>
              </div>
            </nav>

            <div className="preview-hero">
              <h3>{preview.headline}</h3>
              <p>{preview.subheadline}</p>
              <button className="btn-cta">{preview.cta}</button>
            </div>

            <div className="preview-features">
              <h3>{t.featuresTitle}</h3>
              <div className="cards">
                {preview.features.map((f, i) => (
                  <div className="card" key={i}>
                    <h4>{f.title}</h4>
                    <p>{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="preview-social">
              <h3>{t.socialTitle}</h3>
              <blockquote>"{preview.socialProof.quote}"</blockquote>
              <cite>{preview.socialProof.author}</cite>
            </div>

            <div className="preview-faq">
              <h3>{t.faqTitle}</h3>
              <div className="faq-list">
                {preview.faq.map((item, i) => (
                  <details className="faq-item" key={i}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <footer className="preview-footer">
              <small>&copy; {new Date().getFullYear()} {name.trim() || (lang === 'es' ? 'Tu Negocio' : 'Your Business')}. {t.footerBrand}</small>
            </footer>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <small>AI Landing Page Builder</small>
      </footer>
    </div>
  );
}
