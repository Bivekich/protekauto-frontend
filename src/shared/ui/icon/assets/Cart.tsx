import { FC, SVGProps } from 'react';

const Cart: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
  >
    <path
      fill="#fff"
      d="M9.75 22.5A2.497 2.497 0 0 0 7.263 25c0 1.375 1.112 2.5 2.487 2.5s2.5-1.125 2.5-2.5-1.125-2.5-2.5-2.5m-7.5-20V5h2.5l4.5 9.488-1.687 3.062c-.2.35-.313.762-.313 1.2 0 1.375 1.125 2.5 2.5 2.5h15v-2.5H10.275a.31.31 0 0 1-.312-.312l.037-.15 1.125-2.038h9.313c.937 0 1.762-.512 2.187-1.287L27.1 6.85A1.254 1.254 0 0 0 26 5H7.513L6.337 2.5zm20 20a2.497 2.497 0 0 0-2.488 2.5c0 1.375 1.113 2.5 2.488 2.5s2.5-1.125 2.5-2.5-1.125-2.5-2.5-2.5"
    ></path>
  </svg>
);

export default Cart;
