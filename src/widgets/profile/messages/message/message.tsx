import { Button, Icon } from '@/shared';

export const Message = () => {
  return (
    <div className={'card-wrapper space-y-5'}>
      <div className={'space-y-4'}>
        <h4 className={'text-desktop-md'}>
          До 50% кешбэка баллами, Сейвы и карта Сплита
        </h4>
        <div className={'flex flex-col gap-4'}>
          <p className={'text-desktop-regular space-x-4'}>
            <span>Павел воронин</span>
            <span className={'text-text-2'}>voronin.p.e@gmail.com</span>
            <span className={'text-text-2'}>4 сентября 2024 г. в 19:09</span>
          </p>
          <span className={'text-text-2 text-desktop-regular'}>Я {'>'}</span>
        </div>
      </div>
      <article className={'text-desktop-regular leading-8'}>
        Здравствуйте, Макс Еличев! Встречайте: герои максимальной выгоды <br />
        Категории выгоды, карта Пэй, Сейвы и Сплит. Выбирайте любого или всех
        сразу — вам можно <br />
        <br />
        Ваш Павел Воронин
      </article>

      <Button
        variant={'outlined'}
        className={
          'w-full border-ice-grey flex justify-start text-base text-text-input py-2 px-4 gap-4 rounded-lg'
        }
        size={'md'}
      >
        <Icon name={'arrow_back'} style={{ transform: 'rotateY(180deg)' }} />
        Ответить
      </Button>
    </div>
  );
};
