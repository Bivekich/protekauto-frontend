import { FC, SVGProps } from 'react';

const VerifyRed: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <g clipPath="url(#clip0_6_546)">
      <mask
        id="mask0_6_546"
        width="16"
        height="16"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'luminance' }}
      >
        <path
          fill="#fff"
          stroke="#fff"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 14.667a6.65 6.65 0 0 0 4.714-1.953A6.65 6.65 0 0 0 14.667 8a6.65 6.65 0 0 0-1.953-4.714A6.65 6.65 0 0 0 8 1.333a6.65 6.65 0 0 0-4.714 1.953A6.65 6.65 0 0 0 1.333 8a6.65 6.65 0 0 0 1.953 4.714A6.65 6.65 0 0 0 8 14.667Z"
        ></path>
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m5.333 8 2 2 4-4"
        ></path>
      </mask>
      <g mask="url(#mask0_6_546)">
        <path fill="#C00D0D" d="M0 0h16v16H0z"></path>
      </g>
    </g>
    <defs>
      <clipPath id="clip0_6_546">
        <path fill="#fff" d="M0 0h16v16H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default VerifyRed;
