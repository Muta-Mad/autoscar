import { useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';
import CarPlaceholder from './CarPlaceholder';
import { fetchCars, fetchBrands } from '../api';
import { useLang } from '../LanguageContext';

const ECO_COLORS = { zero: '#00B4D8', eco: '#27AE60', c: '#F2994A', b: '#6FCF97' };
const ECO_LABELS = { zero: '0', eco: 'ECO', c: 'C', b: 'B' };
const API_BASE = 'http://127.0.0.1:8000';

const YEAR = new Date().getFullYear();
const YEAR_OPTIONS_VALUES = [];
for (let y = YEAR; y >= 2000; y--) YEAR_OPTIONS_VALUES.push(y);

function Select({ value, onChange, options, accent }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700,
        background: value ? `${accent}15` : '#F2F1EF',
        border: value ? `1.5px solid ${accent}` : '1.5px solid #E0E0DD',
        cursor: 'pointer',
        color: value ? accent : '#444', appearance: 'none', paddingRight: 28,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
      }}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function PriceInput({ placeholder, value, onChange, accent }) {
  return (
    <input
      type="number" placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700,
        background: value ? `${accent}15` : '#F2F1EF',
        border: value ? `1.5px solid ${accent}` : '1.5px solid #E0E0DD',
        color: '#111', width: 110, outline: 'none',
      }}
    />
  );
}

function CarCard({ car, accent, onClick, tc }) {
  const available = car.available && !car.is_sold;
  const brandName = car.brand?.name ?? car.brand;
  const mainImage = car.image || car.images?.[0]?.image;

  return (
    <div onClick={onClick} style={{
      borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
      background: 'white', outline: '1.5px solid #EBEBEB',
      transition: 'transform 0.22s, box-shadow 0.22s',
      opacity: available ? 1 : 0.72,
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.13)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>

      <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: '#1a1a1a' }}>
        {mainImage ? (
          <img src={`${API_BASE}${mainImage}`} alt={`${brandName} ${car.model}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <CarPlaceholder brand={brandName} model={car.model} style={{ position: 'absolute', inset: 0 }} />
        )}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: available ? '#1a1a1a' : 'rgba(0,0,0,0.75)',
            color: available ? '#6FCF97' : '#aaa',
            padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700,
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: available ? '#6FCF97' : '#888' }} />
            {available ? tc.statusBadge.available : tc.statusBadge.sold}
          </span>
        </div>
        {car.eco_sticker && ECO_COLORS[car.eco_sticker] && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: ECO_COLORS[car.eco_sticker], color: 'white',
            padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 800,
          }}>
            {ECO_LABELS[car.eco_sticker]}
          </div>
        )}
      </div>

      <div style={{ padding: '18px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{brandName}</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{car.model}</h3>
          </div>
          <div style={{ fontSize: 20, fontWeight: 900, color: accent, letterSpacing: '-0.02em', flexShrink: 0, marginLeft: 8 }}>
            {car.price?.toLocaleString()} €
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
          {[car.year, `${car.mileage?.toLocaleString()} ${tc.statusBadge.available === 'Available' ? 'km' : 'км'}`, car.fuel].map((v, i) => (
            <span key={i} style={{ fontSize: 13, color: '#444', fontWeight: 400 }}>{v}</span>
          ))}
        </div>
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F0F0EE', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: '#999', fontWeight: 500 }}>{car.transmission}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#444' }}>{tc.details}</span>
        </div>
      </div>
    </div>
  );
}

export default function Catalog({ accent, onCarClick }) {
  const { t } = useLang();
  const tc = t.catalog;

  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('');
  const [fuelFilter, setFuelFilter] = useState('');
  const [transmissionFilter, setTransmissionFilter] = useState('');
  const [ecoFilter, setEcoFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortFilter, setSortFilter] = useState('');
  const [brands, setBrands] = useState([]);
  const [cars, setCars] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchBrands().then((data) => setBrands(data.results || data)).catch(() => {});
  }, []);

  const hasFilters = brandFilter || fuelFilter || transmissionFilter || ecoFilter || colorFilter || yearFilter || minPrice || maxPrice || sortFilter;

  const resetFilters = () => {
    setBrandFilter(''); setFuelFilter(''); setTransmissionFilter('');
    setEcoFilter(''); setColorFilter(''); setYearFilter('');
    setMinPrice(''); setMaxPrice(''); setSortFilter('');
  };

  useEffect(() => {
    setLoading(true);
    setCars([]);
    setNextPage(null);
    const params = {};
    if (statusFilter === 'available') params.available = 'true';
    if (statusFilter === 'sold') params.available = 'false';
    if (brandFilter) params.brand = brandFilter;
    if (fuelFilter) params.fuel = fuelFilter;
    if (transmissionFilter) params.transmission = transmissionFilter;
    if (ecoFilter) params.eco_sticker = ecoFilter;
    if (colorFilter) params.color = colorFilter;
    if (yearFilter) params.year = yearFilter;
    if (minPrice) params.min_price = minPrice;
    if (maxPrice) params.max_price = maxPrice;
    if (sortFilter) params.ordering = sortFilter;

    fetchCars(params)
      .then((data) => { setCars(data.results || data); setNextPage(data.next || null); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [statusFilter, brandFilter, fuelFilter, transmissionFilter, ecoFilter, colorFilter, yearFilter, minPrice, maxPrice, sortFilter]);

  const loadMore = async () => {
    if (!nextPage) return;
    setLoadingMore(true);
    try {
      const res = await fetch(nextPage);
      const data = await res.json();
      setCars((prev) => [...prev, ...(data.results || [])]);
      setNextPage(data.next || null);
    } finally {
      setLoadingMore(false);
    }
  };

  const brandOptions = [
    { value: '', label: tc.allBrands },
    ...brands.map((b) => ({ value: b.id, label: b.name })),
  ];

  const fuelOptions = [
    { value: '', label: tc.fuel },
    ...Object.entries(tc.fuels).map(([v, l]) => ({ value: v, label: l })),
  ];

  const transmissionOptions = [
    { value: '', label: tc.transmission },
    ...Object.entries(tc.transmissions).map(([v, l]) => ({ value: v, label: l })),
  ];

  const colorOptions = [
    { value: '', label: tc.color },
    ...Object.entries(tc.colors).map(([v, l]) => ({ value: v, label: l })),
  ];

  const ecoOptions = [
    { value: '', label: tc.eco },
    { value: 'zero', label: '0 (Cero emisiones)' },
    { value: 'eco', label: 'ECO' },
    { value: 'c', label: 'C' },
    { value: 'b', label: 'B' },
  ];

  const yearOptions = [
    { value: '', label: tc.year },
    ...YEAR_OPTIONS_VALUES.map((y) => ({ value: y, label: y })),
  ];

  const sortOptions = [
    { value: '', label: tc.sort },
    { value: 'price', label: tc.sortPriceAsc },
    { value: '-price', label: tc.sortPriceDesc },
  ];

  const statusOptions = [
    ['all', tc.all],
    ['available', tc.available],
    ['sold', tc.sold],
  ];

  return (
    <section id="catalogo" style={{ background: 'white', padding: 'clamp(60px,8vw,100px) clamp(16px,5vw,60px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionLabel accent={accent} text={tc.label} />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24, marginTop: 12 }}>
          <h2 style={{ fontSize: 'clamp(28px,5vw,52px)', fontWeight: 900, letterSpacing: '-0.025em' }}>{tc.title}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {statusOptions.map(([v, l]) => (
              <button key={v} onClick={() => setStatusFilter(v)} style={{
                padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                background: statusFilter === v ? accent : '#F2F1EF',
                color: statusFilter === v ? 'white' : '#555',
                transition: 'all 0.2s', border: 'none', cursor: 'pointer',
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap', alignItems: 'center' }}>
          <Select value={brandFilter} onChange={setBrandFilter} options={brandOptions} accent={accent} />
          <Select value={fuelFilter} onChange={setFuelFilter} options={fuelOptions} accent={accent} />
          <Select value={transmissionFilter} onChange={setTransmissionFilter} options={transmissionOptions} accent={accent} />
          <Select value={colorFilter} onChange={setColorFilter} options={colorOptions} accent={accent} />
          <Select value={ecoFilter} onChange={setEcoFilter} options={ecoOptions} accent={accent} />
          <Select value={yearFilter} onChange={setYearFilter} options={yearOptions} accent={accent} />
          <PriceInput placeholder={tc.priceFrom} value={minPrice} onChange={setMinPrice} accent={accent} />
          <PriceInput placeholder={tc.priceTo} value={maxPrice} onChange={setMaxPrice} accent={accent} />
          <Select value={sortFilter} onChange={setSortFilter} options={sortOptions} accent={accent} />
          {hasFilters && (
            <button onClick={resetFilters}
              style={{ padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#999', background: 'none', border: '1.5px solid #E0E0DD', cursor: 'pointer' }}>
              {tc.reset}
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999', fontSize: 16 }}>{tc.loading}</div>
        ) : cars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#999', fontSize: 16 }}>{tc.notFound}</div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {cars.map((car, i) => (
                <CarCard key={`${car.brand?.name}-${car.model}-${car.year}-${i}`} car={car} accent={accent} onClick={() => onCarClick(car)} tc={tc} />
              ))}
            </div>
            {nextPage && (
              <div style={{ textAlign: 'center', marginTop: 48 }}>
                <button onClick={loadMore} disabled={loadingMore}
                  style={{
                    padding: '14px 40px', borderRadius: 10, fontSize: 15, fontWeight: 700,
                    background: loadingMore ? '#E0E0DD' : accent, color: 'white',
                    border: 'none', cursor: loadingMore ? 'default' : 'pointer',
                  }}>
                  {loadingMore ? tc.loading : tc.loadMore}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
