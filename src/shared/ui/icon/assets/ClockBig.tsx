import { FC, SVGProps } from 'react';

const ClockBig: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="35"
    fill="none"
    viewBox="0 0 34 35"
  >
    <path
      fill="#C00D0D"
      d="M16.986 3.404c-7.82 0-14.153 6.347-14.153 14.167s6.333 14.167 14.152 14.167c7.835 0 14.181-6.347 14.181-14.167S24.82 3.404 16.986 3.404m4.674 20.84-6.077-6.092v-7.664h2.833v6.502l5.256 5.256z"
    ></path>
  </svg>
);

export default ClockBig;
