import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import ComparePackages from '../components/ComparePackages';

function Home() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Features />
      <ComparePackages />
      <Footer />
    </div>
  );
}

export default Home;
