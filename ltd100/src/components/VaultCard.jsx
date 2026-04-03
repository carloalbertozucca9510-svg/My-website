import TShirtSVG from './TShirtSVG';
import './VaultCard.css';

export default function VaultCard({ drop }) {
  const isSoldOut = drop.status === 'soldout';
  const availableNumbers = Object.entries(drop.numbers)
    .filter(([, v]) => v)
    .map(([k]) => parseInt(k))
    .sort((a, b) => a - b);

  const shown = availableNumbers.slice(0, 6);
  const extra = availableNumbers.length - shown.length;
  const firstColour = drop.colourways[0];

  return (
    <div className={`vault-card${isSoldOut ? ' vault-card--soldout' : ''}`}>
      {isSoldOut && (
        <div className="vault-card__badge" aria-label="Sold out">Sold Out</div>
      )}

      <div className="vault-card__visual">
        <TShirtSVG
          colour={firstColour?.hex ?? '#1a1a1a'}
          labelNumber={availableNumbers[0] ?? 1}
          size={260}
        />
      </div>

      <div className="vault-card__info">
        <p className="vault-card__eyebrow">Drop {String(drop.number).padStart(3, '0')}</p>
        <h3 className="vault-card__name">{drop.name}</h3>
        <p className="vault-card__desc">{drop.description}</p>

        {!isSoldOut && (
          <>
            <div className="vault-card__numbers">
              {shown.map(n => (
                <span key={n} className="vault-card__chip">
                  #{String(n).padStart(3, '0')}
                </span>
              ))}
              {extra > 0 && (
                <span className="vault-card__chip vault-card__chip--more">
                  +{extra} more
                </span>
              )}
            </div>

            <div className="vault-card__footer">
              <span className="vault-card__price">
                {drop.currency} {drop.price.toLocaleString()}
              </span>
              <button className="vault-card__cta">Pick Your Number</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
