import { useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { fetchServices } from '../api';
import { useLang } from '../LanguageContext';

export default function Services({ accent }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [categories, setCategories] = useState([]);
  const { t, lang } = useLang();
  const getName = (obj) => lang === 'en' ? (obj.name_en || obj.name)
    : lang === 'es' ? (obj.name_es || obj.name)
    : obj.name;

  useEffect(() => {
    fetchServices().then(setCategories).catch(() => {});
  }, []);

  return (
    <section id="servicios" style={{ background: '#F2F1EF', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,60px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionLabel accent={accent} text={t.services.label} />
        <h2 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, letterSpacing: '-0.025em', marginTop: 12, marginBottom: 12 }}>
          {t.services.title}
        </h2>
        <p style={{ color: '#333', fontSize: 16, marginBottom: 48, maxWidth: 520, lineHeight: 1.6, fontWeight: 400 }}>
          {t.services.subtitle}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {categories.map((cat, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={cat.name}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                style={{
                  background: isOpen ? '#0D0D0D' : 'white',
                  borderRadius: 16,
                  boxShadow: isOpen ? '0 16px 48px rgba(0,0,0,0.18)' : 'none',
                  border: isOpen ? '1.5px solid rgba(255,255,255,0.1)' : 'none',
                  outline: isOpen ? 'none' : '1.5px solid #E5E5E3',
                  padding: '24px',
                  transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
                  cursor: 'pointer',
                  transform: isOpen ? 'translateY(-2px)' : '',
                }}
                onMouseEnter={(e) => { if (!isOpen) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'; } }}
                onMouseLeave={(e) => { if (!isOpen) { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'none'; } }}>

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 900, letterSpacing: '0.18em',
                      color: accent, marginBottom: 14,
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      <span style={{ display: 'inline-block', width: 28, height: 2, background: accent }} />
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 style={{
                      fontSize: 22, fontWeight: 900, marginBottom: 10, lineHeight: 1.15,
                      color: isOpen ? 'white' : '#111',
                      letterSpacing: '-0.02em', textTransform: 'uppercase',
                    }}>
                      {getName(cat)}
                    </h3>
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                    background: isOpen ? accent : 'rgba(0,0,0,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.25s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? 'white' : '#555'} strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? 'white' : '#555'} strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {isOpen && cat.services && cat.services.length > 0 && (
                  <div style={{ marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                    {cat.services.map((svc) => (
                      <div key={svc.name} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)',
                        gap: 12,
                      }}>
                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, fontWeight: 400 }}>{getName(svc)}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: accent, whiteSpace: 'nowrap', flexShrink: 0 }}>{svc.price} €</span>
                      </div>
                    ))}
                    <a href={`https://wa.me/34600000000?text=Hola! Me interesa: ${getName(cat)}`}
                      target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        marginTop: 18, background: accent, color: 'white',
                        padding: '11px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                      <WhatsAppIcon size={15} /> {t.services.request}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
