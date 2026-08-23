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
        </div>

        <div className="footer__legal-links">
          <button className="footer__legal-btn" onClick={() => setLegalType('legal')}>Aviso legal</button>
          <button className="footer__legal-btn" onClick={() => setLegalType('privacy')}>Política de privacidad</button>
          <button className="footer__legal-btn" onClick={() => setLegalType('cookies')}>Política de cookies</button>
          <button className="footer__legal-btn" onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}>
            Configurar cookies
          </button>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">{t.footer.copyright}</div>
          <div className="footer__dev footer__dev--center">
            {t.footer.dev}:{' '}
            <a href="https://t.me/donnaViktoriia" target="_blank" rel="noopener noreferrer" className="footer__dev-link">
              MenteCode
            </a>
          </div>
          <div></div>
        </div>
      </div>
      {legalType && <LegalModal type={legalType} onClose={() => setLegalType(null)} />}
    </footer>
  );
}
