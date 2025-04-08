import { FC, SVGProps } from 'react';

const NavAlerts: FC<SVGProps<SVGSVGElement>> = (props) => (
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
      d="M8.619 2a6.095 6.095 0 0 0-6.095 6.095v2.106L1.08 13.087a.762.762 0 0 0 .68 1.104h13.715a.762.762 0 0 0 .681-1.104l-1.443-2.886V8.095A6.095 6.095 0 0 0 8.62 2m0 16a3.05 3.05 0 0 1-2.952-2.286h5.904A3.05 3.05 0 0 1 8.619 18"
    ></path>
  </svg>
);

export default NavAlerts;
