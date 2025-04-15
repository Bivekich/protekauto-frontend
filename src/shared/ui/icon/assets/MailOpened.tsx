import { FC, SVGProps } from 'react';

const MailOpened: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    fill="none"
    viewBox="0 0 21 20"
  >
    <path
      fill="#D0D0D0"
      stroke="#D0D0D0"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M18.834 7.5v9.09c0 .503-.373.91-.834.91H3c-.46 0-.833-.407-.833-.91V7.5l8.333 5.417z"
    ></path>
    <path
      stroke="#D0D0D0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.167 7.41 10.5 1.665l8.334 5.743"
    ></path>
  </svg>
);

export default MailOpened;
