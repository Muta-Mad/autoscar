import { useState } from 'react';
import Logo from './Logo';
import LegalModal from './LegalModal';
import { useLang } from '../LanguageContext';

export default function Footer() {
  const { t } = useLang();
  const [legalType, setLegalType] = useState(null);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo />
            <p className="footer__desc">{t.footer.description}</p>
          </div>
          <div className="footer__links">
            <div>
              <div className="footer__col-label">{t.footer.contacts}</div>
              <div className="footer__contact">t.me/AutosCarAlicante</div>
              <div className="footer__contact">+34 610 268 321</div>
              <div className="footer__contact">Alicante, España</div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__copy">{t.footer.copyright}</div>
          <div className="footer__legal-links">
            <button onClick={() => setLegalType('privacy')} className="footer__legal-btn">
              Política de privacidad
            </button>
            <span className="footer__legal-sep">·</span>
            <button onClick={() => setLegalType('legal')} className="footer__legal-btn">
              Aviso legal
            </button>
          </div>
        </div>
      </div>
      {legalType && <LegalModal type={legalType} onClose={() => setLegalType(null)} />}
    </footer>
  );
}
