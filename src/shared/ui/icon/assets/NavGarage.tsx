import { FC, SVGProps } from 'react';

const NavGarage: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    fill="none"
    viewBox="0 0 18 19"
  >
    <path
      fill="#424F60"
      d="M17 6.2v9.943h-1.6v-7.2H2.6v7.2H1V6.2L9 3zm-2.4 3.543H3.4v1.6h11.2zm0 2.4H3.4v1.6h11.2z"
    ></path>
    <path fill="#424F60" d="M3.4 14.543h11.2v1.6H3.4z"></path>
  </svg>
);

export default NavGarage;
