import { FC, SVGProps } from 'react';

const Clock: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    viewBox="0 0 26 26"
  >
    <defs>
      <clipPath id="clip6_452">
        <rect
          id="ic:baseline-access-time-filled"
          width="25"
          height="25"
          fill="#fff"
          fillOpacity="0"
          rx="0"
          transform="translate(.5 .5)"
        ></rect>
      </clipPath>
    </defs>
    <rect
      id="ic:baseline-access-time-filled"
      width="25"
      height="25"
      fill="#FFF"
      fillOpacity="0"
      rx="0"
      transform="translate(.5 .5)"
    ></rect>
    <g clipPath="url(#clip6_452)">
      <path
        id="Vector"
        fill="#C00D0D"
        fillOpacity="1"
        fillRule="nonzero"
        d="M12.98 2.16C7 2.16 2.16 7.01 2.16 13c0 5.97 4.84 10.83 10.82 10.83 6 0 10.85-4.86 10.85-10.83 0-5.99-4.85-10.84-10.85-10.84m3.58 15.94-4.65-4.66V7.58h2.17v4.97l4.02 4.02z"
      ></path>
    </g>
  </svg>
);

export default Clock;
