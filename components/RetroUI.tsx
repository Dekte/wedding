import React, { ReactNode } from 'react';

interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export const RetroWindow: React.FC<WindowProps> = ({ title, children, className = "", onClose }) => {
  return (
    <div className={`border-2 border-gray-400 bg-gray-200 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex justify-between items-center border-b-2 border-gray-400">
        <span className="font-bold text-white font-pixel text-sm tracking-wider">{title}</span>
        <div className="flex gap-1">
            <button className="w-4 h-4 bg-gray-300 border border-gray-500 shadow-inner flex items-center justify-center text-[10px] leading-none">_</button>
            <button className="w-4 h-4 bg-gray-300 border border-gray-500 shadow-inner flex items-center justify-center text-[10px] leading-none">□</button>
            <button onClick={onClose} className="w-4 h-4 bg-gray-300 border border-gray-500 shadow-inner flex items-center justify-center text-[10px] leading-none">x</button>
        </div>
      </div>
      <div className="p-4 font-console">
        {children}
      </div>
    </div>
  );
};

export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 translate-x-[2px] text-red-500 opacity-70 mix-blend-screen animate-pulse z-0">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 -translate-x-[2px] text-blue-500 opacity-70 mix-blend-screen animate-pulse delay-75 z-0">{text}</span>
    </div>
  );
};

export const PixelButton: React.FC<{ onClick?: () => void; children: ReactNode; className?: string; type?: "button" | "submit" | "reset" }> = ({ onClick, children, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6 py-2 
        bg-pink-600 text-white font-pixel uppercase tracking-widest
        border-l-2 border-t-2 border-pink-400
        border-r-4 border-b-4 border-pink-900
        active:border-r-2 active:border-b-2 active:border-l-4 active:border-t-4 active:translate-y-1
        transition-all hover:bg-pink-500
        ${className}
      `}
    >
      {children}
    </button>
  );
};
