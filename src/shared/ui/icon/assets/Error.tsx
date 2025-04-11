import { FC, SVGProps } from 'react';

const Error: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="42"
    fill="none"
    viewBox="0 0 42 42"
  >
    <g clipPath="url(#clip0_808_458)">
      <path
        fill="#FFECEC"
        d="M21 0C9.4 0 0 9.4 0 21s9.4 21 21 21 21-9.4 21-21S32.6 0 21 0M5.25 21c0-8.703 7.055-15.75 15.75-15.75 3.453 0 6.645 1.124 9.237 3.01L8.26 30.238A15.65 15.65 0 0 1 5.25 21M21 36.75a15.65 15.65 0 0 1-9.237-3.01L33.74 11.763A15.67 15.67 0 0 1 36.75 21c0 8.703-7.055 15.75-15.75 15.75"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_808_458">
        <path fill="#fff" d="M0 0h42v42H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default Error;
