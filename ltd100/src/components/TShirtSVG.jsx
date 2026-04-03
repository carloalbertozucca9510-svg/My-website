import LabelSVG from './LabelSVG';

export default function TShirtSVG({ colour = '#1a1a1a', labelNumber = 1, size = 400 }) {
  // Derived colours
  const isLight = isLightColor(colour);
  const seam = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.08)';
  const stitch = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)';

  return (
    <div style={{ position: 'relative', width: size, maxWidth: '100%' }}>
      <svg
        viewBox="0 0 400 460"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        aria-label={`T-shirt in colour ${colour}`}
      >
        {/* Tee body */}
        <path
          d="M 60 100 L 0 180 L 60 200 L 60 430 L 340 430 L 340 200 L 400 180 L 340 100 L 285 130 C 270 160 250 175 200 175 C 150 175 130 160 115 130 Z"
          fill={colour}
        />

        {/* Collar */}
        <path
          d="M 115 130 C 130 160 150 175 200 175 C 250 175 270 160 285 130"
          fill="none"
          stroke={seam}
          strokeWidth="2"
        />

        {/* Sleeve left seam */}
        <path
          d="M 60 100 L 0 180 L 60 200"
          fill="none"
          stroke={seam}
          strokeWidth="1.5"
        />

        {/* Sleeve right seam */}
        <path
          d="M 340 100 L 400 180 L 340 200"
          fill="none"
          stroke={seam}
          strokeWidth="1.5"
        />

        {/* Bottom hem stitch line */}
        <line x1="60" y1="420" x2="340" y2="420" stroke={stitch} strokeWidth="1" />

        {/* Side seams */}
        <line x1="60" y1="200" x2="60" y2="430" stroke={seam} strokeWidth="1" />
        <line x1="340" y1="200" x2="340" y2="430" stroke={seam} strokeWidth="1" />
      </svg>

      {/* Label — bottom-right hem, partially tucked under the seam visually */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '18%',
        width: '16%',
        pointerEvents: 'none',
      }}>
        <LabelSVG number={labelNumber} width={80} style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}

function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
