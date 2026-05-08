export default function CarPlaceholder({ brand, model, style = {} }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 8, ...style,
    }}>
      <svg width="80" height="44" viewBox="0 0 80 44" fill="none">
        <rect x="10" y="20" width="60" height="18" rx="3" fill="rgba(255,255,255,0.12)" />
        <path d="M15 20 L22 10 L58 10 L65 20" fill="rgba(255,255,255,0.12)" />
        <circle cx="20" cy="38" r="6" fill="rgba(255,255,255,0.2)" />
        <circle cx="60" cy="38" r="6" fill="rgba(255,255,255,0.2)" />
        <rect x="25" y="12" width="30" height="8" rx="1" fill="rgba(255,255,255,0.06)" />
      </svg>
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 1.3 }}>
        {brand} {model}<br />фото автомобиля
      </span>
    </div>
  );
}
