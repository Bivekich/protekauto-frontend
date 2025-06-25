import React, { useState, useCallback, useEffect, useRef } from "react";

interface ProductImageGalleryProps {
  imageUrl?: string;
  images?: string[]; // если появятся несколько картинок
}

export default function ProductImageGallery({ imageUrl, images }: ProductImageGalleryProps) {
  const defaultImage = "/images/image-10.png";
  // Если images не передан, используем imageUrl или defaultImage
  const galleryImages = images && images.length > 0 ? images : [imageUrl || defaultImage];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Закрытие overlay по ESC
  useEffect(() => {
    if (!isOverlayOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOverlayOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOverlayOpen]);

  // Клик вне картинки
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) setIsOverlayOpen(false);
  }, []);

  return (
    <div className="w-layout-vflex core-product-copy-copy">
      {/* Основная картинка */}
      <div className="div-block-20 cursor-zoom-in" onClick={() => setIsOverlayOpen(true)} tabIndex={0} aria-label="Открыть изображение в полный экран" role="button" onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setIsOverlayOpen(true)}>
        <img src={selectedImage} loading="lazy" alt="Изображение товара" className="image-10-copy" />
      </div>
      {/* Миниатюры */}
      <div className="w-layout-hflex flex-block-56 mt-2 gap-2">
        {galleryImages.map((img, idx) => (
          <img
            key={img + idx}
            src={img}
            loading="lazy"
            alt={`Миниатюра ${idx + 1}`}
            className={`small-img cursor-pointer border ${selectedImage === img ? 'border-blue-500' : 'border-transparent'} rounded transition`}
            onClick={() => {
              setSelectedImage(img);
              setIsOverlayOpen(true);
            }}
            tabIndex={0}
            aria-label={`Показать изображение ${idx + 1}`}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedImage(img);
                setIsOverlayOpen(true);
              }
            }}
          />
        ))}
      </div>
      {/* Overlay для просмотра картинки */}
      {isOverlayOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in"
          onClick={handleOverlayClick}
          aria-modal="true"
          role="dialog"
        >
          <button
            onClick={() => setIsOverlayOpen(false)}
            className="absolute top-6 right-6 text-white bg-black/40 rounded-full p-2 hover:bg-black/70 focus:outline-none"
            aria-label="Закрыть просмотр изображения"
            tabIndex={0}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 24L24 8M8 8l16 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Просмотр товара"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border-4 border-white"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
} 