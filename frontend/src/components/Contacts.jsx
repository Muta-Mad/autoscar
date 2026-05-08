import SectionLabel from './SectionLabel';
import WhatsAppIcon from './icons/WhatsAppIcon';
import TelegramIcon from './icons/TelegramIcon';
import { useLang } from '../LanguageContext';

export default function Contacts({ accent }) {
  const { t } = useLang();

  return (
    <section id="contacto" style={{ background: '#F2F1EF', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,60px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionLabel accent={accent} text={t.contacts.label} />
        <h2 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, letterSpacing: '-0.025em', marginTop: 12, marginBottom: 14 }}>
          {t.contacts.title}
        </h2>
        <p style={{ color: '#333', fontSize: 16, marginBottom: 48, maxWidth: 460, lineHeight: 1.6, fontWeight: 400 }}>
          {t.contacts.subtitle}
        </p>

        <div className="contacts-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ContactCard href="https://wa.me/34600000000" target>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <WhatsAppIcon size={22} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.contacts.whatsapp.label}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>+34 600 000 000</div>
                <div style={{ fontSize: 13, color: '#555', fontWeight: 400 }}>{t.contacts.whatsapp.sub}</div>
              </div>
              <span style={{ marginLeft: 'auto', color: '#999', fontSize: 20 }}>→</span>
            </ContactCard>

            <ContactCard href="https://t.me/AutosCarAlicante" target>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#2AABEE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TelegramIcon size={22} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.contacts.telegram.label}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>@AutosCarAlicante</div>
                <div style={{ fontSize: 13, color: '#555', fontWeight: 400 }}>{t.contacts.telegram.sub}</div>
              </div>
              <span style={{ marginLeft: 'auto', color: '#999', fontSize: 20 }}>→</span>
            </ContactCard>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'white', borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>📍</div>
              <div>
                <div style={{ fontSize: 12, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.contacts.address.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{t.contacts.address.city}</div>
                <div style={{ fontSize: 13, color: '#555', fontWeight: 400 }}>{t.contacts.address.hours}</div>
              </div>
            </div>
          </div>

          <div style={{ borderRadius: 16, overflow: 'hidden', height: 340, background: '#E8E5DF', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <div style={{ fontSize: 40 }}>🗺️</div>
              <div style={{ fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 1.5, fontWeight: 400 }}>
                {t.contacts.map}<br />
                <span style={{ fontSize: 11 }}>[Alicante, España]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ href, target, children }) {
  return (
    <a href={href} target={target ? '_blank' : undefined} rel="noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'white', borderRadius: 14, padding: '18px 20px', textDecoration: 'none', transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)')}>
      {children}
    </a>
  );
}
