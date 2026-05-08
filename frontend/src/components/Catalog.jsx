import { useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';
import CarPlaceholder from './CarPlaceholder';
import { fetchCars, fetchBrands } from '../api';
import { useLang } from '../LanguageContext';

const ECO_LABELS = { zero: '0', eco: 'ECO', c: 'C', b: 'B' };
const API_BASE = import.meta.env.VITE_API_URL;

const YEAR = new Date().getFullYear();
const YEAR_OPTIONS_VALUES = [];
for (let y = YEAR; y >= 2000; y--) YEAR_OPTIONS_VALUES.push(y);

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className={`catalog__select${value ? ' catalog__select--active' : ''}`}>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function PriceInput({ placeholder, value, onChange }) {
  return (
    <input
      type="number" placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`catalog__input${value ? ' catalog__input--active' : ''}`}
    />
  );
}

function CarCard({ car, onClick, tc }) {
  const available = car.available && !car.is_sold;
  const brandName = car.brand?.name ?? car.brand;
  const mainImage = car.image || car.images?.[0]?.image;

  return (
    <div onClick={onClick} className={`car-card${available ? '' : ' car-card--sold'}`}>
      <div className="car-card__img-wrap">
        {mainImage ? (
          <img src={`${API_BASE}${mainImage}`} alt={`${brandName} ${car.model}`} className="car-card__img" />
        ) : (
          <CarPlaceholder brand={brandName} model={car.model} className="car-placeholder--fill" />
        )}
        <span className={`car-card__badge${available ? '' : ' car-card__badge--sold'}`}>
          <span className={`car-card__badge-dot${available ? '' : ' car-card__badge-dot--sold'}`} />
          {available ? tc.statusBadge.available : tc.statusBadge.sold}
        </span>
        {car.eco_sticker && ECO_LABELS[car.eco_sticker] && (
          <div className={`car-card__eco car-card__eco--${car.eco_sticker}`}>
            {ECO_LABELS[car.eco_sticker]}
          </div>
        )}
      </div>

      <div className="car-card__body">
        <div className="car-card__top">
          <div>
            <div className="car-card__brand">{brandName}</div>
            <h3 className="car-card__model">{car.model}</h3>
          </div>
          <div className="car-card__price">{car.price?.toLocaleString()} €</div>
        </div>
        <div className="car-card__specs">
          {[car.year, `${car.mileage?.toLocaleString()} ${tc.statusBadge.available === 'Available' ? 'km' : 'км'}`, car.fuel].map((v, i) => (
            <span key={i} className="car-card__spec">{v}</span>
          ))}
        </div>
        <div className="car-card__footer">
          <span className="car-card__transmission">{car.transmission}</span>
          <span className="car-card__details">{tc.details}</span>
        </div>
      </div>
    </div>
  );
}

export default function Catalog({ onCarClick }) {
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
    <section id="catalogo" className="catalog">
      <div className="container">
        <SectionLabel text={tc.label} />
        <div className="catalog__header">
          <h2 className="catalog__title">{tc.title}</h2>
          <div className="catalog__status-btns">
            {statusOptions.map(([v, l]) => (
              <button key={v} onClick={() => setStatusFilter(v)}
                className={`catalog__status-btn${statusFilter === v ? ' catalog__status-btn--active' : ''}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog__filters">
          <Select value={brandFilter} onChange={setBrandFilter} options={brandOptions} />
          <Select value={fuelFilter} onChange={setFuelFilter} options={fuelOptions} />
          <Select value={transmissionFilter} onChange={setTransmissionFilter} options={transmissionOptions} />
          <Select value={colorFilter} onChange={setColorFilter} options={colorOptions} />
          <Select value={ecoFilter} onChange={setEcoFilter} options={ecoOptions} />
          <Select value={yearFilter} onChange={setYearFilter} options={yearOptions} />
          <PriceInput placeholder={tc.priceFrom} value={minPrice} onChange={setMinPrice} />
          <PriceInput placeholder={tc.priceTo} value={maxPrice} onChange={setMaxPrice} />
          <Select value={sortFilter} onChange={setSortFilter} options={sortOptions} />
          {hasFilters && (
            <button onClick={resetFilters} className="catalog__reset">{tc.reset}</button>
          )}
        </div>

        {loading ? (
          <div className="catalog__empty">{tc.loading}</div>
        ) : cars.length === 0 ? (
          <div className="catalog__empty">{tc.notFound}</div>
        ) : (
          <>
            <div className="catalog__grid">
              {cars.map((car, i) => (
                <CarCard key={`${car.brand?.name}-${car.model}-${car.year}-${i}`} car={car} onClick={() => onCarClick(car)} tc={tc} />
              ))}
            </div>
            {nextPage && (
              <div className="catalog__load-more">
                <button onClick={loadMore} disabled={loadingMore}
                  className={`catalog__load-btn${loadingMore ? ' catalog__load-btn--loading' : ''}`}>
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
