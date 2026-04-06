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
      <rect width="80" height="144" fill="#2C5F4A" />

      {/* Inner border */}
      <rect
        x="4" y="4" width="72" height="136"
        fill="none"
        stroke="rgba(201,169,110,0.25)"
        strokeWidth="1"
        strokeDasharray="3 2"
      />

      {/* Piece number */}
      <text
        x="40"
        y="68"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="46"
        fontWeight="300"
        fill="#F7F3EE"
        letterSpacing="2"
      >
        {padded}
      </text>

      {/* Horizontal rule */}
      <line
        x1="14" y1="92" x2="66" y2="92"
        stroke="rgba(201,169,110,0.4)"
        strokeWidth="0.8"
      />

      {/* /100 */}
      <text
        x="40"
        y="118"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Cormorant Garamond', serif"
        fontSize="18"
        fontWeight="300"
        fill="rgba(247,243,238,0.65)"
        letterSpacing="3"
      >
        /100
      </text>
    </svg>
  );
}
