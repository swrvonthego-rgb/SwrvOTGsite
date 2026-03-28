import React, { useState, useRef, useEffect } from 'react';
import { X, Mic, CreditCard, Lock, Music, Briefcase, Globe, ChevronRight, Loader2, Play, Pause, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Button } from './Button';

interface ConsultationWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

type WizardStep = 'intro' | 'dream_input' | 'processing' | 'blueprint';

export const ConsultationWizard: React.FC<ConsultationWizardProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<WizardStep>('intro');
  const [dreamText, setDreamText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [brandPlan, setBrandPlan] = useState<any>(null);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('intro');
      setDreamText('');
      setBrandPlan(null);
    }
  }, [isOpen]);

  const handleProcessDream = async () => {
    setIsAnalyzing(true);
    
    try {
      // Initialize Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are the "SWRV Virtual Executive Producer." You represent the 20-year music industry legacy of Zion "Swrv" Birdsong.
        Your goal is to convert the user's "Happily Ever After" vision into a professional SWRV Brand Plan.
        
        TONE & PHILOSOPHY:
        - You are a senior producer, not a chatbot. Calm, focused, authoritative.
        - Use GPS/Navigation lingo: "Coordinates Locked," "Route Calculated," "Recalculating," "Destination Set."
        - Be a Truth-Teller.
        - Do NOT mention "Villa Rica".
        
        INPUT:
        The user will describe their "Happily Ever After" life at age 50.
        
        OUTPUT:
        Return a JSON object with these exact keys:
        - "coordinates_summary": A concise, professional summary of their vision (e.g., "Destination: Global Philanthropist & Soul Artist").
        - "roadblocks": A list of 3 major industry or logistical hurdles they likely face to get there.
        - "strategic_insight": A deep, "truth-teller" insight about what they need to change *now* to reach that future.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview',
        contents: dreamText || "I want to be a global superstar touring the world.",
        config: {
          responseMimeType: 'application/json',
          systemInstruction: systemInstruction,
        }
      });

      const text = response.text;
      if (text) {
          setBrandPlan(JSON.parse(text));
          setStep('blueprint');
      }
    } catch (error) {
      console.error("Error processing vision:", error);
      // Fallback if API fails
      setBrandPlan({
        coordinates_summary: "Global Legacy & Artistic Freedom",
        roadblocks: ["Undefined Brand Identity", "Lack of Infrastructure", "Inconsistent Output"],
        strategic_insight: "You have the vision, but you lack the vehicle. Without a map, speed is just a faster way to get lost."
      });
      setStep('blueprint');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      {/* Cinematic Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Main Console */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] rounded-xl shadow-[0_0_50px_rgba(255,77,0,0.15)] overflow-hidden flex flex-col max-h-[90vh] border border-white/10">
        
        {/* Header: Executive Producer Console */}
        <div className="bg-black p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 bg-lion-orange rounded-full animate-pulse shadow-[0_0_10px_#FF4D00]"></div>
             <div>
               <h2 className="text-xl font-bold text-white tracking-widest uppercase">SWRV Virtual Producer</h2>
               <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase">Session Active • Legacy Mode</p>
             </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto relative min-h-[500px]">
          
          {/* STEP 1: THE VISION QUESTION */}
          {step === 'intro' && (
            <div className="h-full flex flex-col items-center justify-center p-8 md:p-16 text-center space-y-8 animate-in fade-in duration-500">
               <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                 <Globe className="text-lion-orange w-8 h-8" />
               </div>
               
               <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                 Let's Calibrate Your <br/>
                 <span className="text-lion-orange">Happily Ever After.</span>
               </h3>
               
               <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                 "Imagine you're a young adult with no kids or spouse and you have unlimited resources. 
                 What does your life look like at age 50? Design your life, and talk about a day in your 
                 happily-ever-after in the present tense."
               </p>

               <Button 
                 variant="primary" 
                 size="lg" 
                 onClick={() => setStep('dream_input')}
                 className="mt-8 !text-lg !px-12 !py-4 shadow-[0_0_30px_rgba(255,77,0,0.3)]"
               >
                 ENTER THE BOOTH <ChevronRight className="ml-2" />
               </Button>
            </div>
          )}

          {/* STEP 2: THE DREAM INPUT */}
          {step === 'dream_input' && (
            <div className="h-full flex flex-col p-8 md:p-12 animate-in slide-in-from-right duration-500">
               <div className="mb-6">
                 <h4 className="text-lion-orange font-bold uppercase tracking-widest text-sm mb-2">Recording Vision...</h4>
                 <h3 className="text-3xl font-bold text-white">Speak Your Truth.</h3>
                 <p className="text-gray-500 text-sm mt-2">Be specific. What do you smell? Who is with you? What are you walking on?</p>
               </div>
               
               <textarea
                 className="flex-1 bg-white/5 border border-white/10 rounded-lg p-6 text-white text-lg focus:outline-none focus:border-lion-orange/50 focus:bg-white/10 transition-all resize-none placeholder-gray-600 leading-relaxed"
                 placeholder="At 50, I wake up in my villa overlooking the ocean. The air smells like salt and citrus. I check my phone and see my label is running itself..."
                 value={dreamText}
                 onChange={(e) => setDreamText(e.target.value)}
                 autoFocus
               />
               
               <div className="mt-8 flex justify-between items-center">
                 <div className="flex items-center gap-3 text-gray-500 text-sm">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                   Recording Active
                 </div>
                 <Button 
                   variant="primary" 
                   size="lg"
                   onClick={handleProcessDream}
                   disabled={dreamText.length < 10}
                   className={dreamText.length < 10 ? 'opacity-50 grayscale' : ''}
                 >
                   LOCK COORDINATES
                 </Button>
               </div>
            </div>
          )}

          {/* STEP 4: PROCESSING (LOADING) */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
              <Loader2 className="w-16 h-16 text-lion-orange animate-spin mb-6" />
              <h3 className="text-2xl font-bold text-white tracking-widest animate-pulse">CALCULATING ROUTE...</h3>
              <p className="text-gray-500 mt-2 font-mono text-sm">Analyzing Trajectory • Identifying Gaps • Locking GPS</p>
            </div>
          )}

          {/* STEP 5: THE BLUEPRINT & UPSELL */}
          {step === 'blueprint' && brandPlan && (
             <div className="h-full overflow-y-auto animate-in fade-in duration-700">
               
               {/* Analysis Section */}
               <div className="bg-gradient-to-b from-lion-orange/20 to-black p-8 md:p-12 border-b border-white/10">
                 <div className="flex items-center gap-2 text-lion-orange font-bold uppercase tracking-widest text-xs mb-4">
                   <CheckCircle2 size={14} /> Coordinates Locked
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                   {brandPlan.coordinates_summary}
                 </h2>
                 
                 <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-black/40 p-6 rounded border border-white/10">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Identified Roadblocks</h4>
                      <ul className="space-y-3">
                        {brandPlan.roadblocks.map((block: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                            <span className="text-red-500 mt-1">✕</span> {block}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-black/40 p-6 rounded border border-white/10">
                       <h4 className="text-lion-orange text-xs font-bold uppercase tracking-wider mb-4">Executive Producer Insight</h4>
                       <p className="text-white text-sm leading-relaxed italic border-l-2 border-lion-orange pl-4">
                         "{brandPlan.strategic_insight}"
                       </p>
                    </div>
                 </div>
               </div>

               {/* Upsell Cards */}
               <div className="p-8 md:p-12 bg-[#050505]">
                 <h3 className="text-2xl font-bold text-white mb-8 text-center">Execute Your Vision. <span className="text-gray-600">Choose your vehicle.</span></h3>
                 
                 <div className="grid lg:grid-cols-3 gap-6">
                    {/* Tier 1: The Business */}
                    <div className="bg-[#111] border border-white/5 rounded-lg p-6 hover:border-lion-orange/50 transition-all group">
                       <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-lion-orange transition-colors">
                         <Briefcase className="text-white w-6 h-6" />
                       </div>
                       <h4 className="text-xl font-bold text-white mb-2">The Business</h4>
                       <div className="text-2xl font-bold text-lion-orange mb-4">$500</div>
                       <p className="text-gray-500 text-sm mb-6 h-20">
                         You can't own the road without the right plates. We handle your LLC, PRO registration, and Copyrights.
                       </p>
                       <Button variant="white" className="w-full text-xs">SECURE BUSINESS</Button>
                    </div>

                    {/* Tier 2: The Full Song (Hero) */}
                    <div className="bg-[#1a1a1a] border-2 border-lion-orange rounded-lg p-6 relative transform lg:-translate-y-4 shadow-2xl">
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lion-orange text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                         Recommended
                       </div>
                       <div className="w-12 h-12 bg-lion-orange rounded-full flex items-center justify-center mb-6">
                         <Music className="text-white w-6 h-6" />
                       </div>
                       <h4 className="text-xl font-bold text-white mb-2">The Full Song</h4>
                       <div className="text-2xl font-bold text-lion-orange mb-4">$1,000</div>
                       <p className="text-gray-400 text-sm mb-6 h-20">
                         Your vision needs a voice. Includes Songwriting, Industry-Standard Production, Vocal Tracking, and Mix/Master.
                       </p>
                       <Button variant="primary" className="w-full text-xs">START PRODUCTION</Button>
                    </div>

                    {/* Tier 3: The Hub */}
                    <div className="bg-[#111] border border-white/5 rounded-lg p-6 hover:border-lion-orange/50 transition-all group">
                       <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-lion-orange transition-colors">
                         <Globe className="text-white w-6 h-6" />
                       </div>
                       <h4 className="text-xl font-bold text-white mb-2">The Central Hub</h4>
                       <div className="text-2xl font-bold text-lion-orange mb-4">$350+</div>
                       <p className="text-gray-500 text-sm mb-6 h-20">
                         Every legacy needs a home base. We build your professional, high-performance website.
                       </p>
                       <Button variant="white" className="w-full text-xs">BUILD WEBSITE</Button>
                    </div>
                 </div>
               </div>

             </div>
          )}

        </div>
      </div>
    </div>
  );
};