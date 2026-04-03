import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__logo">LTD100</span>
      <span className="footer__tagline">One Tee. One Hundred. Your Number.</span>
      <div className="footer__right">
        <a
          href="https://instagram.com/ltd100"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
        >
          @ltd100
        </a>
        <a href="mailto:hello@ltd-100.com" className="footer__link">
          Contact
        </a>
      </div>
    </footer>
  );
}
