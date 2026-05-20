import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLang } from '../LanguageContext';

function LangDisplay() {
  const { lang, setLang, t } = useLang();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="cta">{t.hero.cta}</span>
      <button onClick={() => setLang('ru')}>RU</button>
      <button onClick={() => setLang('en')}>EN</button>
    </div>
  );
}

describe('LanguageContext', () => {
  it('открывается на испанском по умолчанию', () => {
    render(<LanguageProvider><LangDisplay /></LanguageProvider>);
    expect(screen.getByTestId('lang').textContent).toBe('es');
  });

  it('переключается на русский', () => {
    render(<LanguageProvider><LangDisplay /></LanguageProvider>);
    fireEvent.click(screen.getByText('RU'));
    expect(screen.getByTestId('lang').textContent).toBe('ru');
  });

  it('переключается на английский', () => {
    render(<LanguageProvider><LangDisplay /></LanguageProvider>);
    fireEvent.click(screen.getByText('EN'));
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('переводы обновляются при смене языка', () => {
    render(<LanguageProvider><LangDisplay /></LanguageProvider>);
    expect(screen.getByTestId('cta').textContent).toBe('Ver catálogo');
    fireEvent.click(screen.getByText('RU'));
    expect(screen.getByTestId('cta').textContent).toBe('Смотреть каталог');
    fireEvent.click(screen.getByText('EN'));
    expect(screen.getByTestId('cta').textContent).toBe('Browse catalog');
  });
});
