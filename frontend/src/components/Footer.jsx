import Logo from './Logo';
import { useLang } from '../LanguageContext';

export default function Footer({ accent }) {
  const { t } = useLang();

  return (
    <footer style={{ background: '#0D0D0D', padding: 'clamp(40px,6vw,64px) clamp(16px,5vw,60px) 28px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <Logo accent={accent} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginTop: 16, fontWeight: 400 }}>
              {t.footer.description}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>{t.footer.services}</div>
              {t.footer.links.map((s) => (
                <div key={s} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 10, cursor: 'pointer', fontWeight: 400 }}
                  onMouseEnter={(e) => (e.target.style.color = 'white')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(255,255,255,0.55)')}>
                  {s}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>{t.footer.contacts}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 10, fontWeight: 400 }}>t.me/AutosCarAlicante</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 10, fontWeight: 400 }}>+34 600 000 000</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 10, fontWeight: 400 }}>Alicante, España</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>{t.footer.copyright}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>{t.footer.privacy}</div>
        </div>
      </div>
    </footer>
  );
}
