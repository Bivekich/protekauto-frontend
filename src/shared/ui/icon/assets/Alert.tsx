import { FC, SVGProps } from 'react';

const Alert: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      id="Subtract"
      fill="#CBD5E3"
      fillOpacity="1"
      fillRule="evenodd"
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M6.954 3.824v5.455a1 1 0 0 0 1 1h.175a1 1 0 0 0 1-1V3.824a1 1 0 0 0-1-1h-.175a1 1 0 0 0-1 1m.348 10.103q.332.19.698.19.399 0 .714-.19.316-.174.498-.492.2-.316.2-.666 0-.33-.132-.595-.102-.206-.283-.372A1.42 1.42 0 0 0 8 11.42q-.325 0-.599.12-.215.093-.398.26a1.25 1.25 0 0 0-.415.968q0 .35.183.666.2.318.531.492"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Alert;
