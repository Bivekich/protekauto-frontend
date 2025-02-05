import { IOption } from '@/shared';

export interface ISelectProps {
  placeholder?: string;
  options: IOption[];
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
}
