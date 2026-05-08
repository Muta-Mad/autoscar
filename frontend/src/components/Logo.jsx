export default function Logo({ accent = '#E8401A', dark = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <div style={{ fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: '-0.03em' }}>
        <span style={{ color: accent }}>Autos</span>
        <span style={{ color: dark ? '#0D0D0D' : '#ffffff' }}>Car</span>
      </div>
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: dark ? '#999' : 'rgba(255,255,255,0.4)', marginTop: 2 }}>
        Alicante S.L.
      </div>
    </div>
  );
}
