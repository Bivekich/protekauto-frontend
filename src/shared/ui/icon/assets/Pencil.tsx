import { FC, SVGProps } from 'react';

const Pencil: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    fill="none"
    viewBox="0 0 18 19"
  >
    <path
      fill="#747474"
      d="M2.25 13.44v2.812h2.813l8.295-8.295-2.813-2.813zm13.283-7.658a.747.747 0 0 0 0-1.058L13.778 2.97a.747.747 0 0 0-1.058 0l-1.373 1.373 2.813 2.812z"
    ></path>
  </svg>
);

export default Pencil;
