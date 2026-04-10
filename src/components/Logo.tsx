import React from 'react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export default function Logo({ className, inverted }: LogoProps) {
  // Direct URL with no-referrer policy to ensure it loads in all environments
  const logoUrl = "https://i.namu.wiki/i/llT23hGvU7I1uFm9_Ns4OafehayqioeBydNaSyql0-390KKLTbnzARjVwXLa7hpJMy6EaNq_5rPvJxd4CqrtCg.svg";

  return (
    <img 
      src={logoUrl}
      alt="LS Securities" 
      loading="eager"
      decoding="async"
      className={cn(
        "h-7 md:h-10 w-auto object-contain transition-all duration-300", 
        inverted && "brightness-0 invert", 
        className
      )}
      referrerPolicy="no-referrer"
    />
  );
}
