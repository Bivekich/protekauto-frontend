import { FC, SVGProps } from 'react';

const Blocks: FC<SVGProps<SVGSVGElement>> = (props) => (
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
      d="M18.417 18.988v11.334H29.75V18.988zM4.25 30.322h11.333V18.988H4.25zm0-25.5v11.333h11.333V4.822zm19.352-1.856-8.019 8.004 8.019 8.018 8.018-8.018z"
    ></path>
  </svg>
);

export default Blocks;
