import { FC, SVGProps } from 'react';

const NavFavorites: FC<SVGProps<SVGSVGElement>> = (props) => (
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
      d="m9 16.68-1.16-1.056C3.72 11.888 1 9.416 1 6.4 1 3.928 2.936 2 5.4 2A4.8 4.8 0 0 1 9 3.664 4.81 4.81 0 0 1 12.6 2C15.064 2 17 3.928 17 6.4c0 3.016-2.72 5.488-6.84 9.224z"
    ></path>
  </svg>
);

export default NavFavorites;
