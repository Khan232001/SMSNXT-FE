import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}

export default Home;
