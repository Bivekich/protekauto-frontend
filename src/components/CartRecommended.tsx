import React from "react";
import CartRecommendedProductCard from "./CartRecommendedProductCard";

const recommended = [
  {
    image: "/images/image-10.png",
    discount: "-35%",
    price: "от 17 087 ₽",
    oldPrice: "22 347 ₽",
    title: 'Аккумуляторная батарея TYUMEN BATTERY "STANDARD", 6CT-60L, 60',
    brand: "Borsehung",
  },
  {
    image: "/images/image-10.png",
    discount: "-35%",
    price: "от 17 087 ₽",
    oldPrice: "22 347 ₽",
    title: 'Аккумуляторная батарея TYUMEN BATTERY "STANDARD", 6CT-60L, 60',
    brand: "Borsehung",
  },
  {
    image: "/images/image-10.png",
    discount: "-35%",
    price: "от 17 087 ₽",
    oldPrice: "22 347 ₽",
    title: 'Аккумуляторная батарея TYUMEN BATTERY "STANDARD", 6CT-60L, 60',
    brand: "Borsehung",
  },
  {
    image: "/images/image-10.png",
    discount: "-35%",
    price: "от 17 087 ₽",
    oldPrice: "22 347 ₽",
    title: 'Аккумуляторная батарея TYUMEN BATTERY "STANDARD", 6CT-60L, 60',
    brand: "Borsehung",
  },
  {
    image: "/images/image-10.png",
    discount: "-35%",
    price: "от 17 087 ₽",
    oldPrice: "22 347 ₽",
    title: 'Аккумуляторная батарея TYUMEN BATTERY "STANDARD", 6CT-60L, 60',
    brand: "Borsehung",
  },
];

const CartRecommended: React.FC = () => (
  <>
    <h2 className="heading-11">Рекомендованные товары</h2>
    <div className="w-layout-hflex core-product-search-copy">
      {recommended.map((item, idx) => (
        <CartRecommendedProductCard key={idx} {...item} />
      ))}
    </div> 
 </>
);

export default CartRecommended; 