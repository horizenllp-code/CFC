import React from 'react';
import { CORE_VALUES } from '../data/cfcData';

export const CoreValuesSection: React.FC = () => {
  return (
    <section className="bg-[#0B192C] text-white py-16 lg:py-24 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header (Exact to Screenshot 3) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-extrabold text-[#F59E0B] tracking-widest uppercase font-heading block mb-2">
            OUR PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-heading">
            BUSINESS CORE VALUES
          </h2>
          {/* Central Red Accent Line */}
          <div className="h-1 w-16 bg-[#DC2626] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Cards Grid with Distinct Top Borders (Exact to Screenshot 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_VALUES.map((val) => (
            <div
              key={val.number}
              style={{ borderTopColor: val.topBorderColor }}
              className="bg-[#0e2238] border border-slate-800/80 border-t-4 rounded-xs p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:translate-y-[-4px] transition-all duration-300 group"
            >
              <div>
                {/* Large Muted Sequence Number */}
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-500/70 font-heading mb-4 select-none">
                  {val.number}
                </div>

                {/* Value Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wider uppercase font-heading group-hover:text-amber-400 transition-colors">
                  {val.title}
                </h3>

                {/* Exact Value Description from CFC Logistics */}
                <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
                  {val.desc}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                <span>CFC LOGISTICS PROTOCOL</span>
                <span style={{ color: val.topBorderColor }}>●</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
