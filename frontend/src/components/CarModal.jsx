import { useState, useEffect } from 'react';
import CarPlaceholder from './CarPlaceholder';
import WhatsAppIcon from './icons/WhatsAppIcon';
import TelegramIcon from './icons/TelegramIcon';
import { useLang } from '../LanguageContext';

const ECO_COLORS = { zero: '#00B4D8', eco: '#27AE60', c: '#F2994A', b: '#6FCF97' };
const ECO_LABELS = { zero: '0 выбросов', eco: 'ECO', c: 'ECO C', b: 'ECO B' };

const API_BASE = 'http://127.0.0.1:8000';

export default function CarModal({ car, onClose, accent }) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const { t, lang } = useLang();
  const tm = t.modal;
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
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px', backdropFilter: 'blur(8px)', overflowY: 'auto',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'white', borderRadius: 20, width: '100%', maxWidth: 860,
        maxHeight: '90vh', overflowY: 'auto', position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 16, right: 16, zIndex: 10,
          background: 'rgba(0,0,0,0.08)', borderRadius: '50%',
          width: 36, height: 36, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 18, cursor: 'pointer', border: 'none',
        }}>✕</button>

        {/* Gallery */}
        <div style={{ height: 'clamp(200px, 35vw, 380px)', background: '#111', borderRadius: '20px 20px 0 0', overflow: 'hidden', position: 'relative' }}>
          {allImages.length > 0 && allImages[photoIdx] ? (
            <img
              src={`${API_BASE}${allImages[photoIdx].image}`}
              alt={`${brandName} ${car.model}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <CarPlaceholder brand={brandName} model={car.model} style={{ position: 'absolute', inset: 0 }} />
          )}

          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <span style={{
              background: available ? '#1a1a1a' : 'rgba(0,0,0,0.75)',
              color: available ? '#6FCF97' : '#aaa',
              padding: '5px 14px', borderRadius: 100, fontSize: 13, fontWeight: 700,
            }}>
              {available ? tm.available : tm.sold}
            </span>
          </div>

          {car.eco_sticker && ECO_COLORS[car.eco_sticker] && (
            <div style={{
              position: 'absolute', top: 12, right: 48,
              background: ECO_COLORS[car.eco_sticker], color: 'white',
              padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 800,
            }}>
              {ECO_LABELS[car.eco_sticker]}
            </div>
          )}

          {allImages.length > 1 && (
            <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
              {allImages.map((_, i) => (
                <button key={i} onClick={() => setPhotoIdx(i)} style={{
                  width: photoIdx === i ? 24 : 8, height: 8, borderRadius: 4,
                  background: photoIdx === i ? accent : 'rgba(255,255,255,0.5)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                }} />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(20px,4vw,36px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{brandName}</div>
              <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, letterSpacing: '-0.02em', color: '#111' }}>{car.model}</h2>
              <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 14, color: '#444', fontWeight: 400 }}>{car.year}</span>
                <span style={{ fontSize: 14, color: '#444', fontWeight: 400 }}>{car.mileage?.toLocaleString()} {tm.km}</span>
                <span style={{ fontSize: 14, color: '#444', fontWeight: 400 }}>{car.fuel}</span>
              </div>
            </div>
            <div style={{ fontSize: 'clamp(26px,5vw,40px)', fontWeight: 900, color: accent, letterSpacing: '-0.03em' }}>
              {car.price?.toLocaleString()} €
            </div>
          </div>

          {/* Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 1, background: '#EBEBEB', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
            {[
              [tm.specs.engine, car.engine_capacity ? `${car.engine_capacity} cc` : '—'],
              [tm.specs.transmission, car.transmission],
              [tm.specs.body, car.body_type],
              [tm.specs.fuel, car.fuel],
              [tm.specs.color, car.color],
              [tm.specs.year, car.year],
            ].map(([k, v]) => (
              <div key={k} style={{ background: '#F7F6F4', padding: '14px 16px' }}>
                <div style={{ fontSize: 11, color: '#999', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{v}</div>
              </div>
            ))}
          </div>

          {description && (
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, marginBottom: 24, fontWeight: 400 }}>{description}</p>
          )}

          {/* CTA */}
          {available ? (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={`https://wa.me/34600000000?text=Hola! Me interesa el ${brandName} ${car.model} ${car.year}`}
                target="_blank" rel="noreferrer"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: '#25D366', color: 'white', padding: '14px 24px',
                  borderRadius: 10, fontSize: 16, fontWeight: 700, minWidth: 200,
                }}>
                <WhatsAppIcon size={20} /> {tm.whatsapp}
              </a>
              <a href="https://t.me/AutosCarAlicante" target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#1a1a1a', color: 'white', padding: '14px 24px',
                  borderRadius: 10, fontSize: 15, fontWeight: 600,
                }}>
                <TelegramIcon size={18} /> Telegram
              </a>
            </div>
          ) : (
            <div style={{ background: '#F7F6F4', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 15, color: '#555', marginBottom: 14, fontWeight: 400 }}>
                {tm.soldText}
              </div>
              <a href={`https://wa.me/34600000000?text=Здравствуйте! Ищу авто, похожее на ${brandName} ${car.model}. Есть что-то подобное?`}
                target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: accent, color: 'white', padding: '12px 24px',
                  borderRadius: 8, fontSize: 15, fontWeight: 700,
                }}>
                {tm.findSimilar}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
