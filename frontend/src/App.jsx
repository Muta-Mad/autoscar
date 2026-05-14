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

export default function App() {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <LanguageProvider>
      <Header />
      <Hero />
      <Services />
      <Catalog onCarClick={setSelectedCar} />
      <WhyUs />
      <Contacts />
      <Footer />
      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </LanguageProvider>
  );
}
