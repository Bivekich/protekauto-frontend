import { FC, SVGProps } from 'react';

const NavOrders: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    fill="none"
    viewBox="0 0 18 19"
  >
    <path
      fill="#000814"
      fillRule="evenodd"
      d="M5.938 2a.56.56 0 0 0-.454.233.58.58 0 0 0-.083.51l.124.4H2.562c-.149 0-.292.06-.397.167A.58.58 0 0 0 2 3.714V17.43c0 .151.06.297.165.404a.56.56 0 0 0 .397.167h12.376c.149 0 .292-.06.397-.167a.58.58 0 0 0 .165-.404V3.714a.58.58 0 0 0-.165-.404.56.56 0 0 0-.398-.167h-2.96l.123-.4a.58.58 0 0 0-.283-.682.56.56 0 0 0-.255-.061zm.765 1.143h4.094l-.352 1.143h-3.39zm6.547 5.714h-9V7.714h9zm0 2.857h-9v-1.143h9zm-9 2.857H11V13.43H4.25z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default NavOrders;
