import { useEffect, useRef } from 'react';
import LabelSVG from './LabelSVG';
import { currentDrop } from '../data/drops';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);

  // Grain/noise canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let frame = 0;

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
        data[i + 3] = 14; // very low opacity
      }
      ctx.putImageData(imageData, 0, 0);
      frame++;
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
    const el = headlineRef.current;
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

  // Lowest available number for hero label
  const heroNumber = currentDrop
    ? parseInt(Object.entries(currentDrop.numbers).find(([, v]) => v)?.[0] ?? 1)
    : 1;

  return (
    <section className="hero" id="hero">
      <canvas className="hero__grain" ref={canvasRef} aria-hidden="true" />

      {/* Ghost 100 watermark */}
      <div className="hero__watermark" aria-hidden="true">100</div>

      {/* Label — large background element */}
      <div className="hero__label-bg" aria-hidden="true">
        <LabelSVG number={heroNumber} width={260} />
      </div>

      <div className="hero__content" ref={headlineRef}>
        <p className="hero__eyebrow">Dubai · Drop 003 — Live Now</p>

        <h1 className="hero__headline">
          <span>One Tee.</span>
          <span>One Hundred.</span>
          <span>Your Number.</span>
        </h1>

        <div className="hero__status">
          <span className="hero__status-text">
            Drop 003 — {remaining} of 100 remaining
          </span>
          <div className="hero__progress-track">
            <div
              className="hero__progress-fill"
              style={{ width: `${(claimed / 100) * 100}%` }}
            />
          </div>
        </div>

        <button className="hero__cta" onClick={scrollToDrop}>
          See the Drop →
        </button>
      </div>
    </section>
  );
}
