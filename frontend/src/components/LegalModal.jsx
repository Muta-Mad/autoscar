import { useEffect } from 'react';

const CONTENT = {
  privacy: {
    title: 'Política de Privacidad',
    body: `
**Responsable del tratamiento**
AutosCar Alicante S.L. — CIF: [COMPLETAR]
Dirección: [COMPLETAR DIRECCIÓN REGISTRAL], Alicante, España
Email: [COMPLETAR EMAIL]

**Datos que recogemos**
Recogemos únicamente los datos que usted nos proporciona voluntariamente a través de formularios de contacto, WhatsApp o Telegram: nombre, teléfono y correo electrónico.

**Finalidad**
Los datos se utilizan exclusivamente para atender su consulta o gestionar la compraventa de vehículos. No se ceden a terceros.

**Base legal**
Consentimiento del interesado (Art. 6.1.a RGPD).

**Conservación**
Los datos se conservan durante el tiempo necesario para la gestión de su solicitud y, en su caso, durante los plazos legales aplicables.

**Sus derechos**
Puede ejercer sus derechos de acceso, rectificación, supresión, oposición y portabilidad escribiendo a [COMPLETAR EMAIL].

**Autoridad de control**
Agencia Española de Protección de Datos — www.aepd.es
    `,
  },
  legal: {
    title: 'Aviso Legal',
    body: `
**Datos identificativos**
En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información, se informa:

Denominación social: AutosCar Alicante S.L.
CIF: [COMPLETAR]
Domicilio social: [COMPLETAR DIRECCIÓN REGISTRAL], Alicante, España
Email: [COMPLETAR EMAIL]
Inscrita en el Registro Mercantil de Alicante: [COMPLETAR TOMO, FOLIO]

**Objeto**
El presente sitio web tiene carácter informativo y comercial. La empresa se reserva el derecho a modificar los contenidos sin previo aviso.

**Propiedad intelectual**
Todos los contenidos del sitio (textos, imágenes, logotipos) son propiedad de AutosCar Alicante S.L. o de sus proveedores, y están protegidos por la legislación española e internacional sobre propiedad intelectual.

**Responsabilidad**
AutosCar Alicante S.L. no se responsabiliza de los daños derivados del uso del sitio web ni de la información contenida en él.

**Legislación aplicable**
Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de Alicante.
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
