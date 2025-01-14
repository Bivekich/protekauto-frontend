import { FC, SVGProps } from 'react';

const Profile: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16.667"
    height="16.667"
    fill="none"
    viewBox="0 0 16.667 16.667"
  >
    <path
      id="Vector"
      fill="#CBD5E3"
      fillOpacity="1"
      fillRule="nonzero"
      d="M8.33 0a8.33 8.33 0 1 0 .001 16.661A8.33 8.33 0 0 0 8.33 0m0 3.33c1.61 0 2.92 1.31 2.92 2.92 0 1.6-1.31 2.91-2.92 2.91S5.41 7.85 5.41 6.25c0-1.61 1.31-2.92 2.92-2.92m0 11.67c-1.69 0-3.69-.69-5.12-2.4a8.26 8.26 0 0 1 5.12-1.77c1.85 0 3.66.62 5.12 1.77A6.71 6.71 0 0 1 8.33 15"
    ></path>
  </svg>
);

export default Profile;
