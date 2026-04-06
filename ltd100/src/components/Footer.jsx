import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__logo">VISTORIA</span>
      <span className="footer__tagline">One Hundred. Yours Alone.</span>
      <div className="footer__right">
        <a
          href="https://instagram.com/vistoria"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          Instagram
        </a>
        <a href="mailto:hello@vistoria.com" className="footer__link">
          Contact
        </a>
      </div>
    </footer>
  );
}
