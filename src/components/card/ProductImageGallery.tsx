import React from "react";

interface ProductImageGalleryProps {
  imageUrl?: string;
}

export default function ProductImageGallery({ imageUrl }: ProductImageGalleryProps) {
  const defaultImage = "/images/image-10.png";
  const displayImage = imageUrl || defaultImage;

  return (
    <div className="w-layout-vflex core-product-copy-copy">
      <div className="div-block-20">
        <img src={displayImage} loading="lazy" alt="Изображение товара" className="image-10-copy" />
      </div>
      <div className="w-layout-hflex flex-block-56">
        <img src={displayImage} loading="lazy" alt="Миниатюра 1" className="small-img" />
        <img src={displayImage} loading="lazy" alt="Миниатюра 2" className="small-img" />
        <img src={displayImage} loading="lazy" alt="Миниатюра 3" className="small-img" />
        <img src={displayImage} loading="lazy" alt="Миниатюра 4" className="small-img" />
      </div>
    </div>
  );
} 