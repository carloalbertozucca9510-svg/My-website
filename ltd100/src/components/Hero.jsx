import { useEffect, useRef } from 'react';
import { currentDrop } from '../data/drops';
import './Hero.css';

export default function Hero() {
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  // Grain canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function drawGrain() {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 10;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    }

    resize();
    window.addEventListener('resize', resize);
    drawGrain();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Fade-up on load
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.classList.add('hero__content--visible');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const claimed = currentDrop
    ? Object.values(currentDrop.numbers).filter(v => !v).length
    : 0;
  const remaining = currentDrop ? currentDrop.totalUnits - claimed : 0;

  const scrollToDrop = () => {
    const el = document.getElementById('current-drop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <canvas className="hero__grain" ref={canvasRef} aria-hidden="true" />

      <div className="hero__content" ref={contentRef}>
        <p className="hero__eyebrow">Dubai · Drop 001 — Now Open for Reservation</p>

        <h1 className="hero__headline">
          <span>One Hundred.</span>
          <span className="hero__headline--accent">Yours Alone.</span>
        </h1>

        <p className="hero__subheadline">
          A structured evening clutch. Limited to 100 pieces.<br />
          Each one numbered, each one yours.
        </p>

        <div className="hero__status">
          <span className="hero__status-text">
            Drop 001 — {remaining} pieces remaining
          </span>
          <div className="hero__progress-track">
            <div
              className="hero__progress-fill"
              style={{ width: `${(remaining / 100) * 100}%` }}
            />
          </div>
        </div>

        <button className="hero__cta" onClick={scrollToDrop}>
          Select Your Number →
        </button>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <svg
          className="hero__bag-svg"
          viewBox="0 0 320 400"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Bag body */}
          <rect x="40" y="100" width="240" height="270" rx="4" fill="none" stroke="var(--color-text)" strokeWidth="1.5" />
          {/* Clasp bar */}
          <rect x="120" y="94" width="80" height="12" rx="2" fill="none" stroke="var(--color-text)" strokeWidth="1.5" />
          {/* Clasp detail */}
          <circle cx="160" cy="100" r="5" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" />
          {/* Handle left */}
          <path d="M 100 94 Q 80 50 100 30" fill="none" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Handle right */}
          <path d="M 220 94 Q 240 50 220 30" fill="none" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Handle connector */}
          <line x1="100" y1="30" x2="220" y2="30" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Interior seam line */}
          <line x1="40" y1="160" x2="280" y2="160" stroke="var(--color-border)" strokeWidth="1" />
          {/* Side stitching left */}
          <line x1="55" y1="110" x2="55" y2="360" stroke="var(--color-border)" strokeWidth="0.8" strokeDasharray="4 3" />
          {/* Side stitching right */}
          <line x1="265" y1="110" x2="265" y2="360" stroke="var(--color-border)" strokeWidth="0.8" strokeDasharray="4 3" />
          {/* Bottom stitching */}
          <line x1="55" y1="355" x2="265" y2="355" stroke="var(--color-border)" strokeWidth="0.8" strokeDasharray="4 3" />
          {/* Edition number */}
          <text
            x="160" y="260"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontSize="13"
            fontWeight="300"
            fill="var(--color-gold)"
            letterSpacing="4"
          >
            001 / 100
          </text>
        </svg>
      </div>
    </section>
  );
}
