import { FC, SVGProps } from 'react';

const MapPoint: FC<SVGProps<SVGSVGElement>> = (props) => (
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
      d="M13 2.167c-4.55 0-8.667 3.488-8.667 8.883 0 3.445 2.654 7.497 7.952 12.166.412.357 1.03.357 1.44 0 5.287-4.67 7.942-8.721 7.942-12.166 0-5.395-4.117-8.883-8.667-8.883M13 13a2.173 2.173 0 0 1-2.167-2.167c0-1.191.975-2.166 2.167-2.166s2.167.975 2.167 2.166A2.173 2.173 0 0 1 13 13"
    ></path>
  </svg>
);

export default MapPoint;
