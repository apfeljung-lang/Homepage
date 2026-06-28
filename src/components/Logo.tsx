import React from 'react';
import { cn } from '@/src/lib/utils';
// @ts-ignore
import logoUrl from './logo.png';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export default function Logo({ className, inverted }: LogoProps) {
  const [useFallback, setUseFallback] = React.useState(false);

  if (useFallback) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="flex items-center h-5 md:h-7">
          <svg viewBox="0 0 240 60" className="h-full w-auto" preserveAspectRatio="xMinYMid meet">
            {/* LS Group Logo reconstruction */}
            <g transform="skewX(-15)">
              <path 
                fill={!inverted ? "#00338D" : "#FFFFFF"} 
                d="M10 45L18 10H28L22 35H40L38 45H10Z" 
              />
              <path 
                fill={!inverted ? "#00338D" : "#FFFFFF"} 
                d="M75 10C65 10 58 14 55 22L65 22C66 18 69 16 74 16C78 16 80 18 80 20C80 23 78 24 72 27C65 31 60 35 58 41C57 47 62 52 70 52C80 52 86 48 88 40L78 40C77 44 75 46 70 46C67 46 65 44 65 42C65 40 67 39 73 36C80 32 85 28 87 21C89 14 85 10 75 10Z" 
              />
              <path 
                fill="#E21F26" 
                d="M70 5C85 5 100 8 108 15L95 18C90 12 80 10 70 10V5Z" 
              />
            </g>
            <text 
              x="115" 
              y="44" 
              fontFamily="Apple SD Gothic Neo, Malgun Gothic, sans-serif" 
              fontSize="28" 
              fontWeight="bold" 
              fill={!inverted ? "#58595B" : "#FFFFFF"}
              letterSpacing="-1.5"
            >
              LS증권
            </text>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logoUrl} 
        alt="LS Securities" 
        className={cn(
          "h-5 md:h-7 w-auto object-contain transition-all duration-300",
          inverted && "brightness-0 invert text-white"
        )}
        onError={() => setUseFallback(true)}
      />
    </div>
  );
}
