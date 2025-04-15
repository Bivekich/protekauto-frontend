import { shippingCards } from './shippingCards';
import { Icon } from '@/shared';
import Image from 'next/image';

export const ShippingTop = () => {
  return (
    <div className={'w-full grid grid-cols-shipping-cards gap-5'}>
      {shippingCards.map((card) => (
        <div
          key={card.title}
          className={`bg-${card.bgColor} p-10 font-golos rounded-2xl gap-7 flex flex-col relative`}
        >
          {card?.image && (
            <Image
              {...card.image}
              alt={card.image.alt || `Изображение для ${card.title}`}
              className={'absolute top-4'}
              style={{ right: card.image.right }}
            />
          )}

          <h4
            className={`text-title-fourth text-3xl font-golos text-${card.titleColor}`}
          >
            {card.title}
          </h4>

          <ul className={'space-y-2'}>
            {card.topics.map((topic) => (
              <li
                key={topic}
                className={`flex gap-4 items-center text-label`}
                style={{ color: card.topicsColor }}
              >
                <Icon name={card.icon} />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
