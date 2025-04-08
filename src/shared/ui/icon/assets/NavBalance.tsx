import { FC, SVGProps } from 'react';

const NavBalance: FC<SVGProps<SVGSVGElement>> = (props) => (
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
      fillRule="evenodd"
      d="M2.778 4.222a.444.444 0 0 1 .444-.444h9.334a.889.889 0 0 0 0-1.778H3.222A2.22 2.22 0 0 0 1 4.222v10.222a1.78 1.78 0 0 0 1.778 1.778h12.444A1.78 1.78 0 0 0 17 14.444v-8a1.78 1.78 0 0 0-1.778-1.777h-12a.444.444 0 0 1-.444-.445m9.333 7.556a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default NavBalance;
