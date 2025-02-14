import { FC, SVGProps } from 'react';

const Wallet: FC<SVGProps<SVGSVGElement>> = (props) => (
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
      d="M29.75 26.071v1.417a2.84 2.84 0 0 1-2.833 2.833H7.083a2.833 2.833 0 0 1-2.833-2.833V7.655A2.833 2.833 0 0 1 7.083 4.82h19.834a2.84 2.84 0 0 1 2.833 2.834V9.07H17a2.834 2.834 0 0 0-2.833 2.834v11.333A2.833 2.833 0 0 0 17 26.071zM17 23.238h14.167V11.905H17zm5.667-3.542a2.12 2.12 0 0 1-2.125-2.125c0-1.176.949-2.125 2.125-2.125 1.175 0 2.125.95 2.125 2.125s-.95 2.125-2.125 2.125"
    ></path>
  </svg>
);

export default Wallet;
