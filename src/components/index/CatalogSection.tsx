import React, { useState } from "react";

const tabs = [
  "Техническое обслуживание",
  "Легковые",
  "Грузовые",
  "Коммерческие",
];

const CatalogSection = () => {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const handleTabClick = (idx: number) => {
    setActiveTab(activeTab === idx ? null : idx);
  };

  return (
    <section>
      <div className="w-layout-blockcontainer container2 w-container">
        <div className="w-layout-vflex flex-block-5">
          <h2 className="heading-4">Каталоги автозапчастей</h2>
          <div className="w-layout-hflex flex-block-6">
            <div className="w-layout-hflex flex-block-24">
              <div className="w-layout-hflex flex-block-25">
                {tabs.map((tab, idx) => (
                  <div
                    key={tab}
                    className={`tab_c${activeTab === idx ? " tab_c-activ" : ""}`}
                    onClick={() => handleTabClick(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <div className="w-layout-hflex flex-block-27">
                {[...Array(7)].map((_, i) => (
                  <div className="w-layout-vflex flex-block-26" key={i}>
                    {["Audi", "BMW", "Cadillac", "Chevrolet", "Citroen", "Fiat", "Mazda"].map((brand) => (
                      <a href="#" className="link-block-6 w-inline-block" key={brand}>
                        <div>{brand}</div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
              <div className="w-layout-hflex flex-block-29">
                <button type="button" className="text-block-18" style={{display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
                  Все марки
                  <img src="/images/Arrow_right.svg" loading="lazy" alt="" style={{marginLeft: 8}} />
                </button>
              </div>
            </div>
            <div className="w-layout-vflex flex-block-28">
              <h3 className="heading-5">Подбор по автомобилю</h3>
              <div className="form-block-4 w-form">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" data-wf-page-id="6800f7e35fcfd4ca3b3232bc" data-wf-element-id="035eb944-3f18-512d-416f-afd9dcaf7b45">
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