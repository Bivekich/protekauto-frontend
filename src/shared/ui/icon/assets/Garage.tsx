import { FC, SVGProps } from 'react';

const Garage: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="20"
    fill="none"
    viewBox="0 0 26 20"
  >
    <path
      fill="#fff"
      d="M25.5 5.625v13.75H23V8.125H3v11.25H.5V5.625l12.5-5zm-3.75 3.75H4.25v2.5h17.5zm0 3.75H4.25v2.5h17.5z"
    ></path>
    <path fill="#fff" d="M4.25 16.875h17.5v2.5H4.25z"></path>
  </svg>
);

export default Garage;
