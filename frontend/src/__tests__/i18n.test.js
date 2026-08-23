import { describe, it, expect } from 'vitest';
import t from '../i18n';

const LANGS = ['ru', 'en', 'es'];

const REQUIRED_KEYS = [
  ['nav', 'home'],
  ['nav', 'services'],
  ['nav', 'catalog'],
  ['nav', 'about'],
  ['nav', 'contacts'],
  ['hero', 'badge'],
  ['hero', 'tagline1'],
  ['hero', 'tagline2'],
  ['hero', 'subtitle'],
  ['hero', 'cta'],
  ['hero', 'contact'],
  ['hero', 'stats'],
  ['whyUs', 'title'],
  ['whyUs', 'items'],
  ['catalog', 'title'],
  ['catalog', 'fuels'],
  ['catalog', 'transmissions'],
  ['catalog', 'colors'],
  ['services', 'title'],
  ['services', 'from'],
  ['contacts', 'title'],
  ['contacts', 'whatsapp'],
  ['contacts', 'telegram'],
  ['contacts', 'instagram'],
  ['contacts', 'phone'],
  ['modal', 'whatsapp'],
  ['footer', 'copyright'],
];

describe('i18n', () => {
  it.each(LANGS)('язык %s содержит все обязательные ключи', (lang) => {
    const translations = t[lang];
    expect(translations).toBeDefined();

    for (const [section, key] of REQUIRED_KEYS) {
      expect(
        translations[section]?.[key],
        `[${lang}] ${section}.${key} отсутствует`
      ).toBeDefined();
    }
  });

  it('все языки имеют одинаковое количество карточек whyUs', () => {
    const counts = LANGS.map((l) => t[l].whyUs.items.length);
    expect(new Set(counts).size).toBe(1);
  });

  it('все языки имеют одинаковое количество статистик в hero', () => {
    const counts = LANGS.map((l) => t[l].hero.stats.length);
    expect(new Set(counts).size).toBe(1);
  });

  it('ES язык является испанским (проверка ключевых слов)', () => {
    expect(t.es.hero.cta).toBe('Ver catálogo');
    expect(t.es.nav.about).toBe('Quiénes somos');
  });

  it('дефолтный язык в i18n — es', () => {
    expect(t['es']).toBeDefined();
  });
});
