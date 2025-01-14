import { FC, SVGProps } from 'react';

const Phone: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      id="Vector"
      fill="#C00D0D"
      fillOpacity="1"
      fillRule="nonzero"
      d="M3.01 6.49a12.66 12.66 0 0 0 5.49 5.49l1.84-1.84c.22-.22.55-.3.85-.19.93.3 1.94.47 2.97.47.46 0 .84.38.84.83v2.91c0 .46-.38.84-.84.84C6.34 15 0 8.65 0 .83 0 .37.37 0 .83 0h2.92c.45 0 .83.37.83.83 0 1.04.17 2.04.47 2.97.09.29.03.62-.2.85z"
    ></path>
  </svg>
);

export default Phone;
