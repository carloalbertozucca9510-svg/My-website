import './Marquee.css';

const TEXT = 'LTD100 ◆ ONE TEE · ONE HUNDRED PIECES ◆ YOUR NUMBER · YOUR PIECE ◆ DROP 001 — COMING SOON';

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <span className="marquee__content">{TEXT}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="marquee__content" aria-hidden="true">{TEXT}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
