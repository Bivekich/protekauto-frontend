import { FC, SVGProps } from 'react';

const Discount: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="18"
    fill="none"
    viewBox="0 0 19 18"
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M11.629 2.33 9.462 1.032l-2.167 1.3-2.516.222-.99 2.325-1.905 1.659L2.45 9l-.566 2.462 1.905 1.66.99 2.324 2.516.223 2.167 1.299 2.167-1.3 2.516-.222.99-2.324 1.906-1.66L16.473 9l.567-2.463-1.906-1.66-.99-2.324zM6.854 7.313a.562.562 0 1 1 1.125 0 .562.562 0 0 1-1.125 0m.563-1.687a1.687 1.687 0 1 0 0 3.375 1.687 1.687 0 0 0 0-3.375m-.164 6.585 5.624-5.625-.796-.796-5.625 5.625zm4.101-.96a.562.562 0 1 1 1.125 0 .562.562 0 0 1-1.125 0m.563-1.688a1.688 1.688 0 1 0 0 3.375 1.688 1.688 0 0 0 0-3.375"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Discount;
