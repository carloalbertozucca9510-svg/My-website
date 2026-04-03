import './ColourSwatch.css';

export default function ColourSwatch({ colourways, selected, onSelect }) {
  return (
    <div className="colour-swatch">
      {colourways.map((cw) => (
        <button
          key={cw.id}
          className={`colour-swatch__item${selected === cw.id ? ' colour-swatch__item--selected' : ''}${cw.stock === 0 ? ' colour-swatch__item--soldout' : ''}`}
          onClick={() => cw.stock > 0 && onSelect(cw.id)}
          title={cw.name}
          aria-label={`${cw.name}${cw.stock === 0 ? ' — sold out' : ''}`}
          aria-pressed={selected === cw.id}
          disabled={cw.stock === 0}
        >
          <span
            className="colour-swatch__dot"
            style={{ background: cw.hex }}
          />
          <span className="colour-swatch__name">{cw.name}</span>
          {cw.stock === 0 && <span className="colour-swatch__sold">Sold Out</span>}
          {cw.stock > 0 && <span className="colour-swatch__stock">{cw.stock} left</span>}
        </button>
      ))}
    </div>
  );
}
