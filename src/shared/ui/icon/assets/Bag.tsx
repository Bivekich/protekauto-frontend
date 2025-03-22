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
      <clipPath id="clip6_124">
        <rect
          id="ic:round-local-mall"
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
      id="ic:round-local-mall"
      width="23"
      height="23"
      fill="#FFF"
      fillOpacity="0"
      rx="0"
      transform="translate(.5 .5)"
    ></rect>
    <g clipPath="url(#clip6_124)">
      <path
        id="Vector"
        fill="#000814"
        fillOpacity="1"
        fillRule="nonzero"
        d="M19 6h-2c0-2.77-2.24-5-5-5-2.77 0-5 2.23-5 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-7-3c1.65 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3m0 10c-1.11 0-2.19-.37-3.07-1.05-.87-.68-1.5-1.63-1.78-2.7-.17-.63.32-1.25.97-1.25.48 0 .85.34.99.79.17.64.55 1.2 1.07 1.59.52.4 1.16.62 1.82.62.65 0 1.29-.22 1.81-.62.52-.39.9-.95 1.07-1.59.14-.45.51-.79.99-.79.65 0 1.13.62.97 1.25a5.06 5.06 0 0 1-1.78 2.7C14.18 12.63 13.1 13 12 13"
      ></path>
    </g>
  </svg>
);

export default Arrow;
