export default function Logo({ dark = false }) {
  return (
    <div className="logo">
      <div className="logo__name">
        <span className="logo__accent">Autos</span>
        <span className={dark ? 'logo__car--dark' : 'logo__car'}>Car</span>
      </div>
      <div className={`logo__sub${dark ? ' logo__sub--dark' : ''}`}>
        Alicante S.L.
      </div>
    </div>
  );
}
