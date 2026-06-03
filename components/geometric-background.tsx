"use client";

export function GeometricBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      
      {/* Floating geometric shapes */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Large triangle */}
        <polygon
          points="100,100 300,100 200,250"
          fill="none"
          stroke="hsl(0 0% 25%)"
          strokeWidth="1"
          className="animate-float opacity-30"
          style={{ animationDelay: "0s" }}
        />
        
        {/* Circle */}
        <circle
          cx="85%"
          cy="20%"
          r="80"
          fill="none"
          stroke="hsl(0 0% 20%)"
          strokeWidth="1"
          className="animate-pulse-slow"
        />
        
        {/* Rectangle */}
        <rect
          x="70%"
          y="60%"
          width="150"
          height="150"
          fill="none"
          stroke="hsl(0 0% 22%)"
          strokeWidth="1"
          transform="rotate(15 80 70)"
          className="animate-float"
          style={{ animationDelay: "2s" }}
        />
        
        {/* Diagonal lines */}
        <line
          x1="0"
          y1="70%"
          x2="30%"
          y2="100%"
          stroke="hsl(0 0% 18%)"
          strokeWidth="1"
          className="animate-draw-line"
        />
        
        <line
          x1="60%"
          y1="0"
          x2="100%"
          y2="40%"
          stroke="hsl(0 0% 15%)"
          strokeWidth="1"
          className="animate-draw-line"
          style={{ animationDelay: "0.5s" }}
        />
        
        {/* Small triangles cluster */}
        <polygon
          points="50,600 80,600 65,570"
          fill="hsl(0 0% 15%)"
          className="animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        
        <polygon
          points="90,620 120,620 105,590"
          fill="none"
          stroke="hsl(0 0% 25%)"
          strokeWidth="1"
          className="animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        />
        
        {/* Hexagon */}
        <polygon
          points="1200,400 1230,420 1230,460 1200,480 1170,460 1170,420"
          fill="none"
          stroke="hsl(0 0% 20%)"
          strokeWidth="1"
          className="animate-float"
          style={{ animationDelay: "3s" }}
        />
        
        {/* Dotted circle */}
        <circle
          cx="15%"
          cy="80%"
          r="60"
          fill="none"
          stroke="hsl(0 0% 25%)"
          strokeWidth="1"
          strokeDasharray="5 10"
          className="animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        
        {/* Cross pattern */}
        <g className="animate-float" style={{ animationDelay: "4s" }}>
          <line
            x1="50%"
            y1="75%"
            x2="50%"
            y2="85%"
            stroke="hsl(0 0% 30%)"
            strokeWidth="1"
          />
          <line
            x1="47%"
            y1="80%"
            x2="53%"
            y2="80%"
            stroke="hsl(0 0% 30%)"
            strokeWidth="1"
          />
        </g>
      </svg>
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
