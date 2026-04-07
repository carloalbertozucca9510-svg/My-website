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

  // To swap in a real campaign image, set heroImage in drops.js — no other change needed.
  const heroImage = currentDrop?.heroImage ?? null;

  const scrollToDrop = () => {
    const el = document.getElementById('current-drop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={`hero${heroImage ? ' hero--has-image' : ''}`}
      id="hero"
      style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
    >
      {/* Full-bleed background placeholder — replaced by heroImage when set */}
      {!heroImage && (
        <div className="hero__bg-placeholder" aria-hidden="true">
          <span className="hero__bg-label">CAMPAIGN IMAGE</span>
        </div>
      )}

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
    </section>
  );
}
