import { AutoScroll, Button, Icon, WidgetContainer } from '@/shared';
import { cards } from './cards';

export const MainInStock = () => {
  const cards1 = cards.slice(0, 3);
  const cards2 = cards.slice(3, 7);

  return (
    <WidgetContainer
      innerContainerProps={{
        className: 'flex flex-col gap-10',
      }}
    >
      <div className={'w-full flex justify-between items-center'}>
        <h3 className={'text-title-third'}>Автозапчасти в наличии</h3>
        <Button variant={'arrow'}>Ко всем автозапчастям</Button>
      </div>

      <div className={'space-y-5'}>
        <div className={'grid grid-cols-3 gap-5'}>
          {cards1.map((card) => (
            <div
              key={card.title}
              className={`rounded-3xl relative flex flex-col h-[260px] justify-between py-[30px] pl-[30px] hover:scale-[101%] transition-transform cursor-pointer`}
              style={{ background: card.bg }}
            >
              <p className={'text-paragraph font-semibold'}>{card.title}</p>

              <AutoScroll>
                {card.badges.map((badge) => (
                  <div
                    key={badge.text}
                    className={
                      'min-w-fit  px-7 py-5 rounded-full flex items-center gap-2'
                    }
                    style={{
                      background: badge.withIcon ? 'black' : 'white',
                      color: badge.withIcon ? 'white' : 'black',
                    }}
                  >
                    {badge.withIcon && <Icon name={'discount'} />}
                    <p className={'text-paragraph-sm'}>{badge.text}</p>
                  </div>
                ))}
              </AutoScroll>
            </div>
          ))}
        </div>
        <div className={'grid grid-cols-main-cards gap-5'}>
          {cards2.map((card) => (
            <div
              key={card.title}
              className={`rounded-3xl relative flex flex-col h-[260px] justify-between py-[30px] pl-[30px] hover:scale-[101%] transition-transform cursor-pointer`}
              style={{ background: card.bg }}
            >
              <p className={'text-paragraph font-semibold'}>{card.title}</p>

              <AutoScroll>
                {card.badges.map((badge) => (
                  <div
                    key={badge.text}
                    className={
                      'min-w-fit  px-7 py-5 rounded-full flex items-center gap-2'
                    }
                    style={{
                      background: badge.withIcon ? 'black' : 'white',
                      color: badge.withIcon ? 'white' : 'black',
                    }}
                  >
                    {badge.withIcon && <Icon name={'discount'} />}
                    <p className={'text-paragraph-sm'}>{badge.text}</p>
                  </div>
                ))}
              </AutoScroll>
            </div>
          ))}
        </div>
      </div>
    </WidgetContainer>
  );
};
