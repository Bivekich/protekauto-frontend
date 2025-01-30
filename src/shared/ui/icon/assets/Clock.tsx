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
    <path
      fill="#C00D0D"
      d="M12.989 2.167C7.009 2.167 2.165 7.02 2.165 13s4.843 10.834 10.823 10.834c5.99 0 10.844-4.854 10.844-10.834S18.979 2.167 12.989 2.167m3.575 15.936-4.648-4.659v-5.86h2.167v4.972l4.019 4.02z"
    ></path>
  </svg>
);

export default Clock;
