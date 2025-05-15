import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import ComparePackages from '../components/ComparePackages';
import MarketingCards from '../components/MarketingCards';
import MarketingSection from '../components/MarketingSection';
import IndustrySolutions from '../components/IndustrySolutions';
import A2PSecurityCompliance from '../components/A2PSecurityCompliance';
import TextMarketingResources from '../components/TextMarketingResources';
import StepsAndBenefits from '../components/StepsAndBenefits';

function Home() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <MarketingCards/>
      <IndustrySolutions />
      <A2PSecurityCompliance />
      <TextMarketingResources />
      <StepsAndBenefits />
      {/* <MarketingSection /> */}
      <Features />
      {/* <ComparePackages /> */}
      <Footer />
    </div>
  );
}

export default Home;
