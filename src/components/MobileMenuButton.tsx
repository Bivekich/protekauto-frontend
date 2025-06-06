import React from 'react';

interface MobileMenuButtonProps {
  icon: React.ReactNode;
  label: string;
  counter?: React.ReactNode;
  href?: string;
  status?: 'default' | 'success' | 'warning' | 'danger';
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ icon, label, counter, href = '#', status = 'default' }) => (
  <a href={href} className="button-for-mobile-menu-block w-inline-block">
    <div className="block-for-moble-menu-icon">
      <div className="icon-setting w-embed">{icon}</div>
      {counter && (
        <div className={`pcs-info${status !== 'default' ? ' pcs-info--' + status : ''}`}>{counter}</div>
      )}
    </div>
    <div className="name-mobile-menu-item">{label}</div>
  </a>
);

export default MobileMenuButton; 