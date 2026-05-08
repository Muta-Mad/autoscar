export default function SectionLabel({ accent, text, dark }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 20, height: 3, background: accent, borderRadius: 2 }} />
      <span style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: dark ? 'rgba(255,255,255,0.5)' : '#888',
      }}>
        {text}
      </span>
    </div>
  );
}
