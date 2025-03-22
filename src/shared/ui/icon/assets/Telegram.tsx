import { FC, SVGProps } from 'react';

const Telegram: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
  >
    <defs>
      <linearGradient
        id="paint_linear_6_500_0"
        x1="1500"
        x2="1500"
        y1="0"
        y2="2977.75"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2AABEE"></stop>
        <stop offset="1" stopColor="#229ED9"></stop>
      </linearGradient>
      <clipPath id="clip6_498">
        <rect
          id="Телеграм 1"
          width="30"
          height="30"
          fill="#fff"
          fillOpacity="0"
          rx="0"
        ></rect>
      </clipPath>
    </defs>
    <rect
      id="Телеграм 1"
      width="30"
      height="30"
      fill="#FFF"
      fillOpacity="0"
      rx="0"
    ></rect>
    <g fillOpacity="1" fillRule="evenodd" clipPath="url(#clip6_498)">
      <path
        id="Oval"
        fill="url(#paint_linear_6_500_0)"
        d="M30 15c0 8.28-6.72 15-15 15-8.29 0-15-6.72-15-15C0 6.71 6.71 0 15 0c8.28 0 15 6.71 15 15"
      ></path>
      <path
        id="Path-3"
        fill="#FFF"
        d="M6.78 14.84c4.38-1.91 7.29-3.16 8.75-3.77 4.17-1.73 5.03-2.03 5.6-2.04.12-.01.4.02.58.17.15.12.19.29.21.41.02.11.05.38.03.59-.23 2.37-1.2 8.12-1.7 10.78-.21 1.12-.63 1.5-1.03 1.54-.87.08-1.53-.58-2.37-1.13-1.32-.87-2.07-1.4-3.35-2.25-1.48-.97-.52-1.51.32-2.39.22-.23 4.06-3.72 4.14-4.03.01-.04.01-.19-.07-.27-.09-.08-.22-.05-.31-.03-.14.03-2.25 1.42-6.33 4.18-.6.41-1.14.61-1.63.6-.53-.01-1.56-.3-2.33-.55-.94-.3-1.69-.47-1.62-.98.03-.27.4-.55 1.11-.83"
      ></path>
    </g>
  </svg>
);

export default Telegram;
