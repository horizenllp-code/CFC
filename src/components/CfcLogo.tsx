import React from 'react';
import logoImg from '../assets/LOGO.png';

interface CfcLogoProps {
  variant?: 'light-badge' | 'dark' | 'simple';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const CfcLogo: React.FC<CfcLogoProps> = ({
  size = 'md',
  className = '',
  showTagline = false,
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'h-7 sm:h-8'
      : size === 'lg'
      ? 'h-12 sm:h-14 md:h-16'
      : size === 'xl'
      ? 'h-16 sm:h-20 md:h-24'
      : 'h-9 sm:h-10 md:h-11 lg:h-12';

  const logoElement = (
    <img
      src="/logo.svg"
      onError={(e) => {
        (e.target as HTMLImageElement).src = logoImg;
      }}
      alt="CFC Logistics Pvt. Ltd."
      className={`${sizeClasses} w-auto object-contain select-none`}
      referrerPolicy="no-referrer"
    />
  );

  if (!showTagline) {
    return <span className={`inline-flex items-center ${className}`}>{logoElement}</span>;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {logoElement}
      <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-amber-400/90 uppercase font-sans border-l border-slate-700 pl-3 whitespace-nowrap">
        Logistically yours
      </span>
    </div>
  );
};

