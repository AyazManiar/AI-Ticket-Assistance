import React from 'react';

const SignupIllustration = () => {
  return (
    <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="400" height="300" fill="transparent"/>
      
      {/* Main illustration - Signup/Team building concept */}
      {/* People icons */}
      <g transform="translate(80,120)">
        {/* Person 1 */}
        <circle cx="20" cy="20" r="12" fill="#666"/>
        <circle cx="20" cy="15" r="5" fill="white"/>
        <path d="M10 30 C10 25 14 22 20 22 C26 22 30 25 30 30" fill="white"/>
      </g>
      
      <g transform="translate(140,140)">
        {/* Person 2 */}
        <circle cx="20" cy="20" r="12" fill="#333"/>
        <circle cx="20" cy="15" r="5" fill="white"/>
        <path d="M10 30 C10 25 14 22 20 22 C26 22 30 25 30 30" fill="white"/>
      </g>
      
      <g transform="translate(200,110)">
        {/* Person 3 */}
        <circle cx="20" cy="20" r="12" fill="#555"/>
        <circle cx="20" cy="15" r="5" fill="white"/>
        <path d="M10 30 C10 25 14 22 20 22 C26 22 30 25 30 30" fill="white"/>
      </g>
      
      {/* Skills/badges floating around */}
      <g transform="translate(280,80)">
        <rect x="0" y="0" width="60" height="20" rx="10" fill="#f0f9ff"/>
        <text x="30" y="13" textAnchor="middle" fill="#0369a1" fontSize="10" fontFamily="Arial">React</text>
      </g>
      
      <g transform="translate(50,80)">
        <rect x="0" y="0" width="70" height="20" rx="10" fill="#f0fdf4"/>
        <text x="35" y="13" textAnchor="middle" fill="#16a34a" fontSize="10" fontFamily="Arial">Node.js</text>
      </g>
      
      <g transform="translate(320,180)">
        <rect x="0" y="0" width="50" height="20" rx="10" fill="#fef3c7"/>
        <text x="25" y="13" textAnchor="middle" fill="#d97706" fontSize="10" fontFamily="Arial">AI</text>
      </g>
      
      <g transform="translate(40,200)">
        <rect x="0" y="0" width="60" height="20" rx="10" fill="#f3e8ff"/>
        <text x="30" y="13" textAnchor="middle" fill="#9333ea" fontSize="10" fontFamily="Arial">Python</text>
      </g>
      
      {/* Central connection hub */}
      <circle cx="200" cy="160" r="25" fill="#000"/>
      <circle cx="200" cy="160" r="20" fill="#333"/>
      <text x="200" y="165" textAnchor="middle" fill="white" fontSize="12" fontFamily="Arial">AI</text>
      
      {/* Connection lines from people to center */}
      <path d="M120 140 Q160 150 175 160" stroke="#e5e5e5" strokeWidth="2" fill="none"/>
      <path d="M180 150 Q190 155 175 160" stroke="#e5e5e5" strokeWidth="2" fill="none"/>
      <path d="M240 130 Q220 145 225 160" stroke="#e5e5e5" strokeWidth="2" fill="none"/>
      
      {/* Connection lines from center to skills */}
      <path d="M215 145 Q250 120 310 100" stroke="#e5e5e5" strokeWidth="1" fill="none" strokeDasharray="3,3"/>
      <path d="M185 145 Q120 120 85 100" stroke="#e5e5e5" strokeWidth="1" fill="none" strokeDasharray="3,3"/>
      <path d="M215 175 Q270 175 320 190" stroke="#e5e5e5" strokeWidth="1" fill="none" strokeDasharray="3,3"/>
      <path d="M185 175 Q110 180 70 210" stroke="#e5e5e5" strokeWidth="1" fill="none" strokeDasharray="3,3"/>
      
      {/* Plus icons for adding */}
      <g transform="translate(60,50)">
        <circle cx="8" cy="8" r="8" fill="#4ade80"/>
        <path d="M5 8 L11 8 M8 5 L8 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </g>
      
      <g transform="translate(320,40)">
        <circle cx="8" cy="8" r="8" fill="#4ade80"/>
        <path d="M5 8 L11 8 M8 5 L8 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </g>
      
      {/* Decorative elements */}
      <circle cx="350" cy="250" r="3" fill="#e5e5e5"/>
      <circle cx="30" cy="250" r="2" fill="#d0d0d0"/>
      <circle cx="370" cy="80" r="4" fill="#f0f0f0"/>
    </svg>
  );
};

export default SignupIllustration;
