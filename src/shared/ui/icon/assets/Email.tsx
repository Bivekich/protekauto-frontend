import { FC, SVGProps } from 'react';

const Email: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    fill="none"
    viewBox="0 0 24 25"
  >
    <path
      fill="#000814"
      d="m20 8.5-8 5-8-5v-2l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2"
    ></path>
  </svg>
);

export default Email;
