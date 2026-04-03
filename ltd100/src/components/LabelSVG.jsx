export default function LabelSVG({ number, width = 80, className = '' }) {
  const padded = String(number).padStart(2, '0');
  const height = Math.round(width * 1.8);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 80 144"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Label: piece ${number} of 100`}
    >
      {/* Background */}
      <rect width="80" height="144" fill="#2d7a4f" />

      {/* Inner stitch border */}
      <rect
        x="4" y="4" width="72" height="136"
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
        strokeDasharray="3 2"
      />

      {/* Piece number */}
      <text
        x="40"
        y="72"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="52"
        fontWeight="400"
        fill="#f5f0eb"
        letterSpacing="2"
      >
        {padded}
      </text>

      {/* Horizontal rule */}
      <line
        x1="12" y1="92" x2="68" y2="92"
        stroke="rgba(245,240,235,0.5)"
        strokeWidth="0.8"
      />

      {/* /100 */}
      <text
        x="40"
        y="118"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="22"
        fontWeight="400"
        fill="rgba(245,240,235,0.75)"
        letterSpacing="3"
      >
        /100
      </text>
    </svg>
  );
}
