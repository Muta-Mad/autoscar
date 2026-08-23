import { useState, useEffect } from 'react';
import CarPlaceholder from './CarPlaceholder';
import WhatsAppIcon from './icons/WhatsAppIcon';
import TelegramIcon from './icons/TelegramIcon';
import { useLang } from '../LanguageContext';

const WHATSAPP = '34610268321';

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => (
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  ));
}

function renderDescription(text) {
  return text.split(/\n{2,}/).map((block, i) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length > 0 && lines.every((l) => l.startsWith("* "))) {
      return (
        <ul key={i} className="modal__description-list">
          {lines.map((l, j) => (
            <li key={j}>{renderInline(l.slice(2))}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i}>
        {lines.map((line, idx) => (
          <span key={idx}>
            {idx > 0 && <br />}
            {renderInline(line)}
          </span>
        ))}
      </p>
    );
  });
}

export default function CarModal({ car, onClose }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const { t, lang } = useLang();
  const tm = t.modal;
  const ecoLabels = tm.ecoLabels;
  const available = car.available && !car.is_sold;
  const allImages = car.image
    ? [{ id: 'main', image: car.image }, ...(car.images || [])]
    : (car.images || []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', fn);
    };
  }, [onClose]);

  const brandName = typeof car.brand === 'object' ? car.brand.name : car.brand;
  const description = lang === 'en' ? (car.description_en || car.description)
    : lang === 'es' ? (car.description_es || car.description)
    : car.description;

  return (
    <div onClick={onClose} className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <button onClick={onClose} className="modal__close">✕</button>

        <div className="modal__gallery">
          {allImages.length > 0 && allImages[photoIdx] ? (
            <img
              src={allImages[photoIdx].image}
              alt={`${brandName} ${car.model}`}
            />
          ) : (
            <CarPlaceholder brand={brandName} model={car.model} className="car-placeholder--fill" />
          )}

          <span className={`modal__badge${available ? '' : ' modal__badge--sold'}`}>
            {available ? tm.available : tm.sold}
          </span>

          {car.eco_sticker && ecoLabels[car.eco_sticker] && (
            <div className={`modal__eco modal__eco--${car.eco_sticker}`}>
              {ecoLabels[car.eco_sticker]}
            </div>
          )}

          {allImages.length > 1 && (
            <>
              <button
                className="modal__arrow modal__arrow--prev"
                onClick={() => setPhotoIdx((photoIdx - 1 + allImages.length) % allImages.length)}
              >‹</button>
              <button
                className="modal__arrow modal__arrow--next"
                onClick={() => setPhotoIdx((photoIdx + 1) % allImages.length)}
              >›</button>
              <div className="modal__dots">
                {allImages.map((_, i) => (
                  <button key={i} onClick={() => setPhotoIdx(i)}
                    className={`modal__dot${photoIdx === i ? ' modal__dot--active' : ''}`} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="modal__content">
          <div className="modal__header">
            <div>
              <div className="modal__brand">{brandName}</div>
              <h2 className="modal__model">{car.model}</h2>
              <div className="modal__meta">
                <span>{car.year}</span>
                <span>{car.mileage?.toLocaleString()} {tm.km}</span>
                <span>{car.fuel}</span>
              </div>
            </div>
            <div className="modal__price">{car.price?.toLocaleString()} €</div>
          </div>

          <div className="modal__specs">
            {[
              [tm.specs.engine, Number(car.engine_capacity) > 0 ? `${car.engine_capacity} L` : '—'],
              [tm.specs.transmission, t.catalog.transmissions[car.transmission] || car.transmission],
              [tm.specs.body, t.catalog.bodyTypes[car.body_type] || car.body_type],
              [tm.specs.fuel, t.catalog.fuels[car.fuel] || car.fuel],
              [tm.specs.color, t.catalog.colors[car.color] || car.color],
              [tm.specs.year, car.year],
            ].map(([k, v]) => (
              <div key={k} className="modal__spec">
                <div className="modal__spec-label">{k}</div>
                <div className="modal__spec-value">{v}</div>
              </div>
            ))}
          </div>

          {description && (
            <div className="modal__description">{renderDescription(description)}</div>
          )}

          {available ? (
            <div className="modal__cta">
              <a href={`https://wa.me/${WHATSAPP}?text=Hola! Me interesa el ${brandName} ${car.model} ${car.year}`}
                target="_blank" rel="noreferrer"
                className="modal__btn-whatsapp">
                <WhatsAppIcon size={20} /> {tm.whatsapp}
              </a>
              <a href="https://t.me/AutosCarAlicante" target="_blank" rel="noreferrer"
                className="modal__btn-telegram">
                <TelegramIcon size={18} /> Telegram
              </a>
            </div>
          ) : (
            <div className="modal__sold">
              <div className="modal__sold-text">{tm.soldText}</div>
              <a href={`https://wa.me/${WHATSAPP}?text=Здравствуйте! Ищу авто, похожее на ${brandName} ${car.model}. Есть что-то подобное?`}
                target="_blank" rel="noreferrer"
                className="modal__btn-find">
                {tm.findSimilar}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
