import { useLanguage } from '../i18n/LanguageContext';

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className="inline-flex rounded border border-rule bg-card p-0.5 text-sm"
      role="group"
      aria-label={t('language.switchTo')}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`rounded px-2.5 py-1 font-medium ${
          lang === 'en' ? 'bg-ink text-paper' : 'text-muted'
        }`}
      >
        {t('language.en')}
      </button>
      <button
        type="button"
        onClick={() => setLang('zh')}
        className={`rounded px-2.5 py-1 font-medium ${
          lang === 'zh' ? 'bg-ink text-paper' : 'text-muted'
        }`}
      >
        {t('language.zh')}
      </button>
    </div>
  );
}
