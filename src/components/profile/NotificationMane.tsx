import * as React from "react";
import LKMenu from '@/components/LKMenu';

const NotificationMane = () => {
  return (
    <div className="flex relative flex-col gap-5 justify-center items-start flex-[1_0_0]">
    <div className="flex relative flex-col gap-8 items-start self-stretch p-8 bg-white rounded-2xl max-md:gap-5 max-sm:flex-col max-sm:gap-4">
      <div className="flex relative flex-col gap-5 items-start self-stretch">
        <div className="flex relative justify-between items-center self-stretch max-sm:flex-col max-sm:gap-2.5">
          <div
            layer-name="voronin.p.e@gmail.com"
            className="relative text-xl font-bold leading-5 text-gray-950"
          >
            voronin.p.e@gmail.com
          </div>
          <div
            layer-name="link_control_element"
            className="flex relative gap-1.5 items-center"
          >
            <div layer-name="delete" className="relative h-4 w-[18px]">
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<svg id=&quot;I32:380;1705:18492;1599:9356&quot; width=&quot;14&quot; height=&quot;16&quot; viewBox=&quot;0 0 14 16&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;delete-icon&quot; style=&quot;width: 14px; height: 16px; flex-shrink: 0; fill: #D0D0D0&quot;> <path d=&quot;M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z&quot; fill=&quot;#D0D0D0&quot;></path> </svg>",
                  }}
                />
              </div>
            </div>
            <div
              layer-name="Редактировать"
              className="relative text-sm leading-5 text-gray-600"
            >
              Удалить
            </div>
          </div>
        </div>
        <div className="flex relative gap-5 items-start self-stretch">
          <div className="flex relative flex-col gap-1.5 items-start flex-[1_0_0]">
            <div
              layer-name="Подразделение"
              className="relative self-stretch text-sm leading-5 text-gray-950"
            >
              Подразделение
            </div>
            <div
              layer-name="Select"
              className="flex relative justify-between items-center self-stretch px-6 py-4 bg-white rounded border border-solid border-stone-300 max-sm:flex-col max-sm:gap-2.5"
            >
              <div
                layer-name="Mazda"
                className="relative text-sm leading-5 text-neutral-500"
              >
                Все
              </div>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<svg id=&quot;I32:384;186:331&quot; width=&quot;14&quot; height=&quot;9&quot; viewBox=&quot;0 0 14 9&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;dropdown-arrow&quot; style=&quot;width: 12px; height: 6px; fill: #747474; stroke-width: 2px; stroke: #747474&quot;> <path d=&quot;M1 1L7 7L13 1&quot; stroke=&quot;#747474&quot; stroke-width=&quot;2&quot;></path> </svg>",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex relative flex-col gap-1.5 items-start flex-[1_0_0]">
            <div
              layer-name="Адрес доставки"
              className="relative self-stretch text-sm leading-5 text-gray-950"
            >
              Адрес доставки
            </div>
            <div
              layer-name="Select"
              className="flex relative justify-between items-center self-stretch px-6 py-4 bg-white rounded border border-solid border-stone-300 max-sm:flex-col max-sm:gap-2.5"
            >
              <div
                layer-name="Mazda"
                className="relative text-sm leading-5 text-neutral-500"
              >
                Все
              </div>
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      "<svg id=&quot;I32:387;186:331&quot; width=&quot;14&quot; height=&quot;9&quot; viewBox=&quot;0 0 14 9&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;dropdown-arrow&quot; style=&quot;width: 12px; height: 6px; fill: #747474; stroke-width: 2px; stroke: #747474&quot;> <path d=&quot;M1 1L7 7L13 1&quot; stroke=&quot;#747474&quot; stroke-width=&quot;2&quot;></path> </svg>",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex relative flex-wrap gap-y-8 justify-between content-start items-start self-stretch max-md:gap-5 max-sm:flex-col max-sm:gap-2.5">
          <div
            layer-name="Check_block"
            className="flex relative gap-2.5 items-center pr-5 max-sm:pr-0"
          >
            <div layer-name="Check_box" className="relative w-6 h-6">
              <div className="absolute top-0 left-0 shrink-0 w-6 h-6 rounded border border-solid aspect-[1/1] border-stone-300" />
            </div>
            <div
              layer-name="Экспресс доставка"
              className="relative text-sm font-medium leading-5 text-zinc-900"
            >
              Все оповещения
            </div>
          </div>
          <div
            layer-name="Check_block"
            className="flex relative gap-2.5 items-center pr-5 max-sm:pr-0"
          >
            <div layer-name="Check_box" className="relative w-6 h-6">
              <div className="absolute top-0 left-0 shrink-0 w-6 h-6 rounded border border-solid aspect-[1/1] border-stone-300" />
            </div>
            <div
              layer-name="Экспресс доставка"
              className="relative text-sm font-medium leading-5 text-zinc-900"
            >
              Доставка товара
            </div>
          </div>
          <div
            layer-name="Check_block"
            className="flex relative gap-2.5 items-center pr-5 max-sm:pr-0"
          >
            <div layer-name="Check_box" className="relative w-6 h-6">
              <div className="absolute top-0 left-0 shrink-0 w-6 h-6 rounded border border-solid aspect-[1/1] border-stone-300" />
            </div>
            <div
              layer-name="Экспресс доставка"
              className="relative text-sm font-medium leading-5 text-zinc-900"
            >
              Поступление оплаты
            </div>
          </div>
          <div
            layer-name="Check_block"
            className="flex relative gap-2.5 items-center pr-5 max-sm:pr-0"
          >
            <div layer-name="Check_box" className="relative w-6 h-6">
              <div className="absolute top-0 left-0 shrink-0 w-6 h-6 rounded border border-solid aspect-[1/1] border-stone-300" />
            </div>
            <div
              layer-name="Экспресс доставка"
              className="relative text-sm font-medium leading-5 text-zinc-900"
            >
              Снято с резерва
            </div>
          </div>
          <div
            layer-name="Check_block"
            className="flex relative gap-2.5 items-center pr-5 max-sm:pr-0"
          >
            <div layer-name="Check_box" className="relative w-6 h-6">
              <div className="absolute top-0 left-0 shrink-0 w-6 h-6 rounded border border-solid aspect-[1/1] border-stone-300" />
            </div>
            <div
              layer-name="Экспресс доставка"
              className="relative text-sm font-medium leading-5 text-zinc-900"
            >
              Отказ в поставке
            </div>
          </div>
          <div
            layer-name="Check_block"
            className="flex relative gap-2.5 items-center pr-5 max-sm:pr-0"
          >
            <div layer-name="Check_box" className="relative w-6 h-6">
              <div className="absolute top-0 left-0 shrink-0 w-6 h-6 rounded border border-solid aspect-[1/1] border-stone-300" />
            </div>
            <div
              layer-name="Экспресс доставка"
              className="relative text-sm font-medium leading-5 text-zinc-900"
            >
              Возврат товара
            </div>
          </div>
          <div
            layer-name="Check_block"
            className="flex relative gap-2.5 items-center pr-5 max-sm:pr-0"
          >
            <div layer-name="Check_box" className="relative w-6 h-6">
              <div className="absolute top-0 left-0 shrink-0 w-6 h-6 rounded border border-solid aspect-[1/1] border-stone-300" />
            </div>
            <div
              layer-name="Экспресс доставка"
              className="relative text-sm font-medium leading-5 text-zinc-900"
            >
              УПД или чек
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-px bg-stone-300" />
      <div className="flex relative flex-col gap-5 items-start self-stretch">
        <div
          layer-name="Добавление e-mail для уведомлений"
          className="relative text-xl font-bold leading-5 text-gray-950"
        >
          Добавление e-mail для уведомлений
        </div>
        <div className="flex relative flex-col gap-1.5 items-start self-stretch">
          <div
            layer-name="Адрес электронной почты"
            className="relative self-stretch text-sm leading-5 text-gray-950"
          >
            Адрес электронной почты
          </div>
          <div className="flex relative gap-5 items-start self-stretch">
            <div
              layer-name="Input"
              className="relative gap-2.5 px-6 py-4 text-sm leading-5 bg-white rounded border border-solid border-stone-300 flex-[1_0_0] h-[52px] text-neutral-500"
            >
              @
            </div>
            <div
              layer-name="Button Small"
              className="relative gap-2.5 px-5 py-3.5 text-base font-medium leading-5 text-center text-white bg-red-600 rounded-xl h-[50px]"
            >
              Готово
            </div>
            <div
              layer-name="Button Small"
              className="relative gap-2.5 px-5 py-3.5 text-base font-medium leading-5 text-center rounded-xl border border-red-600 border-solid h-[50px] text-gray-950"
            >
              Отменить
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-px bg-stone-300" />
      <div className="flex relative justify-between items-start self-stretch max-sm:flex-col max-sm:gap-2.5">
        <div
          layer-name="Button Small"
          className="relative gap-2.5 px-5 py-3.5 text-base font-medium leading-5 text-center text-white bg-red-600 rounded-xl h-[50px]"
        >
          Сохранить
        </div>
        <div
          layer-name="Button Small"
          className="relative gap-2.5 px-5 py-3.5 text-base font-medium leading-5 text-center rounded-xl border border-red-600 border-solid h-[50px] text-gray-950"
        >
          Добавить почту для уведомлений
        </div>
      </div>
    </div>
  </div>
  );
};

export default NotificationMane; 