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
      <clipPath id="clip6_131">
        <rect
          id="ic:baseline-thumb-up"
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
      id="ic:baseline-thumb-up"
      width="23"
      height="23"
      fill="#FFF"
      fillOpacity="0"
      rx="0"
      transform="translate(.5 .5)"
    ></rect>
    <g clipPath="url(#clip6_131)">
      <path
        id="Vector"
        fill="#000814"
        fillOpacity="1"
        fillRule="nonzero"
        d="M1 21h4V9H1zm22-11c0-1.1-.9-2-2-2h-6.32l.95-4.58.03-.32c0-.4-.16-.78-.43-1.06L14.16 1 7.59 7.59C7.21 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73z"
      ></path>
    </g>
  </svg>
);

export default Arrow;
