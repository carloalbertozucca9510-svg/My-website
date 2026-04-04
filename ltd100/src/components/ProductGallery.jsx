import { useState, useEffect, useRef } from 'react';
import './ProductGallery.css';

function isLightColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function ProductGallery({ colourway }) {
  const [selectedId, setSelectedId] = useState('front');
  const [fading, setFading] = useState(false);
  const prevColourwayId = useRef(colourway?.id);

  // Reset to front with fade when colourway changes
  useEffect(() => {
    const prev = prevColourwayId.current;
    prevColourwayId.current = colourway?.id;
    if (prev === colourway?.id) return;

    setFading(true);
    const t = setTimeout(() => {
      setSelectedId('front');
      setFading(false);
    }, 150);
    return () => clearTimeout(t);
  }, [colourway?.id]);

  const handleSelect = (imageId) => {
    if (imageId === selectedId) return;
    setFading(true);
    setTimeout(() => {
      setSelectedId(imageId);
      setFading(false);
    }, 150);
  };

  const images = colourway?.images ?? [];
  const selectedImage = images.find(img => img.id === selectedId) ?? images[0];

  const bgColor = colourway?.hex ?? '#1a1a1a';
  const labelColor = isLightColor(bgColor)
    ? 'rgba(8,8,8,0.35)'
    : 'rgba(245,240,235,0.5)';

  return (
    <div className="product-gallery">

      {/* Front / Back quick toggle */}
      <div className="product-gallery__toggle">
        {['front', 'back'].map(viewId => {
          const img = images.find(i => i.id === viewId);
          if (!img) return null;
          return (
            <button
              key={viewId}
              className={`product-gallery__toggle-btn${selectedId === viewId ? ' product-gallery__toggle-btn--active' : ''}`}
              onClick={() => handleSelect(viewId)}
              aria-pressed={selectedId === viewId}
            >
              {img.label}
            </button>
          );
        })}
      </div>

      {/* Main image viewer */}
      <div className={`product-gallery__main${fading ? ' product-gallery__main--fading' : ''}`}>
        {selectedImage?.src ? (
          <img
            src={selectedImage.src}
            alt={`${colourway?.name ?? ''} — ${selectedImage.label}`}
            className="product-gallery__main-img"
          />
        ) : (
          <div
            className="product-gallery__placeholder product-gallery__placeholder--main"
            style={{ background: bgColor }}
          >
            <span
              className="product-gallery__placeholder-label"
              style={{ color: labelColor }}
            >
              {selectedImage?.label?.toUpperCase() ?? 'FRONT'}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="product-gallery__thumbs">
        {images.map(img => (
          <button
            key={img.id}
            className={`product-gallery__thumb${selectedId === img.id ? ' product-gallery__thumb--active' : ''}`}
            onClick={() => handleSelect(img.id)}
            aria-label={img.label}
            aria-pressed={selectedId === img.id}
          >
            {img.src ? (
              <img
                src={img.src}
                alt={img.label}
                className="product-gallery__thumb-img"
              />
            ) : (
              <div
                className="product-gallery__placeholder product-gallery__placeholder--thumb"
                style={{ background: bgColor }}
              >
                <span
                  className="product-gallery__placeholder-label product-gallery__placeholder-label--sm"
                  style={{ color: labelColor }}
                >
                  {img.label?.toUpperCase()}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

    </div>
  );
}
