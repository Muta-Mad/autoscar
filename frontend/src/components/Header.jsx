import { useState, useEffect } from 'react';
import Logo from './Logo';
import TelegramIcon from './icons/TelegramIcon';
import { useLang } from '../LanguageContext';

const LANG_OPTIONS = ['ru', 'en', 'es'];

export default function Header({ accent }) {
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

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    background: scrolled ? 'rgba(13,13,13,0.97)' : 'rgba(13,13,13,0)',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
    transition: 'all 0.35s ease',
    padding: '0 clamp(16px, 5vw, 60px)',
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', height: 68, gap: 32, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="desktop-nav">
          <a href="#hero" style={{ display: 'flex', marginRight: 4 }}>
            <Logo accent={accent} size={1.3} />
          </a>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href}
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, fontWeight: 700, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.target.style.color = '#fff')}
              onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.75)')}>
              {l.label}
            </a>
          ))}
          <a href="https://t.me/AutosCarAlicante" target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: accent, color: 'white', padding: '9px 18px',
              borderRadius: 8, fontSize: 14, fontWeight: 700, transition: 'opacity 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
            <TelegramIcon size={16} /> {t.nav.telegram}
          </a>

          {/* Language switcher */}
          <div style={{ display: 'flex', gap: 4 }}>
            {LANG_OPTIONS.map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  padding: '5px 9px', borderRadius: 6, fontSize: 12, fontWeight: 700,
                  background: lang === l ? accent : 'rgba(255,255,255,0.08)',
                  color: lang === l ? 'white' : 'rgba(255,255,255,0.5)',
                  border: 'none', cursor: 'pointer', textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <a href="#hero" className="mobile-only" style={{ display: 'none', flex: 1 }}>
          <Logo accent={accent} />
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
          style={{ display: 'none', color: 'white', fontSize: 24, padding: 8 }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: '#0D0D0D', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px 24px' }}>
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 500, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 12, marginBottom: 4 }}>
            {LANG_OPTIONS.map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  flex: 1, padding: '8px', borderRadius: 6, fontSize: 13, fontWeight: 700,
                  background: lang === l ? accent : 'rgba(255,255,255,0.08)',
                  color: lang === l ? 'white' : 'rgba(255,255,255,0.5)',
                  border: 'none', cursor: 'pointer', textTransform: 'uppercase',
                }}>
                {l}
              </button>
            ))}
          </div>
          <a href="https://t.me/AutosCarAlicante" target="_blank" rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: accent, color: 'white', padding: '12px', marginTop: 12,
              borderRadius: 10, fontSize: 15, fontWeight: 600,
            }}>
            <TelegramIcon size={16} /> {t.nav.openTelegram}
          </a>
        </div>
      )}
    </nav>
  );
}
