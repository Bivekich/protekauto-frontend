import { Icon, WidgetContainer } from '@/shared';
import Link from 'next/link';
import styles from './styles.module.css';
import Image from 'next/image';
import BannerBG from '@img/wholesale/BannerBG.png';

export const WholesaleBottom = () => {
  return (
    <WidgetContainer
      innerContainerProps={{
        className: 'py-20 space-y-8',
      }}
      outerContainerProps={{
        className: 'bg-sky-blue',
      }}
    >
      <h1 className={'text-title-secondary text-[42px]'}>
        Как покупать по оптовой цене
      </h1>

      <div className={'grid grid-cols-5 gap-12'}>
        <div className={styles.card}>
          <div className={`text-paragraph-sm`}>
            <Link href={'/'} className={'text-primary-red'}>
              Зарегистрируйтесь{' '}
            </Link>
            как юридическое лицо
          </div>
          <Icon name={'arrow_circle'} />
        </div>

        <div className={styles.card}>
          <div className={`text-paragraph-sm`}>
            Подберите
            <Link href={'/'} className={'text-primary-red'}>
              {' '}
              запчасти в каталоге{' '}
            </Link>
            или воспользуйтесь
            <Link href={'/'} className={'text-primary-red'}>
              {' '}
              помощью наших экспертов
            </Link>
          </div>
          <Icon name={'arrow_circle'} />
        </div>

        <div className={styles.card}>
          <div className={`text-paragraph-sm`}>
            Добавьте адрес доставки и оформите заказ
          </div>
          <Icon name={'arrow_circle'} />
        </div>

        <div className={styles.card}>
          <div className={`text-paragraph-sm`}>
            Скачайте счет на оплату или оплатите заказ картой
          </div>
          <Icon name={'arrow_circle'} />
        </div>

        <div className={styles.card}>
          <div className={`text-paragraph-sm`}>
            Получите заказ и закрывающие документы
          </div>
          <Icon name={'arrow_circle'} />
        </div>
      </div>

      <div className={'relative rounded-xl overflow-hidden p-[60px]'}>
        <div
          className={
            'absolute inset-0 bg-gradient-to-r from-secondary-blue to-secondary-blue-80 z-10 opacity-[93%]'
          }
        />
        <Image
          src={BannerBG}
          alt={'Фон'}
          fill
          className={'absolute object-cover z-0'}
        />

        <div className={'relative z-20 w-full h-full flex justify-between'}>
          <div className={'w-full flex flex-col gap-9'}>
            <h3 className={'text-title text-[38px] relative text-white'}>
              Поддержка оптовых покупателей
            </h3>
            <div className={'h-full flex flex-col justify-center'}>
              <div className={'flex gap-8 items-center'}>
                <Icon name={'telegram_big'} />
                <Icon name={'whatsapp_big'} />
              </div>
            </div>
          </div>

          <div className={'w-full flex flex-col text-white gap-4'}>
            <p className={'text-paragraph text-[22px]'}>
              Для наших постоянных оптовых клиентов мы предлагаем отсрочку
              платежа, что позволит вам удобно планировать свои финансовые
              расходы.
            </p>
            <p className={'text-paragraph text-[22px]'}>
              Также мы принимаем пред.заказы на наш склад, чтобы вы могли быть
              уверены в наличии необходимых запчастей для своих клиентов.
            </p>
            <p className={'text-paragraph text-[22px]'}>
              Постоянным оптовым клиентам мы предоставляем индивидуальные
              скидки.
            </p>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};
