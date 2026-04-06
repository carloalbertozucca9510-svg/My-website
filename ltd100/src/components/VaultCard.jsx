import './VaultCard.css';

function BagPlaceholder({ colour }) {
  return (
    <div className="vault-card__bag-placeholder" style={{ background: colour ?? '#1a1a1a' }}>
      <svg
        viewBox="0 0 120 150"
        xmlns="http://www.w3.org/2000/svg"
        className="vault-card__bag-svg"
        aria-hidden="true"
      >
        <rect x="15" y="40" width="90" height="100" rx="2" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1" />
        <rect x="45" y="36" width="30" height="8" rx="1" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="1" />
        <circle cx="60" cy="40" r="3" fill="none" stroke="rgba(201,169,110,0.5)" strokeWidth="1" />
        <path d="M 38 36 Q 30 18 38 10" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1" strokeLinecap="round" />
        <path d="M 82 36 Q 90 18 82 10" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1" strokeLinecap="round" />
        <line x1="38" y1="10" x2="82" y2="10" stroke="rgba(201,169,110,0.3)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

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
        <div className="vault-card__badge" aria-label="Edition closed">Edition Closed</div>
      )}

      <div className="vault-card__visual">
        <BagPlaceholder colour={firstColour?.hex} />
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
              <button className="vault-card__cta">Enquire</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
