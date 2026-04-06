import { useState, useEffect } from 'react';
import './Nav.css';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <button className="nav__logo" onClick={() => scrollTo('hero')} aria-label="Vistoria home">
          VISTORIA
        </button>

        <div className="nav__links">
          <button onClick={() => scrollTo('current-drop')}>Collection</button>
          <button onClick={() => scrollTo('about')}>Story</button>
          <button onClick={() => scrollTo('current-drop')}>Reserve</button>
        </div>

        <button
          className={`nav__hamburger${open ? ' nav__hamburger--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`nav__overlay${open ? ' nav__overlay--open' : ''}`} aria-hidden={!open}>
        <div className="nav__overlay-links">
          <button onClick={() => scrollTo('current-drop')}>Collection</button>
          <button onClick={() => scrollTo('vault')}>The Archive</button>
          <button onClick={() => scrollTo('about')}>Story</button>
          <button onClick={() => scrollTo('current-drop')}>Reserve</button>
        </div>
        <div className="nav__overlay-footer">
          <span>@vistoria</span>
          <span>vistoria.com</span>
        </div>
      </div>
    </>
  );
}
