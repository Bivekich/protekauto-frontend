import { FC, SVGProps } from 'react';

const ArrowBack: FC<SVGProps<SVGSVGElement>> = (props) => (
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
      d="M10 5.863V2.546c0-.257.074-.507.211-.72.138-.213.333-.379.56-.477a1.2 1.2 0 0 1 .722-.074c.243.05.466.172.64.353L20 9.676l-7.866 8.046c-.116.12-.254.217-.405.282a1.21 1.21 0 0 1-1.363-.282 1.32 1.32 0 0 1-.366-.917V13.58c-3.437.088-7.194.734-10 5.171v-1.296C0 11.448 4.375 6.509 10 5.863"
    ></path>
  </svg>
);

export default ArrowBack;
