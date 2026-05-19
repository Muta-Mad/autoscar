import SectionLabel from './SectionLabel';
import WhatsAppIcon from './icons/WhatsAppIcon';
import TelegramIcon from './icons/TelegramIcon';
import InstagramIcon from './icons/InstagramIcon';
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
            <a href={`https://wa.me/${34610268321}`} target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-card__icon contact-card__icon--wa">
                <WhatsAppIcon size={22} color="white" />
              </div>
              <div>
                <div className="contact-card__label">{t.contacts.whatsapp.label}</div>
                <div className="contact-card__value">+34 610 268 321</div>
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

            <a href="https://www.instagram.com/_autoscar_" target="_blank" rel="noreferrer" className="contact-card">
              <div className="contact-card__icon contact-card__icon--ig">
                <InstagramIcon size={22} color="white" />
              </div>
              <div>
                <div className="contact-card__label">Instagram</div>
                <div className="contact-card__value">@_autoscar_</div>
                <div className="contact-card__sub">{t.contacts.instagram}</div>
              </div>
              <span className="contact-card__arrow">→</span>
            </a>

            <a href="tel:+34610268321" className="contact-card">
              <div className="contact-card__icon contact-card__icon--phone">📞</div>
              <div>
                <div className="contact-card__label">{t.contacts.phone}</div>
                <div className="contact-card__value">+34 610 268 321</div>
                <div className="contact-card__sub">{t.contacts.phoneSub}</div>
              </div>
              <span className="contact-card__arrow">→</span>
            </a>

            <div className="contact-card">
              <div className="contact-card__icon contact-card__icon--addr">📍</div>
              <div>
                <div className="contact-card__label">{t.contacts.address.label}</div>
                <div className="contact-card__value">C. Guillermo Stewart Howie, 64</div>
                <div className="contact-card__sub">03006 Alicante · {t.contacts.address.hours}</div>
              </div>
            </div>
          </div>

          <div className="contacts__map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3128.8551909244743!2d-0.558291923457671!3d38.35233357184554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd62355f6a3fc405%3A0xd568ce7064f1166!2sAutosCar%20Alicante%20S.L.!5e0!3m2!1sru!2ses!4v1779195936465!5m2!1sru!2ses"
              width="100%" height="100%" style={{border: 0}} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AutosCar Alicante"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
