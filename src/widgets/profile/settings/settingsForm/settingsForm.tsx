import { Button, Input, LabelWrapper, PhoneInput, Switch } from '@/shared';

export const SettingsForm = () => {
  return (
    <div className={'card-wrapper flex flex-col gap-8'}>
      <form
        className={
          'flex flex-col gap-8 pb-8 border-b border-[rgba(0, 0, 0, 0.05)]'
        }
      >
        <div className={'flex justify-between w-full'}>
          <div className={'flex gap-5'}>
            <LabelWrapper label={'Имя'} containerClassName={'w-[360px]'}>
              <Input placeholder={'Иван'} />
            </LabelWrapper>

            <LabelWrapper label={'Фамилия'} containerClassName={'w-[360px]'}>
              <Input placeholder={'Иванов'} />
            </LabelWrapper>
          </div>

          <Button variant={'third'} size={'md'}>
            Сохранить
          </Button>
        </div>

        <LabelWrapper label={'Номер телефона'} containerClassName={'w-[360px]'}>
          <PhoneInput placeholder={'+7 (999) 999-99-99'} />
        </LabelWrapper>

        <div className={'flex w-full justify-between items-end'}>
          <div className={'flex gap-5 items-end'}>
            <LabelWrapper label={'Email'} containerClassName={'w-[360px]'}>
              <Input placeholder={'example@example.com'} />
            </LabelWrapper>
            <Button>Получить код</Button>
          </div>

          <div className={'flex items-center gap-12'}>
            <p className={'text-paragraph-sm text-placeholder'}>
              Получать уведомления об <br /> акциях и новостях компании
            </p>
            <Switch />
          </div>
        </div>
      </form>
      <Button className={'w-fit'}>Стать Юридическим лицом</Button>
    </div>
  );
};
