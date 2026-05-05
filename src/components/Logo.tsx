import React from 'react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export default function Logo({ className, inverted }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/logo.png" 
        alt="LS Securities" 
        className={cn(
          "h-5 md:h-7 w-auto object-contain transition-all duration-300",
          inverted && "brightness-0 invert text-white"
        )}
      />
    </div>
  );
}
