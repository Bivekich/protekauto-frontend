import { iconsList } from './assets';
import { CSSProperties } from 'react';

export type TIconMap = keyof typeof iconsList;

export interface IIconProps {
  name: TIconMap;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
