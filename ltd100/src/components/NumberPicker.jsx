import './NumberPicker.css';

// Concentric ellipse constellation — three orbits, evenly distributed.
// Positions are fixed percentages of the container (width × height).
// The canvas is full-width and 520px tall, so equal % radii produce
// a natural ellipse because the container is wider than it is tall.
function generatePositions() {
  const positions = [];
  const cx = 50; // centre x %
  const cy = 50; // centre y %

  // [dotCount, radiusX%, radiusY%, angleOffset]
  // Offset staggers each ring so no dots align vertically across rings.
  const orbits = [
    { count: 20, rx: 10, ry: 14, offset: 0 },
    { count: 35, rx: 26, ry: 32, offset: Math.PI / 35 },
    { count: 45, rx: 41, ry: 40, offset: Math.PI / 90 },
  ];

  for (const orbit of orbits) {
    for (let i = 0; i < orbit.count; i++) {
      const angle = orbit.offset + (i / orbit.count) * 2 * Math.PI;
      positions.push({
        x: cx + orbit.rx * Math.cos(angle),
        y: cy + orbit.ry * Math.sin(angle),
      });
    }
  }

  return positions; // exactly 100 positions
}

const DOT_POSITIONS = generatePositions();

export default function NumberPicker({ numbers, onSelect, selectedNumber }) {
  const dots = [];
  for (let i = 1; i <= 100; i++) {
    const available = numbers[i];
    const selected = selectedNumber === i;
    const pos = DOT_POSITIONS[i - 1];

    let stateClass = 'dot--sold';
    if (available) stateClass = 'dot--available';

    dots.push(
      <button
        key={i}
        className={`constellation__dot ${stateClass}${selected ? ' dot--selected' : ''}`}
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        onClick={() => available && onSelect(i)}
        disabled={!available}
        aria-label={`Number ${i}${available ? ' — available' : ' — reserved'}`}
        aria-pressed={selected}
        title={available ? `Reserve #${String(i).padStart(3, '0')}` : `#${String(i).padStart(3, '0')} reserved`}
      >
        <span className="dot__number">{i}</span>
      </button>
    );
  }

  return (
    <div className="constellation" role="group" aria-label="Select your piece number">
      <div className="constellation__canvas">
        {dots}
      </div>
      <div className="constellation__legend" aria-hidden="true">
        <span className="legend__item">
          <span className="legend__dot legend__dot--available" />
          <span className="legend__label">Available</span>
        </span>
        <span className="legend__item">
          <span className="legend__dot legend__dot--reserved" />
          <span className="legend__label">Reserved</span>
        </span>
        <span className="legend__item">
          <span className="legend__dot legend__dot--yours" />
          <span className="legend__label">Yours</span>
        </span>
      </div>
    </div>
  );
}
