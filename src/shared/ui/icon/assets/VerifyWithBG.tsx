import { FC, SVGProps } from 'react';

const VerifyWithBG: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="none"
    viewBox="0 0 32 32"
  >
    <path
      fill="#E6EDF6"
      d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16"
    ></path>
    <path
      fill="#041124"
      d="m24 15.607-1.774-2.021.247-2.677-2.626-.596L18.473 8 16 9.062 13.527 8l-1.374 2.313-2.626.589.248 2.676L8 15.608l1.775 2.021-.248 2.684 2.626.596 1.374 2.313L16 22.152l2.473 1.063 1.374-2.313 2.626-.597-.247-2.676zm-9.454 3.637-2.91-2.91 1.026-1.025 1.883 1.877 4.793-4.793 1.026 1.032z"
    ></path>
  </svg>
);

export default VerifyWithBG;
