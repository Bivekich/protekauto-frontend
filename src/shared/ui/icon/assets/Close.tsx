import { FC, SVGProps } from 'react';

const Close: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
  >
    <path
      fill="#000814"
      d="M8 23.75 6.25 22l7-7-7-7L8 6.25l7 7 7-7L23.75 8l-7 7 7 7L22 23.75l-7-7z"
    ></path>
  </svg>
);

export default Close;
