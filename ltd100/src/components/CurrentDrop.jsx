import { useState } from 'react';
import { currentDrop } from '../data/drops';
import ProductGallery from './ProductGallery';
import NumberPicker from './NumberPicker';
import useReveal from '../hooks/useReveal';
import './CurrentDrop.css';

export default function CurrentDrop() {
  const drop = currentDrop;
  const ref = useReveal();

  const firstAvailable = drop
    ? parseInt(Object.entries(drop.numbers).find(([, v]) => v)?.[0] ?? 1)
    : 1;

  const [selectedNumber, setSelectedNumber] = useState(firstAvailable);

  if (!drop) return null;

  const claimed = Object.values(drop.numbers).filter(v => !v).length;
  const remaining = drop.totalUnits - claimed;
  const progressPct = (remaining / drop.totalUnits) * 100;
  const paddedNum = String(selectedNumber).padStart(3, '0');

  return (
    <section className="current-drop reveal" id="current-drop" ref={ref}>

      <div className="current-drop__header">
        <p className="section-eyebrow">The Piece</p>
        <h2 className="section-heading">The Piece — Drop 001</h2>
      </div>

      <div className="current-drop__body">

        {/* Left — image gallery */}
        <div className="current-drop__visual">
          <ProductGallery colourway={drop.colourways[0]} />
        </div>

        {/* Right — product details */}
        <div className="current-drop__details">
          <h3 className="current-drop__name">{drop.name}</h3>

          <p className="current-drop__material">
            {drop.material}
          </p>

          <p className="current-drop__dimensions">
            {drop.dimensions}
          </p>

          <p className="current-drop__desc">{drop.description}</p>

          {/* Availability */}
          <div className="current-drop__availability">
            <span className="current-drop__avail-text">
              {remaining} of {drop.totalUnits} remaining
            </span>
            <div className="current-drop__progress-track">
              <div
                className="current-drop__progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Selected number display */}
          <div className="current-drop__number-section">
            <p className="current-drop__label">Your number</p>
            <div className="current-drop__selected-number" aria-live="polite">
              #{paddedNum}
            </div>
            <p className="current-drop__number-sub">
              Select your piece from the grid below
            </p>
          </div>

          {/* Price + CTA */}
          <div className="current-drop__purchase">
            <p className="current-drop__price">
              {drop.currency} {drop.price.toLocaleString()}
            </p>
            <button className="current-drop__cta">
              Reserve Piece #{paddedNum}
            </button>
            <p className="current-drop__note">
              Your number will be engraved into your piece. Each reservation is final.
            </p>
          </div>
        </div>

      </div>

      {/* Full-width number grid */}
      <div className="current-drop__constellation-wrap">
        <div className="current-drop__constellation-header">
          <h3 className="current-drop__constellation-title">Choose Your Number</h3>
          <p className="current-drop__constellation-sub">
            Each number is unique. Once reserved, it is yours permanently.
          </p>
          <div className="current-drop__grid-selected" aria-live="polite">
            {selectedNumber ? `#${paddedNum}` : '—'}
          </div>
        </div>
        <NumberPicker
          numbers={drop.numbers}
          onSelect={setSelectedNumber}
          selectedNumber={selectedNumber}
        />
      </div>

    </section>
  );
}
