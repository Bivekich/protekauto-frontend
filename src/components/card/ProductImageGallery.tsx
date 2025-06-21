import React from "react";

interface ProductImageGalleryProps {
  imageUrl?: string;
}

export default function ProductImageGallery({ imageUrl }: ProductImageGalleryProps) {
  const defaultImage = "/images/image-10.png";
  const displayImage = imageUrl || defaultImage;

  return (
    <div className="w-layout-vflex flex-block-49">
      <div className="w-layout-hflex flex-block-50">
        <img src={displayImage} loading="lazy" alt="Изображение товара" className="image-12" />
      </div>
      <div className="w-layout-hflex flex-block-51">
        <img src={displayImage} loading="lazy" alt="Миниатюра 1" className="image-13" />
        <img src={displayImage} loading="lazy" alt="Миниатюра 2" className="image-13" />
        <img src={displayImage} loading="lazy" alt="Миниатюра 3" className="image-13" />
        <img src={displayImage} loading="lazy" alt="Миниатюра 4" className="image-13" />
      </div>
    </div>
  );
} 