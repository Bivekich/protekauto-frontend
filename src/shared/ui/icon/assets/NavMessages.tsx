import { FC, SVGProps } from 'react';

const NavMessages: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    fill="none"
    viewBox="0 0 18 19"
  >
    <path
      fill="#424F60"
      d="M15.4 2H2.6c-.88 0-1.592.72-1.592 1.6L1 18l3.2-3.2h11.2c.88 0 1.6-.72 1.6-1.6V3.6c0-.88-.72-1.6-1.6-1.6m-1.6 9.143H4.2V10h9.6zm0-2.286H4.2V7.714h9.6zm0-2.286H4.2V5.43h9.6z"
    ></path>
  </svg>
);

export default NavMessages;
