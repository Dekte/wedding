import React from 'react';

// A retro container with a "Window" look
export interface RetroWindowProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({ title, children, className = "", onClose }) => (
  <div className={`bg-gray-900 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${className}`}>
    <div className="bg-blue-800 text-white px-2 py-1 font-pixel text-xs flex justify-between items-center border-b-2 border-white">
      <span>{title}</span>
      {onClose && (
        <button onClick={onClose} className="hover:bg-red-500 px-1">X</button>
      )}
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

export interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
}

export const RetroButton: React.FC<RetroButtonProps> = ({ onClick, children, variant = 'primary', className = "", disabled = false, ...props }) => {
  const colors = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white border-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-400",
    accent: "bg-[#ff00ff] hover:bg-[#d600d6] text-white border-white"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${colors[variant]}
        font-pixel text-xs sm:text-sm py-3 px-6 
        border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        active:translate-y-1 active:shadow-none active:translate-x-1
        transition-all duration-75 uppercase tracking-wider
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => (
  <h1 className={`relative inline-block ${className} font-pixel text-4xl md:text-6xl text-white group`}>
    <span className="absolute top-0 left-0 -ml-1 opacity-0 group-hover:opacity-70 animate-pulse text-red-500">{text}</span>
    <span className="absolute top-0 left-0 ml-1 opacity-0 group-hover:opacity-70 animate-pulse text-cyan-500">{text}</span>
    <span className="relative z-10">{text}</span>
  </h1>
);

export const PixelSeparator = () => (
    <div className="w-full h-4 my-8 flex items-center justify-center opacity-50">
        <div className="w-full h-1 bg-white"></div>
        <div className="mx-4 font-pixel text-yellow-400 text-xl">★</div>
        <div className="w-full h-1 bg-white"></div>
    </div>
);