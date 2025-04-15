import { FC, SVGProps } from 'react';

const Note: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill="#D0D0D0"
      d="M16.05 0H3.325c-.5 0-.91.406-.91.91V20l7.274-7.273L16.96 20V.91a.91.91 0 0 0-.91-.91"
    ></path>
  </svg>
);

export default Note;
