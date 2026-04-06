import './Marquee.css';

const TEXT = 'VISTORIA · ONE HUNDRED PIECES · EACH ONE NUMBERED · DROP 001 · RESERVE YOUR PIECE ·';

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span className="marquee__content">{TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="marquee__content" aria-hidden="true">{TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="marquee__content" aria-hidden="true">{TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="marquee__content" aria-hidden="true">{TEXT}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
