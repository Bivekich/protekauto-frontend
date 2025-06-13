import React, { useState } from "react";
import ProfileHistoryItem from "./ProfileHistoryItem";
import SearchInput from "./SearchInput";
import ProfileHistoryTabs from "./ProfileHistoryTabs";

const ProfileHistoryMain = () => {
    const historyData = [
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANZ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANZ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANZ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANZ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANZ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANZ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANZ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANЗ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANЗ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANЗ GIE37312",
      },
      {
        date: "15.04.2025 16:39",
        manufacturer: "VAG",
        article: "6RU807421BGRU",
        name: "Ролик ремня ГРМ VW AD GANЗ GIE37312",
      },
    ];

    const [search, setSearch] = useState("");
    const tabOptions = ["Сегодня", "Вчера", "Ранее", "Архив"];
    const [activeTab, setActiveTab] = useState(tabOptions[0]);
    const [sortField, setSortField] = useState<"date" | "manufacturer" | "name" | null>(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = (field: "date" | "manufacturer" | "name") => {
      if (sortField === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    };

    return (
        <div className="flex flex-col justify-center text-base">
          <div className="flex flex-wrap gap-5 items-center px-8 py-3 w-full leading-snug text-gray-400 whitespace-nowrap bg-white rounded-lg max-md:px-5 max-md:max-w-full">
            <div className="flex-1 shrink self-stretch my-auto text-gray-400 basis-0 text-ellipsis max-md:max-w-full">
              <SearchInput value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/02c9461c587bf477e8ee3187cb5faa1bccaf0900?placeholderIfAbsent=true&apiKey=f5bc5a2dc9b841d0aba1cc6c74a35920"
              className="object-contain shrink-0 self-stretch my-auto w-5 rounded-sm aspect-square"
            />
          </div>
          <div className="flex flex-col mt-5 w-full text-lg font-medium leading-tight whitespace-nowrap text-gray-950 max-md:max-w-full">
            <ProfileHistoryTabs tabs={tabOptions} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="flex flex-col mt-5 w-full text-gray-400 max-md:max-w-full">
            <div className="flex flex-col justify-center p-2 w-full bg-white rounded-xl max-md:max-w-full">
              <div className="flex gap-10 items-center px-5 py-2 w-full text-sm max-md:max-w-full">
                <div className="flex flex-wrap flex-1 shrink gap-5 items-center self-stretch pr-5 my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="flex gap-1.5 items-center self-stretch my-auto w-40">
                    <div className="self-stretch my-auto cursor-pointer select-none" onClick={() => handleSort("date")}>Дата и время</div>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 20 20"
                      style={{ transition: 'transform 0.2s', transform: sortField === "date" && sortOrder === "asc" ? "rotate(180deg)" : "none" }}
                    >
                      <path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex gap-1.5 items-center self-stretch my-auto w-40 whitespace-nowrap">
                    <div className="self-stretch my-auto cursor-pointer select-none" onClick={() => handleSort("manufacturer")}>Производитель</div>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 20 20"
                      style={{ transition: 'transform 0.2s', transform: sortField === "manufacturer" && sortOrder === "asc" ? "rotate(180deg)" : "none" }}
                    >
                      <path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="gap-1.5 self-stretch my-auto whitespace-nowrap w-[180px]">
                    Артикул
                  </div>
                  <div className="flex flex-wrap flex-1 shrink gap-1.5 items-center self-stretch my-auto whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full">
                    <div className="self-stretch my-auto cursor-pointer select-none" onClick={() => handleSort("name")}>Наименование</div>
                    <svg
                      width="14"
                      height="14"
                      fill="none"
                      viewBox="0 0 20 20"
                      style={{ transition: 'transform 0.2s', transform: sortField === "name" && sortOrder === "asc" ? "rotate(180deg)" : "none" }}
                    >
                      <path d="M6 8l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              {historyData.map((item, idx) => (
                <ProfileHistoryItem
                  key={idx}
                  date={item.date}
                  manufacturer={item.manufacturer}
                  article={item.article}
                  name={item.name}
                />
              ))}
            </div>
          </div>
        </div>
      );
};
export default ProfileHistoryMain;


