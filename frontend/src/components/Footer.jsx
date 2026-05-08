import Logo from './Logo';
import { useLang } from '../LanguageContext';

export default function Footer() {
  const { t } = useLang();

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
              <div className="footer__col-label">{t.footer.services}</div>
              {t.footer.links.map((s) => (
                <div key={s} className="footer__link">{s}</div>
              ))}
            </div>
            <div>
              <div className="footer__col-label">{t.footer.contacts}</div>
              <div className="footer__contact">t.me/AutosCarAlicante</div>
              <div className="footer__contact">+34 600 000 000</div>
              <div className="footer__contact">Alicante, España</div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__copy">{t.footer.copyright}</div>
          <div className="footer__copy">{t.footer.privacy}</div>
        </div>
      </div>
    </footer>
  );
}
