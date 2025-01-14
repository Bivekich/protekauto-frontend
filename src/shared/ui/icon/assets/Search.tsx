import { FC, SVGProps } from 'react';

const Search: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="17.49"
    height="17.49"
    fill="none"
    viewBox="0 0 17.49 17.49"
  >
    <path
      id="Vector"
      fill="#637895"
      fillOpacity="1"
      fillRule="nonzero"
      d="M12.5 11h-.79l-.29-.27A6.47 6.47 0 0 0 13 6.5c0-1.29-.39-2.55-1.1-3.62A6.45 6.45 0 0 0 8.98.49 6.502 6.502 0 0 0 .49 8.98a6.45 6.45 0 0 0 2.39 2.92c1.07.71 2.33 1.1 3.62 1.1 1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16zm-6 0A4.5 4.5 0 1 1 11 6.5C11 8.98 8.98 11 6.5 11"
    ></path>
  </svg>
);

export default Search;
