import { FC } from 'react';
import { IIconProps } from './icon.types';
import { iconsList } from './assets';

export const Icon: FC<IIconProps> = ({ name, className, onClick, style }) => {
  return (
    <div className={className} style={style} onClick={onClick}>
      {iconsList[name]}
    </div>
  );
};
