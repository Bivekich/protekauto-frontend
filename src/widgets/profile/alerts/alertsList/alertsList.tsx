import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Icon,
  LabelWrapper,
  Select,
} from '@/shared';
import { Checkbox } from '@/shared/ui/checkbox';

const mock = [
  'Все оповещения',
  'Доставка товара',
  'Поступление оплаты',
  'Отказ в поставке',
  'Возврат товара',
  'Упд или чек',
];

export const AlertsList = () => {
  return (
    <div className={'w-full h-full font-golos space-y-6'}>
      <h4 className={'font-semibold text-[30px]'}>
        Уведомление на электронную почту
      </h4>
      <Accordion type={'single'} collapsible>
        <AccordionItem value="item-1" className={'card-wrapper'}>
          <AccordionTrigger>
            <div className={'flex gap-4 items-center'}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              <Icon name={'phone_black' || 'email'} />
              <p className={'text-[22px] font-semibold'}>
                voronin.p.e@gmail.com
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className={'pt-5'}>
            <div className={'space-y-6'}>
              <div className={'flex w-full gap-5'}>
                <LabelWrapper
                  label={'Подразделения'}
                  containerClassName={'w-full'}
                >
                  <Select options={[]} placeholder={'Все'} />
                </LabelWrapper>

                <LabelWrapper
                  label={'Адрес доставки'}
                  containerClassName={'w-full'}
                >
                  <Select options={[]} placeholder={'Все'} />
                </LabelWrapper>
              </div>

              <div className={'w-full grid grid-cols-4 gap-5'}>
                {mock.map((item) => (
                  <div key={item} className={'flex gap-3 items-center'}>
                    <Checkbox />
                    <p className={'text-paragraph-sm'}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
