import { useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { fetchServices } from '../api';
import { useLang } from '../LanguageContext';

export default function Services() {
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
    <section id="servicios" className="services">
      <div className="container">
        <SectionLabel text={t.services.label} />
        <h2 className="services__title">{t.services.title}</h2>
        <p className="services__subtitle">{t.services.subtitle}</p>

        <div className="services__grid">
          {categories.map((cat, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={cat.name}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className={`service-card${isOpen ? ' service-card--open' : ''}`}>

                <div className="service-card__header">
                  <div>
                    <div className="service-card__num">
                      <span className="service-card__num-line" />
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className={`service-card__title${isOpen ? ' service-card__title--open' : ''}`}>
                      {getName(cat)}
                    </h3>
                  </div>
                  <div className={`service-card__toggle${isOpen ? ' service-card__toggle--open' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <line x1="6" y1="1" x2="6" y2="11" stroke={isOpen ? 'white' : '#555'} strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="1" y1="6" x2="11" y2="6" stroke={isOpen ? 'white' : '#555'} strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {isOpen && cat.services && cat.services.length > 0 && (
                  <div className="service-card__list">
                    {cat.services.map((svc) => (
                      <div key={svc.name} className="service-card__item">
                        <span className="service-card__item-name">{getName(svc)}</span>
                        <span className="service-card__item-price">{svc.price} €</span>
                      </div>
                    ))}
                    <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP}?text=Hola! Me interesa: ${getName(cat)}`}
                      target="_blank" rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="service-card__btn">
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
