import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export default function Logo({ className, inverted }: LogoProps) {
  const [error, setError] = useState(false);
  
  // Using the provided URL, but with a fallback mechanism
  const logoUrl = "https://i.namu.wiki/i/llT23hGvU7I1uFm9_Ns4OafehayqioeBydNaSyql0-390KKLTbnzARjVwXLa7hpJMy6EaNq_5rPvJxd4CqrtCg.svg";

  if (error) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", inverted ? "bg-white text-brand-blue" : "bg-brand-blue text-white")}>
          <span className="font-black text-xs">LS</span>
        </div>
        <span className={cn("text-xl font-bold font-display tracking-tighter", inverted ? "text-white" : "text-slate-900")}>
          LS증권
        </span>
      </div>
    );
  }

  return (
    <img 
      src={logoUrl}
      alt="LS Securities" 
      className={cn(
        "h-7 md:h-10 w-auto object-contain transition-all", 
        inverted && "brightness-0 invert", 
        className
      )}
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
}
