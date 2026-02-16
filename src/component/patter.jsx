import React from "react";

const BackgroundRings = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1600 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        {/* Glowing gradient for pulses */}
        <radialGradient id="pulseGradient" cx="0" cy="0" r="1800">
          <stop offset="0%" stopColor="#ff9d00" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ff9d00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff9d00" stopOpacity="0" />
        </radialGradient>
        
        {/* Wave distortion filter */}
        <filter id="waveFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.02" numOctaves="2" result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        
        {/* Glow effect for rings */}
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Base background */}
      <rect fill="#ff9d00" width="1600" height="800" />
      
      {/* Animated pulse circles */}
      <circle cx="0" cy="0" r="100" fill="url(#pulseGradient)" opacity="0">
        <animate attributeName="r" values="100;1800;1800" dur="8s" repeatCount="indefinite" begin="0s" />
        <animate attributeName="opacity" values="0;0.5;0" dur="8s" repeatCount="indefinite" begin="0s" />
      </circle>
      
      <circle cx="0" cy="0" r="100" fill="url(#pulseGradient)" opacity="0">
        <animate attributeName="r" values="100;1800;1800" dur="8s" repeatCount="indefinite" begin="4s" />
        <animate attributeName="opacity" values="0;0.3;0" dur="8s" repeatCount="indefinite" begin="4s" />
      </circle>
      
      {/* Main rings with breathing animation */}
      <g stroke="rgba(0,0,0,0.25)" strokeWidth="70" strokeOpacity="0.2" filter="url(#glowFilter)">
        {[1800, 1700, 1600, 1500, 1400, 1300, 1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100].map((radius, index) => {
          const colors = [
            "#ff9d00", "#f27d00", "#e55f00", "#d84400", "#cb2c00", 
            "#bf1600", "#b20300", "#a5000e", "#98001c", "#8b0027", 
            "#7e0030", "#710037", "#64003b", "#58003c", "#4b003a", 
            "#3e0037", "#310030", "#210024"
          ];
          
          return (
            <circle
              key={radius}
              fill={colors[index]}
              cx="0"
              cy="0"
              r={radius}
              opacity={0.9 - (index * 0.05)}
            >
              {/* Breathing animation */}
              <animate
                attributeName="stroke-width"
                values={`${70};${75};${70}`}
                dur={`${4 + index * 0.5}s`}
                repeatCount="indefinite"
                begin={`${index * 0.2}s`}
              />
              <animate
                attributeName="opacity"
                values={`${0.9 - (index * 0.05)};${0.95 - (index * 0.05)};${0.9 - (index * 0.05)}`}
                dur={`${5 + index * 0.3}s`}
                repeatCount="indefinite"
                begin={`${index * 0.1}s`}
              />
            </circle>
          );
        })}
      </g>
      
      {/* Rotating inner rings */}
      <g transform="translate(0, 0)">
        <g>
          {[...Array(8)].map((_, i) => (
            <circle
              key={`inner-${i}`}
              cx={Math.cos(i * Math.PI / 4) * 300}
              cy={Math.sin(i * Math.PI / 4) * 300}
              r="40"
              fill={`rgba(255, 255, 255, ${0.1 + i * 0.02})`}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur={`${20 + i * 2}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="40;50;40"
                dur={`${3 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
        
        {/* Second ring of rotating circles */}
        <g>
          {[...Array(12)].map((_, i) => (
            <circle
              key={`outer-${i}`}
              cx={Math.cos(i * Math.PI / 6) * 600}
              cy={Math.sin(i * Math.PI / 6) * 600}
              r="20"
              fill={`rgba(255, 200, 100, ${0.15})`}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 0 0"
                to="0 0 0"
                dur={`${25 + i * 3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.1;0.3;0.1"
                dur={`${4 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      </g>
      
      {/* Floating particles */}
      <g>
        {[...Array(30)].map((_, i) => {
          const angle = Math.PI * 2 * (i / 30);
          const distance = 800 + Math.random() * 1000;
          return (
            <circle
              key={`particle-${i}`}
              cx={Math.cos(angle) * distance}
              cy={Math.sin(angle) * distance}
              r={2 + Math.random() * 4}
              fill={`rgba(255, 255, 255, ${0.2 + Math.random() * 0.3})`}
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 0 0`}
                to={`360 0 0`}
                dur={`${40 + Math.random() * 20}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values={`${2 + Math.random() * 4};${4 + Math.random() * 6};${2 + Math.random() * 4}`}
                dur={`${3 + Math.random() * 2}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </g>
      
      {/* Wave distortion effect (subtle) */}
      <rect
        width="1600"
        height="800"
        fill="transparent"
        filter="url(#waveFilter)"
        opacity="0.1"
      >
        <animate
          attributeName="opacity"
          values="0.05;0.15;0.05"
          dur="10s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Central glowing orb */}
      <circle cx="0" cy="0" r="80" fill="rgba(255, 255, 255, 0.3)">
        <animate
          attributeName="r"
          values="80;100;80"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.5;0.3"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      <circle cx="0" cy="0" r="40" fill="rgba(255, 255, 255, 0.6)">
        <animate
          attributeName="r"
          values="40;50;40"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default BackgroundRings;