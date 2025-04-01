import { FC, SVGProps } from 'react';

const ArrowLong: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="31"
    height="16"
    fill="none"
    viewBox="0 0 31 16"
  >
    <path
      fill="#000814"
      d="M30.707 8.707a1 1 0 0 0 0-1.414L24.343.929a1 1 0 1 0-1.414 1.414L28.586 8l-5.657 5.657a1 1 0 0 0 1.414 1.414zM0 9h30V7H0z"
    ></path>
  </svg>
);

export default ArrowLong;
