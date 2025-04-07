import { FC, SVGProps } from 'react';

const Trash: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="#D0D0D0"
      d="M7 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413A1.92 1.92 0 0 1 17 21zm2-4h2V8H9zm4 0h2V8h-2z"
    ></path>
  </svg>
);

export default Trash;
