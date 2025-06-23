import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_LAXIMO_BRANDS } from "@/lib/graphql";
import { LaximoBrand } from "@/types/laximo";

const tabs = [
  "Техническое обслуживание",
  "Легковые",
  "Грузовые",
  "Коммерческие",
];

const CatalogSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  
  const { data, loading, error } = useQuery<{ laximoBrands: LaximoBrand[] }>(GET_LAXIMO_BRANDS, {
    errorPolicy: 'all'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/catalog");
  };

  // Статические данные автомобильных брендов
  const staticBrands = [
    { name: "Audi" },
    { name: "BMW" },
    { name: "Cadillac" },
    { name: "Chevrolet" },
    { name: "Citroen" },
    { name: "Fiat" },
    { name: "Mazda" }
  ];

  // Определяем какие данные использовать
  let brands = staticBrands;
  
  if (data?.laximoBrands && data.laximoBrands.length > 0) {
    // Если есть данные от Laximo API, используем их
    brands = data.laximoBrands.map(brand => ({
      name: brand.name,
      code: brand.code
    }));
  } else if (error) {
    console.warn('Laximo API недоступен, используются статические данные:', error.message);
  }

  const handleBrandClick = (brand: { name: string; code?: string }) => {
    if (brand.code) {
      router.push(`/brands?selected=${brand.code}`);
    } else {
      console.warn('Brand code not available for', brand.name);
    }
  };

  if (loading) {
    return (
      <section>
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-vflex flex-block-5">
            <h2 className="heading-4">Каталоги автозапчастей</h2>
            <div className="text-center">Загрузка брендов...</div>
          </div>
        </div>
      </section>
    );
  }



  return (
    <section>
      <div className="w-layout-blockcontainer container w-container">
        <div className="w-layout-vflex flex-block-5">
          <h2 className="heading-4">Каталоги автозапчастей</h2>
          <div className="w-layout-hflex flex-block-6-copy">
            <div className="w-layout-hflex flex-block-24">
              <div className="w-layout-hflex flex-block-25">
                {tabs.map((tab, idx) => (
                  <div
                    className={activeTab === idx ? "tab_card-activ" : "tab_card"}
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="w-layout-hflex flex-block-27">
                {[...Array(7)].map((_, colIdx) => (
                  <div className="w-layout-vflex flex-block-26" key={colIdx}>
                    {brands.slice(colIdx * Math.ceil(brands.length / 7), (colIdx + 1) * Math.ceil(brands.length / 7)).map((brand, idx) => (
                      <button 
                        onClick={() => handleBrandClick(brand)}
                        className="link-block-6 w-inline-block text-left" 
                        key={idx}
                        style={{ background: 'none', border: 'none', padding: 0 }}
                      >
                        <div>{brand.name}</div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => router.push('/brands')}
                className="w-layout-hflex flex-block-29 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ background: 'none', border: 'none', padding: 0 }}
              >
                <div className="text-block-18">Все марки</div>
                <img src="/images/Arrow_right.svg" loading="lazy" alt="" />
              </button>
            </div>
            <div className="w-layout-vflex flex-block-28">
              <h3 className="heading-5">Подбор по автомобилю</h3>
              <div className="form-block-4 w-form">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" data-wf-page-id="6800f7e35fcfd4ca3b3232bc" data-wf-element-id="035eb944-3f18-512d-416f-afd9dcaf7b45" onSubmit={handleSubmit}>
                  {[7, 5, 4, 3].map((field) => (
                    <select id={`field-${field}`} name={`field-${field}`} data-name={`Field ${field}`} className="select w-select" key={field}>
                      <option value="">Год выпуска</option>
                      <option value="First">First choice</option>
                      <option value="Second">Second choice</option>
                      <option value="Third">Third choice</option>
                    </select>
                  ))}
                  <div className="div-block-10">
                    <input type="submit" data-wait="Please wait..." className="submit-button w-button" value="Подобрать автозапчасть" />
                  </div>
                </form>
                <div className="w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="w-form-fail">
                  <div>Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection; 