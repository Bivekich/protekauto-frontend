import React, { useState } from "react";
import Link from "next/link";

const tabData = [
  {
    label: "Оригинальные каталоги",
    heading: "Оригинальные каталоги",
    links: [
      "Моторные масла",
      "Трансмиссионные масла",
      "Тормозные жидкости",
      "Смазки",
      "Дистиллированная вода",
      "Жидкости для стеклоомывателей",
      "Индустриальные жидкости",
      "Антифриз и охлаждающие жидкости",
      "Промывочные жидкости",
    ],
  },
  {
    label: "Масла и технические жидкости",
    heading: "Масла и технические жидкости",
    links: [
      "Моторные масла",
      "Трансмиссионные масла",
      "Тормозные жидкости",
      "Смазки",
      "Дистиллированная вода",
      "Жидкости для стеклоомывателей",
      "Индустриальные жидкости",
      "Антифриз и охлаждающие жидкости",
      "Промывочные жидкости",
    ],
  },
  {
    label: "Оборудование",
    heading: "Оборудование",
    links: [
      "Моторные масла",
      "Трансмиссионные масла",
      "Тормозные жидкости",
      "Смазки",
      "Дистиллированная вода",
      "Жидкости для стеклоомывателей",
      "Индустриальные жидкости",
      "Антифриз и охлаждающие жидкости",
      "Промывочные жидкости",
    ],
  },
];

const BottomHead = ({ menuOpen, onClose }: { menuOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <nav
      role="navigation"
      className="nav-menu-3 w-nav-menu"
      style={{ display: menuOpen ? "block" : "none" }}
    >
      <div className="div-block-28">
        <div className="w-layout-hflex flex-block-90">
          <div className="w-layout-vflex flex-block-88">
            {/* Меню с иконками */}
            {[
              "Оригинальные каталоги",
              "Масла и технические жидкости",
              "Оборудование",
              "Аккумуляторы и зарядные устройства",
              "Автопринадлежности",
              "Шины и диски",
              "Автохимия и косметика",
              "Товары для дома",
              "Расходные материалы",
              "Зимние аксессуары",
              "Хиты продаж",
              "Распродажа",
            ].map((text, idx) => (
              <a
                href="#"
                className={`link-block-7 w-inline-block${text === "Распродажа" ? " special" : ""}`}
                key={text}
                onClick={onClose}
              >
                <div className={`div-block-29${text === "Распродажа" ? " special" : ""}`}>
                  <div className="code-embed-12 w-embed">
                    {/* SVG-звезда (можно вынести в отдельный компонент) */}
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.3158 0.643914C10.4674 0.365938 10.8666 0.365938 11.0182 0.643914L14.0029 6.11673C14.0604 6.22222 14.1623 6.29626 14.2804 6.31838L20.4077 7.46581C20.7189 7.52409 20.8423 7.9037 20.6247 8.13378L16.3421 12.6636C16.2595 12.7509 16.2206 12.8707 16.2361 12.9899L17.0382 19.1718C17.079 19.4858 16.7561 19.7204 16.47 19.5847L10.8385 16.9114C10.73 16.8599 10.604 16.8599 10.4955 16.9114L4.86394 19.5847C4.5779 19.7204 4.25499 19.4858 4.29573 19.1718L5.0979 12.9899C5.11336 12.8707 5.07444 12.7509 4.99189 12.6636L0.709252 8.13378C0.491728 7.9037 0.615069 7.52409 0.926288 7.46581L7.05357 6.31838C7.17168 6.29626 7.27358 6.22222 7.33112 6.11673L10.3158 0.643914Z" fill="CurrentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="text-block-47">{text}</div>
              </a>
            ))}
          </div>
          {/* Правая часть меню с подкатегориями и картинками */}
          <div className="w-layout-vflex flex-block-89">
            <h3 className="heading-16">{tabData[activeTab].heading}</h3>
            <div className="w-layout-hflex flex-block-92">
              <div className="w-layout-vflex flex-block-91">
                {tabData[activeTab].links.map((link) => (
                  <Link href="/catalog" className="link-2" key={link} onClick={onClose}>{link}</Link>
                ))}
              </div>
              <div className="w-layout-vflex flex-block-91-copy">
                <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-17" />
                <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-17" />
              </div>
            </div>
          </div>
        </div>
        {/* Табы */}
        <div data-current="Tab 1" data-easing="ease" data-duration-in="300" data-duration-out="100" className="tabs w-tabs">
          <div className="tabs-menu w-tab-menu">
            {tabData.map((tab, idx) => (
              <a
                key={tab.label}
                data-w-tab={`Tab ${idx + 1}`}
                className={`tab-link w-inline-block w-tab-link${activeTab === idx ? " w--current" : ""}`}
                onClick={() => {
                  if (activeTab !== idx) {
                    setActiveTab(idx);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="div-block-29">
                  <div className="code-embed-12 w-embed">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.3158 0.643914C10.4674 0.365938 10.8666 0.365938 11.0182 0.643914L14.0029 6.11673C14.0604 6.22222 14.1623 6.29626 14.2804 6.31838L20.4077 7.46581C20.7189 7.52409 20.8423 7.9037 20.6247 8.13378L16.3421 12.6636C16.2595 12.7509 16.2206 12.8707 16.2361 12.9899L17.0382 19.1718C17.079 19.4858 16.7561 19.7204 16.47 19.5847L10.8385 16.9114C10.73 16.8599 10.604 16.8599 10.4955 16.9114L4.86394 19.5847C4.5779 19.7204 4.25499 19.4858 4.29573 19.1718L5.0979 12.9899C5.11336 12.8707 5.07444 12.7509 4.99189 12.6636L0.709252 8.13378C0.491728 7.9037 0.615069 7.52409 0.926288 7.46581L7.05357 6.31838C7.17168 6.29626 7.27358 6.22222 7.33112 6.11673L10.3158 0.643914Z" fill="CurrentColor"></path>
                    </svg>
                  </div>
                </div>
                <div className="text-block-49">{tab.label}</div>
              </a>
            ))}
          </div>
          <div className="tabs-content w-tab-content">
            {tabData.map((tab, idx) => (
              <div
                key={tab.label}
                data-w-tab={`Tab ${idx + 1}`}
                className={`w-tab-pane${activeTab === idx ? " w--tab-active" : ""}`}
                style={{ display: activeTab === idx ? "block" : "none" }}
              >
                <div className="w-layout-vflex flex-block-89">
                  <h3 className="heading-16">{tab.heading}</h3>
                  <div className="w-layout-hflex flex-block-92">
                    <div className="w-layout-vflex flex-block-91">
                      {tab.links.map((link) => (
                        <Link href="/catalog" className="link-2" key={link} onClick={onClose}>{link}</Link>
                      ))}
                    </div>
                    <div className="w-layout-vflex flex-block-91-copy">
                      <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-17" />
                      <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="image-17" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomHead; 