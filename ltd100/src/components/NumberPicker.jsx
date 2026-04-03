import './NumberPicker.css';

export default function NumberPicker({ numbers, onSelect, selectedNumber }) {
  const cells = [];
  for (let i = 1; i <= 100; i++) {
    const available = numbers[i];
    const selected = selectedNumber === i;

    cells.push(
      <button
        key={i}
        className={`number-picker__cell${available ? ' number-picker__cell--available' : ' number-picker__cell--claimed'}${selected ? ' number-picker__cell--selected' : ''}`}
        onClick={() => available && onSelect(i)}
        disabled={!available}
        aria-label={`Number ${i}${available ? ' — available' : ' — claimed'}`}
        aria-pressed={selected}
        title={available ? `Select #${String(i).padStart(3, '0')}` : `#${String(i).padStart(3, '0')} claimed`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="number-picker" role="group" aria-label="Select your piece number">
      {cells}
    </div>
  );
}
