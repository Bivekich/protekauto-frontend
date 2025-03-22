import { FC, SVGProps } from 'react';

const Arrow: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="9.94"
    height="8.4"
    fill="currentColor"
    viewBox="0 0 9.94 8.4"
  >
    <path
      id="→"
      fill="currentColor"
      fillOpacity="1"
      fillRule="evenodd"
      d="M7.75 4.77 4.12 8.39h1.61l4.2-4.2L5.73 0H4.12l3.63 3.62H0v1.15z"
    ></path>
  </svg>
);

export default Arrow;
