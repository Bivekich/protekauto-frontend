import { FC, SVGProps } from 'react';

const RefundWithBG: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <path
      fill="#E6EDF6"
      d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16"
    ></path>
    <path
      fill="#041124"
      fillRule="evenodd"
      d="M8 12h16V9.778a.77.77 0 0 0-.234-.55A.8.8 0 0 0 23.2 9H8.8a.8.8 0 0 0-.566.228.77.77 0 0 0-.234.55zm16 10.222V14H8v8.222c0 .206.084.404.234.55S8.588 23 8.8 23h14.4a.8.8 0 0 0 .566-.228.77.77 0 0 0 .234-.55m-11.222-4.547L15.3 15l1.1 1.167-1.422 1.508H20v1.65h-5.022l1.422 1.508L15.3 22l-2.522-2.675L12 18.5z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default RefundWithBG;
