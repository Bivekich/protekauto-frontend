import { FC, SVGProps } from 'react';

const Phone: FC<SVGProps<SVGSVGElement>> = (props) => (
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
      d="M7.172 11.69a16.4 16.4 0 0 0 7.139 7.138l2.383-2.383c.293-.293.726-.39 1.105-.26 1.213.4 2.524.617 3.868.617.595 0 1.083.488 1.083 1.084v3.78c0 .596-.488 1.084-1.083 1.084-10.173 0-18.417-8.244-18.417-18.417 0-.596.487-1.083 1.083-1.083h3.792c.596 0 1.083.487 1.083 1.083 0 1.354.217 2.654.618 3.868.119.379.032.801-.271 1.105z"
    ></path>
  </svg>
);

export default Phone;
