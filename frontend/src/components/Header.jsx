import { useState, useEffect } from 'react';
import Logo from './Logo';
import TelegramIcon from './icons/TelegramIcon';
import { useLang } from '../LanguageContext';

const LANG_OPTIONS = ['ru', 'en', 'es'];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const NAV_LINKS = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.services, href: '#servicios' },
    { label: t.nav.catalog, href: '#catalogo' },
    { label: t.nav.about, href: '#nosotros' },
    { label: t.nav.contacts, href: '#contacto' },
  ];

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <div className="nav__links desktop-nav">
          <a href="#hero">
            <Logo />
          </a>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="nav__link">
              {l.label}
            </a>
          ))}
          <a href="https://t.me/AutosCarAlicante" target="_blank" rel="noreferrer" className="nav__tg-btn">
            <TelegramIcon size={16} /> {t.nav.telegram}
          </a>
          <div className="nav__lang">
            {LANG_OPTIONS.map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`nav__lang-btn${lang === l ? ' nav__lang-btn--active' : ''}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <a href="#hero" className="mobile-only">
          <Logo />
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="mobile-menu__link">
              {l.label}
            </a>
          ))}
          <div className="mobile-menu__lang">
            {LANG_OPTIONS.map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`mobile-menu__lang-btn${lang === l ? ' mobile-menu__lang-btn--active' : ''}`}>
                {l}
              </button>
            ))}
          </div>
          <a href="https://t.me/AutosCarAlicante" target="_blank" rel="noreferrer" className="mobile-menu__tg-btn">
            <TelegramIcon size={16} /> {t.nav.openTelegram}
          </a>
        </div>
      )}
    </nav>
  );
}
