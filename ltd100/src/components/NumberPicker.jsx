import './NumberPicker.css';

export default function NumberPicker({ numbers, onSelect, selectedNumber }) {
  const items = [];
  for (let i = 1; i <= 100; i++) {
    const available = numbers[i];
    const selected = selectedNumber === i;
    const displayNum = String(i).padStart(2, '0');

    let stateClass = 'number--reserved';
    if (available && selected) stateClass = 'number--selected';
    else if (available) stateClass = 'number--available';

    items.push(
      <button
        key={i}
        className={`number-grid__item ${stateClass}`}
        onClick={() => available && onSelect(i)}
        disabled={!available}
        aria-label={`Number ${i}${available ? '' : ' — reserved'}${selected ? ' — selected' : ''}`}
        aria-pressed={selected}
        title={available ? `Reserve #${String(i).padStart(3, '0')}` : `#${String(i).padStart(3, '0')} reserved`}
      >
        {displayNum}
      </button>
    );
  }

  return (
    <div className="number-grid" role="group" aria-label="Select your piece number">
      <div className="number-grid__grid">
        {items}
      </div>
      <div className="number-grid__legend" aria-hidden="true">
        <span className="legend__item">
          <span className="legend__square legend__square--available" />
          <span className="legend__label">Available</span>
        </span>
        <span className="legend__item">
          <span className="legend__square legend__square--reserved" />
          <span className="legend__label">Reserved</span>
        </span>
        <span className="legend__item">
          <span className="legend__square legend__square--yours" />
          <span className="legend__label">Yours</span>
        </span>
      </div>
    </div>
  );
}
