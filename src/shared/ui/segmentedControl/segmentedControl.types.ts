export interface ISegmentedControlProps {
  options: IOption[];
  selected?: string;
  onChange?: (value: string) => void;
}

interface IOption {
  label: string;
  value: string;
}
