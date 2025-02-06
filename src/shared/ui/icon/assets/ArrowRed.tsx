import { FC, SVGProps } from 'react';

const ArrowRed: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="41"
    height="20"
    fill="none"
    viewBox="0 0 41 23"
  >
    <path
      fill="#C00D0D"
      d="M40.06 12.56a1.5 1.5 0 0 0 0-2.12L30.516.892a1.5 1.5 0 1 0-2.122 2.122L36.88 11.5l-8.486 8.485a1.5 1.5 0 1 0 2.122 2.122zM0 13h39v-3H0z"
    ></path>
  </svg>
);

export default ArrowRed;
