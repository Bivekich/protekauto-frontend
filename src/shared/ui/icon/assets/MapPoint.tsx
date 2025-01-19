import { FC, SVGProps } from 'react';

const MapPoint: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="17.333"
    height="21.317"
    fill="none"
    viewBox="0 0 17.333 21.317"
  >
    <path
      id="Vector"
      fill="#C00D0D"
      fillOpacity="1"
      fillRule="nonzero"
      d="M8.66 0C4.11 0 0 3.48 0 8.88c0 3.44 2.65 7.49 7.95 12.16.41.36 1.03.36 1.44 0 5.28-4.67 7.94-8.72 7.94-12.16 0-5.4-4.12-8.88-8.67-8.88m0 10.83a2.164 2.164 0 1 1 2.17-2.17c0 1.19-.98 2.17-2.17 2.17"
    ></path>
  </svg>
);

export default MapPoint;
