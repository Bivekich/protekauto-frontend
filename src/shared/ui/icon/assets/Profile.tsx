import { FC, SVGProps } from 'react';

const Profile: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="none"
    viewBox="0 0 30 30"
  >
    <path
      fill="#fff"
      d="M15.158 23.395c0-2.632 1.447-5 3.553-6.184-1.711-.658-3.816-1.053-6.185-1.053C6.736 16.158 2 18.526 2 21.42v2.632h13.158zM17.79 8.263c0 2.895-2.369 5.263-5.264 5.263s-5.263-2.368-5.263-5.263S9.632 3 12.526 3c2.895 0 5.264 2.368 5.264 5.263"
    ></path>
    <path
      fill="#2AF50C"
      d="M17.79 23.394c0-2.5 2.104-4.605 4.604-4.605S27 20.894 27 23.394 24.894 28 22.394 28s-4.605-2.106-4.605-4.606"
    ></path>
  </svg>
);

export default Profile;
