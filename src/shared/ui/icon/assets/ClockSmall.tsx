import { FC, SVGProps } from 'react';

const ClockSmall: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
  >
    <path
      fill="#424F60"
      d="M7 12.834A5.833 5.833 0 1 1 7 1.167a5.833 5.833 0 0 1 0 11.667m0-1.167a4.667 4.667 0 1 0 0-9.334 4.667 4.667 0 0 0 0 9.334M7.583 7h2.334v1.167h-3.5V4.084h1.166z"
    ></path>
  </svg>
);

export default ClockSmall;
