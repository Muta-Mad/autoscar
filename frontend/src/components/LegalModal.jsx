import { useEffect } from 'react';

const CONTENT = {
  privacy: {
    title: 'Política de Privacidad',
    body: `
**Responsable del tratamiento**
Denominación social: AutosCar Alicante S.L.
CIF: B54402672
Dirección: C. Guillermo Stewart Howie, 64, 03006 Alicante, España
Email: autoscar.es@gmail.com

**Datos que recogemos**
Recogemos únicamente los datos que usted nos proporciona voluntariamente a través de nuestros formularios de contacto, WhatsApp o Telegram: nombre, teléfono y correo electrónico.

**Finalidad**
Los datos se utilizan exclusivamente para atender su consulta, gestionar la relación comercial o procesar la compraventa de vehículos. No se ceden a terceros, salvo obligación legal.

**Base legal**
Consentimiento del interesado (Art. 6.1.a RGPD) y, en su caso, la ejecución de un contrato o medidas precontractuales (Art. 6.1.b RGPD).

**Conservación**
Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad y del tratamiento de los datos.

**Sus derechos**
Tiene derecho a acceder, rectificar, suprimir, oponerse, limitar el tratamiento y solicitar la portabilidad de sus datos. Puede ejercer estos derechos enviando un correo electrónico a autoscar.es@gmail.com, adjuntando una copia de su documento de identidad (DNI/NIE) para verificar su identidad. También tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
    `,
  },
  legal: {
    title: 'Aviso Legal',
    body: `
**Datos identificativos**
En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE):

Denominación social: AutosCar Alicante S.L.
CIF: B54402672
Dirección: C. Guillermo Stewart Howie, 64, 03006 Alicante, España
Email: autoscar.es@gmail.com
Teléfono: +34 610 268 321
Datos registrales: Inscrita en el Registro Mercantil de Alicante (Recomendado rellenar: Tomo, Folio, Hoja).

**Objeto**
El presente sitio web tiene carácter informativo y comercial. La empresa se reserva el derecho a modificar los contenidos, estructura y diseño del sitio sin previo aviso.

**Propiedad intelectual**
Todos los contenidos del sitio (textos, imágenes, logotipos, diseño) son propiedad de AutosCar Alicante S.L. o de sus licenciantes y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial. Queda prohibida su reproducción o distribución sin autorización expresa.

**Responsabilidad**
AutosCar Alicante S.L. no se responsabiliza de los daños derivados del uso del sitio web, ni de los errores de seguridad que puedan producirse en el sistema informático del usuario.

**Legislación aplicable**
Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Alicante, renunciando a cualquier otro fuero que pudiera corresponderles.
    `,
  },
  cookies: {
    title: 'Política de Cookies',
    body: `
**¿Qué son las cookies?**
Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten que el sitio recuerde sus acciones y preferencias durante un período de tiempo.

**Cookies que utilizamos**
El sitio web autoscar.es utiliza cookies técnicas necesarias para el funcionamiento del sitio y cookies de terceros (como Google Maps) para analizar el tráfico y ofrecer funcionalidades de mapas.

**Cookies técnicas (necesarias)**
Son imprescindibles para el correcto funcionamiento del sitio web. Sin ellas, algunos servicios no estarían disponibles.

**Cookies de terceros**
Google Maps: utilizadas para mostrar la ubicación del concesionario. Estas cookies están sujetas a la política de privacidad de Google.

**¿Cómo gestionar las cookies?**
Usted puede aceptar, configurar o rechazar el uso de cookies a través del banner de consentimiento de nuestro sitio web. Asimismo, puede desactivar o eliminar las cookies en cualquier momento a través de la configuración de su navegador. Tenga en cuenta que bloquear las cookies técnicas puede afectar al correcto funcionamiento de la web.

**Más información**
Para más información sobre el uso de cookies, puede consultar la web de la Agencia Española de Protección de Datos (AEPD): www.aepd.es
    `,
  },
};

export default function LegalModal({ type, onClose }) {
  const { title, body } = CONTENT[type];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', fn);
    };
  }, [onClose]);

  return (
    <div onClick={onClose} className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()} className="legal-modal">
        <button onClick={onClose} className="modal__close">✕</button>
        <h2 className="legal-modal__title">{title}</h2>
        <div className="legal-modal__body">
          {body.trim().split('\n').map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={i} className="legal-modal__heading">{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.trim() === '') return <br key={i} />;
            return <p key={i} className="legal-modal__text">{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
}
