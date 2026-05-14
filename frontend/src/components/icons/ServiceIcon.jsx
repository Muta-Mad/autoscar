export default function ServiceIcon({ id, size = 36, color = 'currentColor' }) {
  const s = { width: size, height: size, display: 'block' };
  const sw = 2.0;

  const icons = {
    wrench: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 5a8 8 0 0 1 2 8.5L14 24.5a4 4 0 1 1-5.5-5.5L19.5 8A8 8 0 0 1 23 5z" />
        <path d="M11 26l-2-2" />
        <circle cx="10.5" cy="26.5" r="2" fill={color} stroke="none" opacity="0.9" />
        <path d="M26 7l3 3" />
      </svg>
    ),
    car: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18h28v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7z" />
        <path d="M4 18l3.5-8h21l3.5 8" />
        <circle cx="10" cy="26" r="3" />
        <circle cx="26" cy="26" r="3" />
        <path d="M8 13h5M16 13h12" />
        <path d="M7 21h3M26 21h3" />
      </svg>
    ),
    tire: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="15" />
        <circle cx="18" cy="18" r="7" />
        <line x1="18" y1="3" x2="18" y2="11" />
        <line x1="18" y1="25" x2="18" y2="33" />
        <line x1="3" y1="18" x2="11" y2="18" />
        <line x1="25" y1="18" x2="33" y2="18" />
        <line x1="7.5" y1="7.5" x2="13.5" y2="13.5" />
        <line x1="22.5" y1="22.5" x2="28.5" y2="28.5" />
        <line x1="28.5" y1="7.5" x2="22.5" y2="13.5" />
        <line x1="13.5" y1="22.5" x2="7.5" y2="28.5" />
        <circle cx="18" cy="18" r="2.5" fill={color} stroke="none" opacity="0.7" />
      </svg>
    ),
    spray: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="18" width="12" height="14" rx="3" />
        <path d="M16 25h5a3 3 0 0 0 3-3v-5a3 3 0 0 0-3-3h-5" />
        <path d="M21 14V8h5" />
        <path d="M26 5l2-2M30 9l2-2M26 13l2 2" />
        <circle cx="28" cy="9" r="2" fill={color} stroke="none" opacity="0.8" />
        <line x1="8" y1="18" x2="8" y2="14" />
      </svg>
    ),
    globe: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="15" />
        <path d="M18 3c-4 5-6 10-6 15s2 10 6 15" />
        <path d="M18 3c4 5 6 10 6 15s-2 10-6 15" />
        <line x1="3" y1="18" x2="33" y2="18" />
        <path d="M5.5 11h25M5.5 25h25" />
      </svg>
    ),
    document: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 3H9a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10l-7-7z" />
        <path d="M22 3v7h7" />
        <line x1="11" y1="16" x2="25" y2="16" />
        <line x1="11" y1="21" x2="25" y2="21" />
        <line x1="11" y1="26" x2="18" y2="26" />
      </svg>
    ),
    trophy: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 5h16v8a8 8 0 0 1-16 0V5z" />
        <path d="M10 8H5v3a4 4 0 0 0 4 4M26 8h5v3a4 4 0 0 1-4 4" />
        <path d="M14 23h8M13 31h10M18 23v8" />
      </svg>
    ),
    shield: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 4l11 4v9c0 7-5 12-11 15-6-3-11-8-11-15V8l11-4z" />
        <path d="M13 18l4 4 7-7" />
      </svg>
    ),
    search: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="15" cy="15" r="9" />
        <line x1="22" y1="22" x2="30" y2="30" />
        <path d="M11 15h8M15 11v8" opacity="0.5" />
      </svg>
    ),
    chat: (
      <svg style={s} viewBox="0 0 36 36" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H14l-7 6v-6H8a3 3 0 0 1-3-3V8z" />
        <line x1="11" y1="13" x2="25" y2="13" />
        <line x1="11" y1="18" x2="21" y2="18" />
      </svg>
    ),
  };

  return icons[id] || null;
}
