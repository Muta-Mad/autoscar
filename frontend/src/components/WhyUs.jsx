import SectionLabel from './SectionLabel';
import ServiceIcon from './icons/ServiceIcon';
import { useLang } from '../LanguageContext';

const ICONS = ['trophy', 'shield', 'search', 'globe', 'chat', 'document'];

export default function WhyUs({ accent }) {
  const { t } = useLang();

  return (
    <section id="nosotros" style={{ background: '#0D0D0D', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,60px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionLabel accent={accent} text={t.whyUs.label} dark />
        <h2 style={{
          fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, letterSpacing: '-0.025em',
          color: 'white', marginTop: 12, marginBottom: 56,
        }}>
          {t.whyUs.title}<br />{t.whyUs.titleLine2}
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden',
        }}>
          {t.whyUs.items.map((it, i) => (
            <div key={i} style={{ background: '#111', padding: '32px 28px', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#161616')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#111')}>
              <div style={{ marginBottom: 16, color: accent }}>
                <ServiceIcon id={ICONS[i]} size={36} color={accent} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'white', marginBottom: 10, lineHeight: 1.3 }}>{it.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, fontWeight: 400 }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
