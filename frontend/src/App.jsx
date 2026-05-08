import { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Catalog from './components/Catalog';
import CarModal from './components/CarModal';
import WhyUs from './components/WhyUs';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

const ACCENT = '#E8401A';

export default function App() {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <LanguageProvider>
      <Header accent={ACCENT} />
      <Hero accent={ACCENT} />
      <Services accent={ACCENT} />
      <Catalog accent={ACCENT} onCarClick={setSelectedCar} />
      <WhyUs accent={ACCENT} />
      <Contacts accent={ACCENT} />
      <Footer accent={ACCENT} />
      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} accent={ACCENT} />
      )}
    </LanguageProvider>
  );
}
