import { FC, SVGProps } from 'react';

const TelegramBig: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="62"
    height="63"
    fill="none"
    viewBox="0 0 62 63"
  >
    <g clipPath="url(#clip0_292_2416)">
      <path
        fill="url(#paint0_linear_292_2416)"
        d="M30.95 62.472c17.093 0 30.95-13.857 30.95-30.95S48.042.572 30.95.572 0 14.43 0 31.522s13.857 30.95 30.95 30.95"
      ></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M14.01 31.194Q27.544 25.3 32.059 23.42c8.595-3.575 10.381-4.196 11.545-4.217.256-.004.829.06 1.2.36.313.254.399.597.44.838s.093.79.052 1.219c-.466 4.894-2.481 16.77-3.507 22.251-.434 2.32-1.288 3.097-2.115 3.173-1.797.165-3.162-1.188-4.903-2.329-2.724-1.786-4.263-2.897-6.907-4.64-3.056-2.013-1.075-3.12.667-4.928.456-.474 8.375-7.677 8.528-8.33.019-.082.037-.387-.144-.547s-.448-.106-.641-.062q-.41.093-13.055 8.628-1.853 1.273-3.356 1.24c-1.105-.024-3.23-.625-4.811-1.139-1.938-.63-3.479-.963-3.345-2.033q.105-.836 2.303-1.71"
        clipRule="evenodd"
      ></path>
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_292_2416"
        x1="3094.97"
        x2="3094.97"
        y1="0.572"
        y2="6144.6"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2AABEE"></stop>
        <stop offset="1" stopColor="#229ED9"></stop>
      </linearGradient>
      <clipPath id="clip0_292_2416">
        <path fill="#fff" d="M0 .572h61.899v61.9H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default TelegramBig;
