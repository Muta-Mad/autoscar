import { useState, useEffect } from 'react';
import LegalModal from './LegalModal';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
    const openSettings = () => setVisible(true);
    window.addEventListener('open-cookie-settings', openSettings);
    return () => window.removeEventListener('open-cookie-settings', openSettings);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="cookie-banner">
        <div className="cookie-banner__text">
          Utilizamos cookies técnicas y de terceros (Google Maps) para el correcto funcionamiento del sitio.{' '}
          <button className="cookie-banner__more" onClick={() => setShowPolicy(true)}>
            Más información
          </button>
        </div>
        <div className="cookie-banner__actions">
          <button onClick={reject} className="cookie-banner__btn cookie-banner__btn--reject">
            Rechazar
          </button>
          <button onClick={accept} className="cookie-banner__btn cookie-banner__btn--accept">
            Aceptar
          </button>
        </div>
      </div>
      {showPolicy && <LegalModal type="cookies" onClose={() => setShowPolicy(false)} />}
    </>
  );
}
