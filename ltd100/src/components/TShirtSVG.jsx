// Bag silhouette SVG — editorial placeholder for product visuals
export default function TShirtSVG({ colour = '#1a1a1a', labelNumber = 1, size = 400 }) {
  return (
    <div style={{ position: 'relative', width: size, maxWidth: '100%' }}>
      <svg
        viewBox="0 0 400 460"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label={`Clutch bag — piece ${labelNumber} of 100`}
      >
        {/* Bag body */}
        <rect x="60" y="120" width="280" height="310" rx="4" fill={colour} />

        {/* Clasp bar */}
        <rect x="150" y="112" width="100" height="14" rx="2" fill={colour} />
        <circle cx="200" cy="119" r="7" fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1.5" />

        {/* Handle left */}
        <path d="M 130 112 Q 100 60 130 40" fill="none" stroke="rgba(201,169,110,0.5)" strokeWidth="2" strokeLinecap="round" />
        {/* Handle right */}
        <path d="M 270 112 Q 300 60 270 40" fill="none" stroke="rgba(201,169,110,0.5)" strokeWidth="2" strokeLinecap="round" />
        {/* Handle top */}
        <line x1="130" y1="40" x2="270" y2="40" stroke="rgba(201,169,110,0.5)" strokeWidth="2" strokeLinecap="round" />

        {/* Interior seam */}
        <line x1="60" y1="195" x2="340" y2="195" stroke="rgba(201,169,110,0.2)" strokeWidth="1" />

        {/* Side stitching */}
        <line x1="76" y1="130" x2="76" y2="420" stroke="rgba(201,169,110,0.15)" strokeWidth="0.8" strokeDasharray="4 3" />
        <line x1="324" y1="130" x2="324" y2="420" stroke="rgba(201,169,110,0.15)" strokeWidth="0.8" strokeDasharray="4 3" />
        <line x1="76" y1="415" x2="324" y2="415" stroke="rgba(201,169,110,0.15)" strokeWidth="0.8" strokeDasharray="4 3" />

        {/* Edition number */}
        <text
          x="200" y="330"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="18"
          fontWeight="300"
          fill="rgba(201,169,110,0.5)"
          letterSpacing="4"
        >
          {String(labelNumber).padStart(3, '0')} / 100
        </text>
      </svg>
    </div>
  );
}
