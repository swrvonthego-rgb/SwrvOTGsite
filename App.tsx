import React, { useState } from 'react';
import { Header } from './components/Header';
import { SecondaryIntro } from './components/SecondaryIntro';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { ConsultationWizard } from './components/ConsultationWizard';
import { WebsiteVisionGenerator } from './components/WebsiteVisionGenerator';
import { Play } from 'lucide-react';
import { BrandTransmission } from './components/BrandTransmission';

const App: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isVisionGeneratorOpen, setIsVisionGeneratorOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-sans">
        <button 
          onClick={() => setHasStarted(true)}
          className="group relative bg-lion-orange text-white px-12 py-6 font-bold uppercase tracking-widest text-lg hover:bg-white hover:text-lion-orange transition-all duration-300 rounded-sm shadow-[0_0_40px_rgba(255,77,0,0.6)] hover:shadow-[0_0_60px_rgba(255,77,0,1)] border border-lion-orange overflow-hidden flex items-center gap-4"
        >
          <span className="relative z-10 flex items-center gap-3">
            <Play fill="currentColor" size={24} />
            Enter Experience
          </span>
          <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
        </button>
        <p className="mt-8 text-white/50 text-sm tracking-widest uppercase">Click to enable audio & animations</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-lion-black">
      <Header />
      
      <main>
        <SecondaryIntro />
        <Hero 
          onOpenConsultation={() => setIsWizardOpen(true)} 
          onOpenVisionGenerator={() => setIsVisionGeneratorOpen(true)}
        />
        <Services />
        <BrandTransmission />
        <Stats />
      </main>

      <Footer />
      
      <ConsultationWizard 
        isOpen={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)} 
      />
      
      <WebsiteVisionGenerator 
        isOpen={isVisionGeneratorOpen}
        onClose={() => setIsVisionGeneratorOpen(false)}
      />
    </div>
  );
};

export default App;