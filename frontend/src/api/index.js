const BASE = 'http://127.0.0.1:8000/api/v1';

export async function fetchCars(params = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined)
  );
  const query = new URLSearchParams(clean).toString();
  const res = await fetch(`${BASE}/cars/${query ? '?' + query : ''}`);
  if (!res.ok) throw new Error('Failed to fetch cars');
  return res.json();
}

export async function fetchBrands() {
  const res = await fetch(`${BASE}/brands/`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchServices() {
  const res = await fetch(`${BASE}/services/`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}
