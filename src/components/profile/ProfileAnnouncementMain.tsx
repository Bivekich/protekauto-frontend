import * as React from "react";

const ProfileAnnouncementMain = () => {
  const [search, setSearch] = React.useState("");

  return (
    <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px] max-md:max-w-full">
      <div className="flex flex-wrap gap-5 items-center px-8 py-3 w-full text-base leading-snug text-gray-400 whitespace-nowrap bg-white rounded-lg max-md:px-5 max-md:max-w-full">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск уведомлений"
          className="flex-1 shrink self-stretch my-auto text-gray-400 basis-0 text-ellipsis max-md:max-w-full bg-transparent outline-none placeholder-gray-400"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b8e5dde8809a16af6b9b2f399617f9bd340e40c?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
          className="object-contain shrink-0 self-stretch my-auto w-5 rounded-sm aspect-square"
        />
      </div>
      <div className="flex overflow-hidden flex-col p-8 mt-5 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="text-3xl font-bold leading-none text-gray-950">
          Важное
        </div>
        <div className="flex flex-col mt-8 w-full text-sm leading-snug max-md:max-w-full">
          <div className="flex flex-col justify-center px-5 py-3 w-full rounded-lg bg-slate-50 max-md:max-w-full">
            <div className="flex flex-wrap justify-between items-start w-full max-md:max-w-full">
              <div className="flex overflow-hidden flex-wrap flex-1 shrink gap-5 items-start pr-8 basis-0 min-h-[20px] min-w-[240px] max-md:max-w-full">
                <div className="cursor-pointer flex gap-1.5 items-center text-red-600">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/31621e15429b14d49586c2261c65e539112ef134?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-red-600 text-ellipsis">
                    Больше не важно
                  </div>
                </div>
                <div className="font-bold leading-none whitespace-nowrap text-ellipsis text-gray-950 w-[269px]">
                  Скидка на все товары Hett Automotive
                </div>
                <div className="flex-1 shrink text-gray-600 whitespace-nowrap basis-0 text-ellipsis max-md:max-w-full">
                  Только до 31 апреля успейте приобрести качественные товары со
                  скидкой до 50% от Hett Automotive
                </div>
              </div>
              <div className="flex gap-5 items-center pr-2.5 text-gray-600 whitespace-nowrap">
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <div className="self-stretch my-auto text-gray-600">
                    Развернуть
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aab326226184071a16336e722a5902d5446fd0b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                  />
                </div>
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/84d525d7bd06a6d1614a61af6453f489170b4196?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-gray-600">
                    Удалить
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-5 py-3 mt-2.5 w-full rounded-lg bg-slate-50 max-md:max-w-full">
            <div className="flex flex-wrap justify-between items-start w-full max-md:max-w-full">
              <div className="flex overflow-hidden flex-wrap flex-1 shrink gap-5 items-start pr-8 basis-0 min-h-[20px] min-w-[240px] max-md:max-w-full">
                <div className="cursor-pointer flex gap-1.5 items-center text-red-600">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/31621e15429b14d49586c2261c65e539112ef134?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-red-600 text-ellipsis">
                    Больше не важно
                  </div>
                </div>
                <div className="font-bold leading-none whitespace-nowrap text-ellipsis text-gray-950 w-[269px]">
                  Скидка на все товары Hett Automotive
                </div>
                <div className="flex-1 shrink text-gray-600 whitespace-nowrap basis-0 text-ellipsis max-md:max-w-full">
                  Только до 31 апреля успейте приобрести качественные товары со
                  скидкой до 50% от Hett Automotive
                </div>
              </div>
              <div className="flex gap-5 items-center pr-2.5 text-gray-600 whitespace-nowrap">
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <div className="self-stretch my-auto text-gray-600">
                    Развернуть
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aab326226184071a16336e722a5902d5446fd0b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                  />
                </div>
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/84d525d7bd06a6d1614a61af6453f489170b4196?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-gray-600">
                    Удалить
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex overflow-hidden flex-col p-8 mt-5 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
        <div className="text-3xl font-bold leading-none text-gray-950">
          Все уведомления
        </div>
        <div className="flex flex-col mt-8 w-full text-sm leading-snug text-gray-600 max-md:max-w-full">
          <div className="flex flex-col justify-center px-5 py-3 w-full rounded-lg bg-slate-50 max-md:max-w-full">
            <div className="flex flex-wrap justify-between items-start w-full max-md:max-w-full">
              <div className="flex overflow-hidden flex-wrap flex-1 shrink gap-5 items-start pr-8 basis-0 min-h-[20px] min-w-[240px] max-md:max-w-full">
                <div className="cursor-pointer flex gap-1.5 items-center">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7683538c3cf5a8a683c81e126b030648d832fb0a?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-gray-600 text-ellipsis">
                    Пометить как важное
                  </div>
                </div>
                <div className="font-bold leading-none whitespace-nowrap text-ellipsis text-gray-950 w-[269px]">
                  Скидка на все товары Hett Automotive
                </div>
                <div className="flex-1 shrink text-gray-600 whitespace-nowrap basis-0 text-ellipsis max-md:max-w-full">
                  Только до 31 апреля успейте приобрести качественные товары со
                  скидкой до 50% от Hett Automotive
                </div>
              </div>
              <div className="flex gap-5 items-center pr-2.5 whitespace-nowrap">
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <div className="self-stretch my-auto text-gray-600">
                    Развернуть
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aab326226184071a16336e722a5902d5446fd0b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                  />
                </div>
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/84d525d7bd06a6d1614a61af6453f489170b4196?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-gray-600">
                    Удалить
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-5 py-3 mt-2.5 w-full rounded-lg bg-slate-50 max-md:max-w-full">
            <div className="flex flex-wrap justify-between items-start w-full max-md:max-w-full">
              <div className="flex overflow-hidden flex-wrap flex-1 shrink gap-5 items-start pr-8 basis-0 min-h-[20px] min-w-[240px] max-md:max-w-full">
                <div className="cursor-pointer flex gap-1.5 items-center">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7683538c3cf5a8a683c81e126b030648d832fb0a?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-gray-600 text-ellipsis">
                    Пометить как важное
                  </div>
                </div>
                <div className="font-bold leading-none whitespace-nowrap text-ellipsis text-gray-950 w-[269px]">
                  Скидка на все товары Hett Automotive
                </div>
                <div className="flex-1 shrink text-gray-600 whitespace-nowrap basis-0 text-ellipsis max-md:max-w-full">
                  Только до 31 апреля успейте приобрести качественные товары со
                  скидкой до 50% от Hett Automotive
                </div>
              </div>
              <div className="flex gap-5 items-center pr-2.5 whitespace-nowrap">
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <div className="self-stretch my-auto text-gray-600">
                    Развернуть
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aab326226184071a16336e722a5902d5446fd0b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                  />
                </div>
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/84d525d7bd06a6d1614a61af6453f489170b4196?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-gray-600">
                    Удалить
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-5 py-3 mt-2.5 w-full rounded-lg bg-slate-50 max-md:max-w-full">
            <div className="flex flex-wrap justify-between items-start w-full max-md:max-w-full">
              <div className="flex overflow-hidden flex-wrap flex-1 shrink gap-5 items-start pr-8 basis-0 min-h-[20px] min-w-[240px] max-md:max-w-full">
                <div className="cursor-pointer flex gap-1.5 items-center">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7683538c3cf5a8a683c81e126b030648d832fb0a?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-gray-600 text-ellipsis">
                    Пометить как важное
                  </div>
                </div>
                <div className="font-bold leading-none whitespace-nowrap text-ellipsis text-gray-950 w-[269px]">
                  Скидка на все товары Hett Automotive
                </div>
                <div className="flex-1 shrink text-gray-600 whitespace-nowrap basis-0 text-ellipsis max-md:max-w-full">
                  Только до 31 апреля успейте приобрести качественные товары со
                  скидкой до 50% от Hett Automotive
                </div>
              </div>
              <div className="flex gap-5 items-center pr-2.5 whitespace-nowrap">
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <div className="self-stretch my-auto text-gray-600">
                    Развернуть
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aab326226184071a16336e722a5902d5446fd0b?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                  />
                </div>
                <div className="cursor-pointer flex gap-1.5 items-center self-stretch my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/84d525d7bd06a6d1614a61af6453f489170b4196?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
                    className="object-contain shrink-0 self-stretch my-auto aspect-[1.12] w-[18px]"
                  />
                  <div className="self-stretch my-auto text-gray-600">
                    Удалить
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAnnouncementMain;


