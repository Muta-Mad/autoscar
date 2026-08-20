import WhatsAppIcon from './icons/WhatsAppIcon';
import { useLang } from '../LanguageContext';

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="hero" className="hero">
      <div className="hero__bg-blur" style={{ backgroundImage: 'url(/hero-car.jpg)' }} />
      <div className="hero__grid" />
      <div className="hero__glow" />
      <div className="hero__photo-col">
        <img src="/hero-car.jpg" alt="" className="hero__photo" />
        <div className="hero__photo-fade" />
      </div>

      <div className="hero__content">
        <div>
          <div className="hero__badge">
            <div className="hero__badge-dot" />
            <span className="hero__badge-text">{t.hero.badge}</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-brand">
              <span className="hero__title-autos">Autos</span><span className="hero__title-car">Car</span>
            </span>
            <span className="hero__title-tagline">
              {t.hero.tagline1} {t.hero.tagline2}
            </span>
          </h1>

          <p className="hero__subtitle">{t.hero.subtitle}</p>

          <div className="hero__cta">
            <a href="#catalogo" className="hero__btn-primary">
              {t.hero.cta} <span className="hero__btn-arrow">→</span>
            </a>
            <a href="#contacto" className="hero__btn-secondary">
              <WhatsAppIcon size={18} /> {t.hero.contact}
            </a>
          </div>

          <div className="hero__stats">
            {t.hero.stats.map(([n, l]) => (
              <div key={n}>
                <div className="hero__stat-num">{n}</div>
                <div className="hero__stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div />
      </div>
    </section>
  );
}
