import { FC, SVGProps } from 'react';

const Cart: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16.667"
    height="16.667"
    fill="none"
    viewBox="0 0 16.667 16.667"
  >
    <path
      id="Vector"
      fill="#CBD5E3"
      fillOpacity="1"
      fillRule="nonzero"
      d="M5 13.33a1.664 1.664 0 0 0 0 3.33c.91 0 1.66-.75 1.66-1.66 0-.92-.75-1.67-1.66-1.67M0 0v1.66h1.66l3 6.33-1.12 2.04c-.14.23-.21.51-.21.8 0 .92.75 1.67 1.67 1.67h10v-1.67H5.35c-.12 0-.21-.09-.21-.21l.02-.1.75-1.36h6.21c.63 0 1.18-.34 1.46-.86l2.98-5.4c.07-.13.1-.27.1-.42 0-.14-.04-.29-.12-.41a.8.8 0 0 0-.3-.3.9.9 0 0 0-.41-.11H3.5L2.72 0zm13.33 13.33A1.664 1.664 0 1 0 15 15c0-.92-.75-1.67-1.67-1.67"
    ></path>
  </svg>
);

export default Cart;
