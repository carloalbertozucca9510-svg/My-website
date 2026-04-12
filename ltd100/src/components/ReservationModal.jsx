import { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './ReservationModal.css';

export default function ReservationModal({ isOpen, onClose, selectedNumber, dropName, price }) {
  const [state, handleSubmit] = useForm('maqawdkj');
  const overlayRef = useRef(null);

  const paddedNum = String(selectedNumber).padStart(3, '0');

  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [touched, setTouched] = useState({ firstName: false, lastName: false, email: false });

  const errors = {
    firstName: touched.firstName && !values.firstName.trim() ? 'First name is required' : null,
    lastName: touched.lastName && !values.lastName.trim() ? 'Last name is required' : null,
    email: touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ? 'A valid email address is required' : null,
  };

  const hasClientErrors = Object.values(errors).some(Boolean);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleChange(e) {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleBlur(e) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  }

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  function handleFormSubmit(e) {
    // Touch all required fields before submit
    setTouched({ firstName: true, lastName: true, email: true });
    if (!values.firstName.trim() || !values.lastName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.preventDefault();
      return;
    }
    handleSubmit(e);
  }

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Reserve Piece #${paddedNum}`}
    >
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <span />
          <span />
        </button>

        {state.succeeded ? (
          /* ── Success state ── */
          <div className="modal__success">
            <svg className="modal__checkmark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22" stroke="#C9A96E" strokeWidth="1" />
              <polyline points="14,24 21,31 34,17" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className="modal__success-heading">Your reservation is received.</h2>
            <p className="modal__success-body">
              Piece <span className="modal__success-number">#{paddedNum}</span> from {dropName} has been reserved in your name.
              You will receive a confirmation to {values.email}.
            </p>
            <div className="modal__success-actions">
              <button className="modal__btn modal__btn--primary" onClick={onClose}>
                Close
              </button>
              <button className="modal__btn modal__btn--ghost" onClick={onClose}>
                Back to Collection
              </button>
            </div>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            <p className="modal__eyebrow">Reserve Your Piece</p>
            <h2 className="modal__heading">Piece <span className="modal__heading-number">#{paddedNum}</span></h2>
            <p className="modal__subline">Drop 001 — {dropName}</p>

            <div className="modal__divider" />

            <div className="modal__product-summary">
              <span className="modal__product-label">Edition</span>
              <span className="modal__product-value">Drop 001 / 100</span>
              <span className="modal__product-label">Number</span>
              <span className="modal__product-value">#{paddedNum}</span>
              <span className="modal__product-label">Price</span>
              <span className="modal__product-value">AED {price.toLocaleString()}</span>
            </div>

            <div className="modal__divider" />

            <form onSubmit={handleFormSubmit} noValidate>
              <input type="hidden" name="selected_number" value={paddedNum} />
              <input type="hidden" name="drop_name" value={dropName} />
              <input type="hidden" name="price" value={`AED ${price.toLocaleString()}`} />

              <div className="modal__row">
                <div className={`modal__field${errors.firstName ? ' modal__field--error' : ''}`}>
                  <label className="modal__label" htmlFor="rm-firstName">First Name</label>
                  <input
                    id="rm-firstName"
                    className="modal__input"
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={state.submitting}
                  />
                  {errors.firstName && <p className="modal__error">{errors.firstName}</p>}
                  <ValidationError prefix="First name" field="firstName" errors={state.errors} className="modal__error" />
                </div>

                <div className={`modal__field${errors.lastName ? ' modal__field--error' : ''}`}>
                  <label className="modal__label" htmlFor="rm-lastName">Last Name</label>
                  <input
                    id="rm-lastName"
                    className="modal__input"
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={state.submitting}
                  />
                  {errors.lastName && <p className="modal__error">{errors.lastName}</p>}
                  <ValidationError prefix="Last name" field="lastName" errors={state.errors} className="modal__error" />
                </div>
              </div>

              <div className={`modal__field${errors.email ? ' modal__field--error' : ''}`}>
                <label className="modal__label" htmlFor="rm-email">Email Address</label>
                <input
                  id="rm-email"
                  className="modal__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={state.submitting}
                />
                {errors.email && <p className="modal__error">{errors.email}</p>}
                <ValidationError prefix="Email" field="email" errors={state.errors} className="modal__error" />
              </div>

              <div className="modal__field">
                <label className="modal__label" htmlFor="rm-phone">
                  Phone <span className="modal__label-optional">(optional)</span>
                </label>
                <input
                  id="rm-phone"
                  className="modal__input"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange}
                  disabled={state.submitting}
                />
              </div>

              <p className="modal__privacy">
                Your details are used solely to process your reservation. We do not share your information with third parties.
              </p>

              <button
                type="submit"
                className="modal__submit"
                disabled={state.submitting || hasClientErrors}
              >
                {state.submitting ? 'Sending\u2026' : `Reserve Piece #${paddedNum}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
