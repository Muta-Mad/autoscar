import { createContext, useContext, useState } from 'react';
import t from './i18n';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es');

  const changeLang = (l) => {
    localStorage.setItem('lang', l);
    setLang(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
