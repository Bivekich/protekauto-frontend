import React from 'react';
import MobileMenuButton from './MobileMenuButton';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';

interface MobileMenuBottomSectionProps {
  onOpenAuthModal?: () => void;
}

const GarageIcon = (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27 10.8V24H24.6V13.2H5.4V24H3V10.8L15 6L27 10.8ZM23.4 14.4H6.6V16.8H23.4V14.4ZM23.4 18H6.6V20.4H23.4V18Z" fill="currentColor"></path>
    <path d="M6.6 21.6H23.4V24H6.6V21.6Z" fill="currentColor"></path>
  </svg>
);

const FavoriteIcon = (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 25L13.405 23.5613C7.74 18.4714 4 15.1035 4 10.9946C4 7.6267 6.662 5 10.05 5C11.964 5 13.801 5.88283 15 7.26703C16.199 5.88283 18.036 5 19.95 5C23.338 5 26 7.6267 26 10.9946C26 15.1035 22.26 18.4714 16.595 23.5613L15 25Z" fill="currentColor"></path>
  </svg>
);

const CartIcon = (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.1998 22.2C8.8798 22.2 7.81184 23.28 7.81184 24.6C7.81184 25.92 8.8798 27 10.1998 27C11.5197 27 12.5997 25.92 12.5997 24.6C12.5997 23.28 11.5197 22.2 10.1998 22.2ZM3 3V5.4H5.39992L9.71977 14.508L8.09982 17.448C7.90783 17.784 7.79984 18.18 7.79984 18.6C7.79984 19.92 8.8798 21 10.1998 21H24.5993V18.6H10.7037C10.5357 18.6 10.4037 18.468 10.4037 18.3L10.4397 18.156L11.5197 16.2H20.4594C21.3594 16.2 22.1513 15.708 22.5593 14.964L26.8552 7.176C26.9542 6.99286 27.004 6.78718 26.9997 6.57904C26.9955 6.37089 26.9373 6.16741 26.8309 5.98847C26.7245 5.80952 26.5736 5.66124 26.3927 5.55809C26.2119 5.45495 26.0074 5.40048 25.7992 5.4H8.05183L6.92387 3H3ZM22.1993 22.2C20.8794 22.2 19.8114 23.28 19.8114 24.6C19.8114 25.92 20.8794 27 22.1993 27C23.5193 27 24.5993 25.92 24.5993 24.6C24.5993 23.28 23.5193 22.2 22.1993 22.2Z" fill="currentColor"></path>
  </svg>
);

const CabinetIcon = (
  <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 3C8.376 3 3 8.376 3 15C3 21.624 8.376 27 15 27C21.624 27 27 21.624 27 15C27 8.376 21.624 3 15 3ZM15 7.8C17.316 7.8 19.2 9.684 19.2 12C19.2 14.316 17.316 16.2 15 16.2C12.684 16.2 10.8 14.316 10.8 12C10.8 9.684 12.684 7.8 15 7.8ZM15 24.6C12.564 24.6 9.684 23.616 7.632 21.144C9.73419 19.4955 12.3285 18.5995 15 18.5995C17.6715 18.5995 20.2658 19.4955 22.368 21.144C20.316 23.616 17.436 24.6 15 24.6Z" fill="currentColor"></path>
  </svg>
);

const MobileMenuBottomSection: React.FC<MobileMenuBottomSectionProps> = ({ 
  onOpenAuthModal = () => console.log('Auth modal action not provided') 
}) => {
  const { favorites } = useFavorites();
  const { state: cartState } = useCart();

  const favoriteCounter = favorites.length > 0 ? (
    <div className="text-block-39">{favorites.length}</div>
  ) : undefined;

  const cartCounter = cartState.items.length > 0 ? (
    <div className="text-block-39">{cartState.items.length}</div>
  ) : undefined;

  return (
    <nav className="mobile-menu-buttom-section">
      <div className="w-layout-blockcontainer mobile-menu-bottom w-container">
        <div className="w-layout-hflex flex-block-87">
          <MobileMenuButton icon={GarageIcon} label="Гараж" href="/profile-gar" />
          <MobileMenuButton 
            icon={FavoriteIcon} 
            label="Избранное" 
            href="/favorite" 
            counter={favoriteCounter}
            status={favorites.length > 0 ? "warning" : undefined}
          />
          <MobileMenuButton 
            icon={CartIcon} 
            label="Корзина" 
            href="/cart" 
            counter={cartCounter} 
            status={cartState.items.length > 0 ? "danger" : undefined}
          />
          <button
            type="button"
            className="button-for-mobile-menu-block w-inline-block"
            onClick={onOpenAuthModal}
          >
            <div className="block-for-moble-menu-icon">
              <div className="icon-setting w-embed">{CabinetIcon}</div>
              <div className="pcs-info pcs-info--success"><div className="text-block-39">!</div></div>
            </div>
            <div className="name-mobile-menu-item">Кабинет</div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileMenuBottomSection; 