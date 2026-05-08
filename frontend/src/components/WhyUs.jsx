import SectionLabel from './SectionLabel';
import ServiceIcon from './icons/ServiceIcon';
import { useLang } from '../LanguageContext';

const ICONS = ['trophy', 'shield', 'search', 'globe', 'chat', 'document'];

export default function WhyUs() {
  const { t } = useLang();

  return (
    <section id="nosotros" className="whyus">
      <div className="container">
        <SectionLabel text={t.whyUs.label} dark />
        <h2 className="whyus__title">
          {t.whyUs.title}<br />{t.whyUs.titleLine2}
        </h2>
        <div className="whyus__grid">
          {t.whyUs.items.map((it, i) => (
            <div key={i} className="whyus__card">
              <div className="whyus__icon">
                <ServiceIcon id={ICONS[i]} size={36} color="var(--accent)" />
              </div>
              <h3 className="whyus__card-title">{it.title}</h3>
              <p className="whyus__card-body">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
