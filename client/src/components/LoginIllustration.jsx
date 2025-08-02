import React from 'react';

const LoginIllustration = () => {
  return (
    <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="300" fill="transparent"/>
      
      {/* Main illustration - Login concept */}
      {/* Computer/Laptop */}
      <rect x="80" y="120" width="120" height="80" rx="4" fill="#333"/>
      <rect x="85" y="125" width="110" height="65" rx="2" fill="#000"/>
      <rect x="90" y="130" width="100" height="55" rx="1" fill="#1a1a1a"/>
      
      {/* Screen content - Login form mockup */}
      <rect x="95" y="140" width="90" height="6" rx="3" fill="#666"/>
      <rect x="95" y="150" width="60" height="4" rx="2" fill="#999"/>
      <rect x="95" y="158" width="90" height="8" rx="4" fill="#e5e5e5"/>
      <rect x="95" y="170" width="90" height="8" rx="4" fill="#e5e5e5"/>
      <rect x="95" y="182" width="40" height="6" rx="3" fill="#000"/>
      
      {/* Laptop base */}
      <ellipse cx="140" cy="205" rx="25" ry="3" fill="#666"/>
      
      {/* Security shield */}
      <g transform="translate(240,80)">
        <path d="M20 10 L35 15 L35 35 C35 45 27.5 52 20 55 C12.5 52 5 45 5 35 L5 15 Z" fill="#4ade80"/>
        <path d="M15 25 L18 28 L25 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      
      {/* User icon */}
      <g transform="translate(300,140)">
        <circle cx="15" cy="12" r="8" fill="#666"/>
        <circle cx="15" cy="8" r="3" fill="white"/>
        <path d="M10 18 C10 15 12 13 15 13 C18 13 20 15 20 18" fill="white"/>
      </g>
      
      {/* Key icon */}
      <g transform="translate(50,60)">
        <circle cx="8" cy="8" r="6" fill="#333"/>
        <circle cx="8" cy="8" r="3" fill="white"/>
        <rect x="12" y="7" width="15" height="2" fill="#333"/>
        <rect x="24" y="5" width="2" height="2" fill="#333"/>
        <rect x="24" y="9" width="2" height="2" fill="#333"/>
      </g>
      
      {/* Floating elements */}
      <circle cx="320" cy="60" r="3" fill="#e5e5e5"/>
      <circle cx="60" cy="40" r="2" fill="#d0d0d0"/>
      <circle cx="350" cy="250" r="4" fill="#f0f0f0"/>
      
      {/* Connection lines */}
      <path d="M200 90 Q250 70 280 90" stroke="#e5e5e5" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
      <path d="M120 60 Q150 40 180 60" stroke="#e5e5e5" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
    </svg>
  );
};

export default LoginIllustration;
