export interface ISegmentedControlProps {
  options: IOption[];
  selected?: string;
  onChange?: (value: string) => void;
  variant?: 'primary' | 'secondary';
}

interface IOption {
  label: string;
  value: string;
}
