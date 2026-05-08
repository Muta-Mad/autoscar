import SectionLabel from './SectionLabel';
import WhatsAppIcon from './icons/WhatsAppIcon';
import TelegramIcon from './icons/TelegramIcon';
import { useLang } from '../LanguageContext';

export default function Contacts() {
  const { t } = useLang();

  return (
    <section id="contacto" className="contacts">
      <div className="container">
        <SectionLabel text={t.contacts.label} />
        <h2 className="contacts__title">{t.contacts.title}</h2>
        <p className="contacts__subtitle">{t.contacts.subtitle}</p>

        <div className="contacts__grid contacts-grid">
          <div className="contacts__cards">
            <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP}`} target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-card__icon contact-card__icon--wa">
                <WhatsAppIcon size={22} color="white" />
              </div>
              <div>
                <div className="contact-card__label">{t.contacts.whatsapp.label}</div>
                <div className="contact-card__value">+34 600 000 000</div>
                <div className="contact-card__sub">{t.contacts.whatsapp.sub}</div>
              </div>
              <span className="contact-card__arrow">→</span>
            </a>

            <a href="https://t.me/AutosCarAlicante" target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-card__icon contact-card__icon--tg">
                <TelegramIcon size={22} color="white" />
              </div>
              <div>
                <div className="contact-card__label">{t.contacts.telegram.label}</div>
                <div className="contact-card__value">@AutosCarAlicante</div>
                <div className="contact-card__sub">{t.contacts.telegram.sub}</div>
              </div>
              <span className="contact-card__arrow">→</span>
            </a>

            <div className="contact-card">
              <div className="contact-card__icon contact-card__icon--addr">📍</div>
              <div>
                <div className="contact-card__label">{t.contacts.address.label}</div>
                <div className="contact-card__value">{t.contacts.address.city}</div>
                <div className="contact-card__sub">{t.contacts.address.hours}</div>
              </div>
            </div>
          </div>

          <div className="contacts__map">
            <div className="contacts__map-inner">
              <div className="contacts__map-emoji">🗺️</div>
              <div className="contacts__map-text">
                {t.contacts.map}<br />
                <span className="contacts__map-location">[Alicante, España]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
