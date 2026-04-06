import './NumberPicker.css';

// Seeded PRNG — deterministic positions, identical on every render
function seededRng(seed) {
  let s = seed >>> 0;
  if (s === 0) s = 1;
  return function () {
    s ^= s << 13;
    s ^= s >> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967295;
  };
}

// Generate fixed positions (percentage) for 100 dots
// Uses a grid-with-jitter approach to avoid clustering
function generatePositions() {
  const rng = seededRng(2025);
  const positions = [];
  // 10x10 grid, each cell ~9% wide, with margin
  const cols = 10;
  const rows = 10;
  const marginX = 4;
  const marginY = 6;
  const cellW = (100 - marginX * 2) / cols;
  const cellH = (100 - marginY * 2) / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const baseX = marginX + col * cellW + cellW * 0.1;
      const baseY = marginY + row * cellH + cellH * 0.1;
      const jitterX = rng() * cellW * 0.8;
      const jitterY = rng() * cellH * 0.8;
      positions.push({
        x: baseX + jitterX,
        y: baseY + jitterY,
      });
    }
  }
  return positions;
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
