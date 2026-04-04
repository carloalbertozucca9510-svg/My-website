import { useState } from 'react';
import { currentDrop } from '../data/drops';
import TShirtSVG from './TShirtSVG';
import ColourSwatch from './ColourSwatch';
import NumberPicker from './NumberPicker';
import useReveal from '../hooks/useReveal';
import './CurrentDrop.css';

export default function CurrentDrop() {
  const drop = currentDrop;
  const ref = useReveal();

  const firstAvailable = drop
    ? parseInt(Object.entries(drop.numbers).find(([, v]) => v)?.[0] ?? 1)
    : 1;

  const [selectedColour, setSelectedColour] = useState(
    drop?.colourways.find(c => c.stock > 0)?.id ?? drop?.colourways[0]?.id
  );
  const [selectedNumber, setSelectedNumber] = useState(firstAvailable);
  const [selectedSize, setSelectedSize] = useState('M');

  if (!drop) return null;

  const activeCw = drop.colourways.find(c => c.id === selectedColour);
  const claimed = Object.values(drop.numbers).filter(v => !v).length;
  const remaining = drop.totalUnits - claimed;
  const progressPct = (remaining / drop.totalUnits) * 100;
  const paddedNum = String(selectedNumber).padStart(3, '0');

  return (
    <section className="current-drop reveal" id="current-drop" ref={ref}>
      {/* Ghost watermark */}
      <div className="current-drop__watermark" aria-hidden="true">001</div>

      <div className="current-drop__header">
        <p className="section-eyebrow">Current Drop</p>
        <h2 className="section-heading">Drop 001 — Coming Soon</h2>
      </div>

      <div className="current-drop__body">
        {/* Left — product visual */}
        <div className="current-drop__visual">
          <TShirtSVG
            colour={activeCw?.hex ?? '#1a1a1a'}
            labelNumber={selectedNumber}
            size={420}
          />
          <div className="current-drop__swatches">
            <ColourSwatch
              colourways={drop.colourways}
              selected={selectedColour}
              onSelect={setSelectedColour}
            />
          </div>
        </div>

        {/* Right — product details */}
        <div className="current-drop__details">
          <h3 className="current-drop__name">{drop.name}</h3>
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

          {/* Size selector */}
          <div className="current-drop__sizes">
            <p className="current-drop__label">Size</p>
            <div className="current-drop__size-grid">
              {drop.sizes.map(size => (
                <button
                  key={size}
                  className={`current-drop__size-btn${selectedSize === size ? ' current-drop__size-btn--selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Number selection — key moment */}
          <div className="current-drop__number-section">
            <p className="current-drop__label">Your number</p>
            <div className="current-drop__selected-number" aria-live="polite">
              #{paddedNum}
            </div>
            <p className="current-drop__number-sub">
              Select your piece from the grid below
            </p>
            <NumberPicker
              numbers={drop.numbers}
              onSelect={setSelectedNumber}
              selectedNumber={selectedNumber}
            />
          </div>

          {/* Price + CTA */}
          <div className="current-drop__purchase">
            <p className="current-drop__price">
              {drop.currency} {drop.price.toLocaleString()}
            </p>
            <button className="current-drop__cta">
              Coming Soon — #{paddedNum}
            </button>
            <p className="current-drop__note">
              Register your number now. Drop 001 goes live soon — low numbers go first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
