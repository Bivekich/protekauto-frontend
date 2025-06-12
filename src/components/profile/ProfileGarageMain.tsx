import * as React from "react";





const ProfileGarageMain = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [vin, setVin] = React.useState("");
  const [searchComment, setSearchComment] = React.useState("");
  const [carComment, setCarComment] = React.useState("");
  const [showAddCar, setShowAddCar] = React.useState(false);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-wrap gap-5 items-center px-8 py-3 w-full text-base leading-snug text-gray-400 whitespace-nowrap bg-white rounded-lg max-md:px-5 max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto text-gray-400 basis-0 text-ellipsis max-md:max-w-full">
          <input
            type="text"
            placeholder="Поиск по гаражу"
            className="w-full bg-transparent outline-none text-gray-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <img
          loading="lazy"
          src="/images/search_ixon.svg"
          className="object-contain shrink-0 self-stretch my-auto w-5 rounded-sm aspect-square"
        />
      </div>
      <div className="flex overflow-hidden flex-col p-8 mt-5 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="text-3xl font-bold leading-none text-gray-950">
          Мои автомобили
        </div>
        <div className="flex flex-col justify-center px-5 py-3 mt-8 w-full rounded-lg bg-slate-50 max-md:max-w-full">
          <div className="flex flex-wrap gap-8 items-center w-full max-md:max-w-full">
            <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
              <div className="self-stretch my-auto text-xl font-bold leading-none text-gray-950">
                Lexus RX330/350
              </div>
              <div className="self-stretch my-auto text-sm leading-snug text-gray-600">
                JTJHK31U802039999
              </div>
            </div>
            <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-1.5 my-auto text-sm leading-snug whitespace-nowrap bg-white rounded border border-solid basis-3 border-zinc-100 min-h-[32px] min-w-[240px] text-stone-300">
              <input
                type="text"
                placeholder="Комментарий"
                className="w-full bg-transparent outline-none text-stone-300"
                value={searchComment}
                onChange={e => setSearchComment(e.target.value)}
              />
            </div>
            <div className="gap-2.5 self-stretch px-5 py-2 my-auto font-medium leading-tight text-center bg-red-600 rounded-lg min-h-[32px] cursor-pointer text-white" role="button" tabIndex={0}>
              Найти запчасть
            </div>
            <div className="flex gap-5 items-center self-stretch pr-2.5 my-auto text-sm leading-snug text-gray-600 whitespace-nowrap">
              <button type="button" className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer text-sm leading-snug text-gray-600">
                <img
                  loading="lazy"
                  src="/images/delete.svg"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                />
                <span className="self-stretch my-auto text-gray-600">
                  Удалить
                </span>
              </button>
              <button type="button" className="flex gap-1.5 items-center self-stretch my-auto cursor-pointer text-sm leading-snug text-gray-600">
                <span className="self-stretch my-auto text-gray-600">
                  Развернуть
                </span>
                <img
                  loading="lazy"
                  src="/images/arrow_drop.svg"
                  className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                />
              </button>
            </div>
          </div>
        </div>
        {!showAddCar && (
          <div className="flex mt-8">
            <div
              className="gap-2.5 self-stretch px-5 py-4 bg-red-600 rounded-xl min-h-[50px] cursor-pointer text-white text-base font-medium leading-tight text-center"
              role="button"
              tabIndex={0}
              onClick={() => setShowAddCar(true)}
            >
              Добавить авто
            </div>
          </div>
        )}
        {showAddCar && (
          <>
            <div className="mt-8 text-3xl font-bold leading-none text-gray-950">
              Добавить авто в гараж
            </div>
            <div className="flex flex-col mt-8 w-full text-sm leading-snug whitespace-nowrap text-gray-950 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 items-start w-full min-h-[78px] max-md:max-w-full">
                <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="text-gray-950 max-md:max-w-full">VIN</div>
                  <div className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[52px] text-gray-950 max-md:px-5 max-md:max-w-full">
                    <input
                      type="text"
                      placeholder="VIN"
                      className="w-full bg-transparent outline-none text-gray-950"
                      value={vin}
                      onChange={e => setVin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="text-gray-950 max-md:max-w-full">Комментарий</div>
                  <div className="gap-2.5 self-stretch px-6 py-4 mt-1.5 w-full bg-white rounded border border-solid border-stone-300 min-h-[52px] text-gray-950 max-md:px-5 max-md:max-w-full">
                    <input
                      type="text"
                      placeholder="Комментарий"
                      className="w-full bg-transparent outline-none text-gray-950"
                      value={carComment}
                      onChange={e => setCarComment(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-8 items-start self-start mt-8 text-base font-medium leading-tight text-center whitespace-nowrap">
              <div
                className="gap-2.5 self-stretch px-5 py-4 bg-red-600 rounded-xl min-h-[50px] cursor-pointer text-white"
                role="button"
                tabIndex={0}
                onClick={() => setShowAddCar(false)}
              >
                Сохранить
              </div>
              <div
                className="gap-2.5 self-stretch px-5 py-4 rounded-xl border border-red-600 min-h-[50px] cursor-pointer bg-white text-gray-950"
                role="button"
                tabIndex={0}
                onClick={() => setShowAddCar(false)}
              >
                Отменить
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex overflow-hidden flex-col p-8 mt-5 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="text-3xl font-bold leading-none text-gray-950">
          Ранее вы искали
        </div>
        <div className="flex flex-col mt-8 w-full max-md:max-w-full">
          <div className="flex flex-col justify-center px-5 py-3 w-full rounded-lg bg-slate-50 min-h-[44px] max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
                <div className="self-stretch my-auto text-lg font-bold leading-none text-gray-950">
                  Lexus RX330/350
                </div>
                <div className="self-stretch my-auto text-sm leading-snug text-gray-600">
                  JTJHK31U802039999
                </div>
              </div>
              <button type="button" className="flex gap-1.5 items-center self-stretch my-auto text-sm leading-snug text-gray-600 cursor-pointer bg-transparent">
                <img
                  loading="lazy"
                  src="/images/add.svg"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
                <span className="self-stretch my-auto text-gray-600">
                  Добавить в гараж
                </span>
              </button>
              <div className="flex gap-5 items-center self-stretch pr-2.5 my-auto text-sm leading-snug text-gray-600 whitespace-nowrap">
                <div className="self-stretch my-auto text-gray-600">
                  14.05.2025
                </div>
                <button type="button" className="flex gap-1.5 items-center self-stretch my-auto text-sm leading-snug text-gray-600 cursor-pointer bg-transparent">
                  <img
                    loading="lazy"
                    src="/images/delete.svg"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <span className="self-stretch my-auto text-gray-600">
                    Удалить
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-5 py-3 mt-2.5 w-full rounded-lg bg-slate-50 min-h-[44px] max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div className="flex gap-8 items-center self-stretch my-auto min-w-[240px]">
                <div className="self-stretch my-auto text-lg font-bold leading-none text-gray-950">
                  Lexus RX330/350
                </div>
                <div className="self-stretch my-auto text-sm leading-snug text-gray-600">
                  JTJHK31U802039999
                </div>
              </div>
              <button type="button" className="flex gap-1.5 items-center self-stretch my-auto text-sm leading-snug text-gray-600 cursor-pointer bg-transparent">
                <img
                  loading="lazy"
                  src="/images/add.svg"
                  className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                />
                <span className="self-stretch my-auto text-gray-600">
                  Добавить в гараж
                </span>
              </button>
              <div className="flex gap-5 items-center self-stretch pr-2.5 my-auto text-sm leading-snug text-gray-600 whitespace-nowrap">
                <div className="self-stretch my-auto text-gray-600">
                  14.05.2025
                </div>
                <button type="button" className="flex gap-1.5 items-center self-stretch my-auto text-sm leading-snug text-gray-600 cursor-pointer bg-transparent">
                  <img
                    loading="lazy"
                    src="/images/delete.svg"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <span className="self-stretch my-auto text-gray-600">
                    Удалить
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileGarageMain;


