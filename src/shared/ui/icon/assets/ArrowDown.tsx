import { FC, SVGProps } from 'react';

const ArrowDown: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="6"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path stroke="#8893A2" strokeWidth="1.2" d="m1 1 4 4 4-4"></path>
  </svg>
);

export default ArrowDown;
