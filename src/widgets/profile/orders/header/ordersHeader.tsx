import {
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SegmentedControl,
} from '@/shared';

const segmentedControlOptions = [
  { label: 'Текущие', value: 'current' },
  { label: 'Выполненные', value: 'done' },
  { label: 'Отмененные', value: 'canceled' },
];

export const OrdersHeader = () => {
  return (
    <div className={'h-stack justify-between items-center'}>
      <SegmentedControl options={segmentedControlOptions} />

      <InputGroup className={'max-w-[420px]'}>
        <Input placeholder={'Поиск'} />
        <InputRightElement>
          <Icon name={'search'} />
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
