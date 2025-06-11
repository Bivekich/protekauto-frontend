import React, { useState } from "react";
import Link from "next/link";

function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

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
  const isMobile = useIsMobile();
  const [mobileCategory, setMobileCategory] = useState<null | typeof tabData[0]>(null);

  // Только мобильный UX
  if (isMobile && menuOpen) {
    // Экран подкатегорий
    if (mobileCategory) {
      return (
        <div className="mobile-category-overlay">
          <div className="mobile-header">
            <button className="mobile-back-btn" onClick={() => setMobileCategory(null)}>
              ←
            </button>
            <span>{mobileCategory.label}</span>
          </div>
          <div className="mobile-subcategories">
            {mobileCategory.links.map(link => (
              <Link href="/catalog" className="mobile-subcategory" key={link} onClick={onClose}>
                {link}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    // Экран выбора категории
    return (
      <div className="mobile-category-overlay">
        <div className="mobile-header">
          <button className="mobile-back-btn" onClick={onClose} aria-label="Закрыть меню">
            <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z" fill="currentColor"></path>
            </svg>
          </button>
          <span>Категории</span>
        </div>
        <div className="mobile-subcategories">
          {tabData.map(cat => (
            <div
              className="mobile-subcategory"
              key={cat.label}
              onClick={() => setMobileCategory(cat)}
              style={{ cursor: "pointer" }}
            >
              {cat.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Десктоп: оставить всё как есть
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
            <h3 className="heading-16">{tabData[0].heading}</h3>
            <div className="w-layout-hflex flex-block-92">
              <div className="w-layout-vflex flex-block-91">
                {tabData[0].links.map((link) => (
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
                className={`tab-link w-inline-block w-tab-link${0 === idx ? " w--current" : ""}`}
                onClick={() => {
                  if (0 !== idx) {
                    setMobileCategory(tab);
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
                className={`w-tab-pane${0 === idx ? " w--tab-active" : ""}`}
                style={{ display: 0 === idx ? "block" : "none" }}
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