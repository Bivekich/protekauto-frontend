import { FC, SVGProps } from 'react';

const ProfileRed: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="26"
    fill="none"
    viewBox="0 0 25 26"
  >
    <path
      fill="#C00D0D"
      d="M12.5.5C5.6.5 0 6.1 0 13s5.6 12.5 12.5 12.5S25 19.9 25 13 19.4.5 12.5.5m0 5a4.38 4.38 0 0 1 4.375 4.375A4.38 4.38 0 0 1 12.5 14.25a4.38 4.38 0 0 1-4.375-4.375A4.38 4.38 0 0 1 12.5 5.5m0 17.5c-2.537 0-5.537-1.025-7.675-3.6a12.44 12.44 0 0 1 15.35 0C18.038 21.975 15.037 23 12.5 23"
    ></path>
  </svg>
);

export default ProfileRed;
