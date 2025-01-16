import { FC, SVGProps } from 'react';

const Arrow: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <defs>
      <clipPath id="clip6_138">
        <rect
          id="ic:baseline-verified"
          width="23"
          height="23"
          fill="#fff"
          fillOpacity="0"
          rx="0"
          transform="translate(.5 .5)"
        ></rect>
      </clipPath>
    </defs>
    <rect
      id="ic:baseline-verified"
      width="23"
      height="23"
      fill="#FFF"
      fillOpacity="0"
      rx="0"
      transform="translate(.5 .5)"
    ></rect>
    <g clipPath="url(#clip6_138)">
      <path
        id="Vector"
        fill="#000814"
        fillOpacity="1"
        fillRule="nonzero"
        d="m23 12-2.44-2.79.33-3.69-3.6-.82-1.9-3.2L12 2.96 8.6 1.5 6.7 4.69l-3.6.81.33 3.7L1 12l2.43 2.79-.33 3.7 3.6.82 1.9 3.19 3.4-1.47 3.39 1.46 1.9-3.2 3.6-.81-.33-3.69zm-12.91 4.71-3.8-3.8 1.48-1.48 2.32 2.33 5.84-5.87 1.48 1.48z"
      ></path>
    </g>
  </svg>
);

export default Arrow;
