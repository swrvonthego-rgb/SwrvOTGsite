import React from 'react';
import { Database, Globe, FileText, CheckCircle, ArrowRight, Mic, BookOpen, Shield, Star, Briefcase, Music } from 'lucide-react';
import { SERVICES } from '../constants';

const IconMap: Record<string, React.ReactNode> = {
  "Database": <Mic size={40} strokeWidth={1.5} />,
  "Globe": <Star size={40} strokeWidth={1.5} />,
  "FileText": <BookOpen size={40} strokeWidth={1.5} />,
  "CheckCircle": <Shield size={40} strokeWidth={1.5} />,
  "Briefcase": <Briefcase size={40} strokeWidth={1.5} />,
  "Music": <Music size={40} strokeWidth={1.5} />
};

export const Services: React.FC = () => {
  return (
    <section id="ecosystem" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="mb-20">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900 tracking-widest uppercase mb-2">
              Zion SWRV Birdsong
            </h3>
            <div className="w-16 h-1.5 bg-lion-orange rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black max-w-2xl leading-tight">
            The SWRV Ecosystem
          </h2>
          <p className="mt-6 text-gray-600 max-w-2xl text-lg leading-relaxed">
            You are the brand. Everything else is a branch. Explore the central hub for artist development, physical training, authorship, and wisdom.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => {
            const isBYOB = service.title === "BYOB Training";
            const isBirdsongMethod = service.title === "Birdsong Method";
            const isExternal = isBYOB || isBirdsongMethod;
            const href = isBYOB ? "https://trainbyob.me" : isBirdsongMethod ? "#birdsong-method" : `#${service.title.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <a 
                key={idx} 
                href={href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className="group cursor-pointer border-b border-gray-200 pb-8 hover:border-lion-orange transition-colors duration-300 block"
              >
                <div className="text-gray-400 mb-8 group-hover:text-lion-orange transition-colors duration-300">
                  {IconMap[service.icon]}
                </div>
                <h3 className="text-xl font-bold text-black mb-1 group-hover:text-lion-orange transition-colors">
                  {service.title}
                </h3>
                {isBYOB && (
                  <p className="text-xs font-semibold text-lion-orange tracking-widest uppercase mb-4">Be Your Own Bodyguard</p>
                )}
                {isBirdsongMethod && (
                  <p className="text-xs font-semibold text-lion-orange tracking-widest uppercase mb-4">Your Voice Is Your Wings</p>
                )}
                {!isBYOB && !isBirdsongMethod && <div className="mb-4" />}
                <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                  {service.description}
                </p>
                <div className="flex items-center text-lion-orange font-bold text-sm tracking-wide opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  {isBYOB ? "VISIT TRAINBYOB.ME" : isBirdsongMethod ? "EXPLORE BIRDSONG METHOD" : "EXPLORE BRANCH"} <ArrowRight size={16} className="ml-2" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};