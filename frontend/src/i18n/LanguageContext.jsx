import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

const STORAGE_KEY = 'harbourview-language';
const LanguageContext = createContext(null);

function readLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'zh' || saved === 'en') return saved;
  } catch {
    /* ignore */
  }
  return 'en';
}

function interpolate(template, vars) {
  if (!vars) return template;
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readLang);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    document.title = translations[lang].documentTitle;
  }, [lang]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      const parts = key.split('.');
      let current = translations[lang];
      for (const part of parts) {
        current = current?.[part];
      }
      if (typeof current !== 'string') return key;
      return interpolate(current, vars);
    };

    return { lang, setLang, t };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}
