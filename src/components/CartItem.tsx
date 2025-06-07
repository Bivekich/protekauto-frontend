import React from "react";

interface CartItemProps {
  name: string;
  description: string;
  delivery: string;
  deliveryDate: string;
  price: string;
  pricePerItem: string;
  count: number;
  comment: string;
  selected: boolean;
  favorite: boolean;
  onSelect: () => void;
  onFavorite: () => void;
  onComment: (comment: string) => void;
  onCountChange?: (count: number) => void;
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  name,
  description,
  delivery,
  deliveryDate,
  price,
  pricePerItem,
  count,
  comment,
  selected,
  favorite,
  onSelect,
  onFavorite,
  onComment,
  onCountChange,
  onRemove,
}) => (
  <div className="w-layout-hflex cart-item">
    <div className="w-layout-hflex info-block-search-copy">
      <div
        className={"div-block-7" + (selected ? " active" : "")}
        onClick={onSelect}
        style={{ marginRight: 12, cursor: 'pointer' }}
      >
        {selected && (
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M2 5.5L6 9L12 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div className="w-layout-hflex block-name">
        <h4 className="heading-9-copy">{name}</h4>
        <div className="text-block-21-copy">{description}</div>
      </div>
      <div className="form-block-copy w-form">
        <form className="form-copy" onSubmit={e => e.preventDefault()}>
          <input
            className="text-field-copy w-input"
            maxLength={256}
            name="Search-5"
            data-name="Search 5"
            placeholder="Комментарий"
            type="text"
            id="Search-5"
            value={comment}
            onChange={e => onComment(e.target.value)}
          />
        </form>
        <div className="success-message w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div className="error-message w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
    </div>
    <div className="w-layout-hflex add-to-cart-block">
      <div className="w-layout-hflex flex-block-39-copy">
        <h4 className="delivery-cart-s1">{delivery}</h4>
        <div className="text-block-21-copy-copy">{deliveryDate}</div>
      </div>
      <div className="w-layout-hflex pcs-cart-s1">
        <div className="minus-plus" onClick={() => onCountChange && onCountChange(count - 1)} style={{ cursor: 'pointer' }}>
          <img loading="lazy" src="/images/minus_icon.svg" alt="-" />
        </div>
        <div className="input-pcs">
          <div className="text-block-26">{count}</div>
        </div>
        <div className="minus-plus" onClick={() => onCountChange && onCountChange(count + 1)} style={{ cursor: 'pointer' }}>
          <img loading="lazy" src="/images/plus_icon.svg" alt="+" />
        </div>
      </div>
      <div className="w-layout-hflex flex-block-39-copy-copy">
        <h4 className="price-in-cart-s1">{price}</h4>
        <div className="price-1-pcs-cart-s1">{pricePerItem}</div>
      </div>
      <div className="w-layout-hflex control-element">
        <div className="favorite-icon w-embed" onClick={onFavorite} style={{ cursor: 'pointer', color: favorite ? '#e53935' : undefined }}>
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.5L7.84 15.4929C3.72 11.93 1 9.57248 1 6.69619C1 4.33869 2.936 2.5 5.4 2.5C6.792 2.5 8.128 3.11798 9 4.08692C9.872 3.11798 11.208 2.5 12.6 2.5C15.064 2.5 17 4.33869 17 6.69619C17 9.57248 14.28 11.93 10.16 15.4929L9 16.5Z" fill={favorite ? "#e53935" : "currentColor"} />
          </svg>
        </div>
        <img src="/images/delete.svg" loading="lazy" alt="" className="image-13" style={{ cursor: 'pointer' }} onClick={onRemove} />
      </div>
    </div>
  </div>
);

export default CartItem; 