const Footer = () => (
  <footer className="section-2">
    <div className="w-layout-blockcontainer container footer w-container">
      <div className="w-layout-vflex flex-block-20">
        <div className="w-layout-hflex flex-block-18-copy-copy">
          <div className="w-layout-vflex flex-block-19">
            <img src="/images/logo_gor.svg" loading="lazy" width="320" alt="" className="image-15" />
            <div className="text-block-15">Пн-Пт 9:00 – 18:00, <br />Сб 10:00 – 16:00, Вс – выходной</div>
            <a href="#" className="link-block-5 w-inline-block">
              <div className="w-layout-hflex flex-block-3">
                <img src="/images/phone_icon.svg" loading="lazy" alt="" />
                <div className="phone">+7 (495) 260-20-60</div>
              </div>
            </a>
          </div>
          <div className="w-layout-hflex flex-block-22">
            {/* Блоки меню и dropdown повторяются, можно вынести в отдельный компонент позже */}
            <div className="w-layout-vflex flex-block-23">
              <div className="w-layout-hflex flex-block-86">
                <div className="text-block-17">Покупателям</div>
              </div>
              <a href="#" className="link">Оплата</a>
              <a href="#" className="link">Возврат</a>
              <a href="#" className="link">Доставка</a>
              <div data-hover="false" data-delay="0" className="dropdown-3 w-dropdown">
                <div className="dropdown-toggle-2 w-dropdown-toggle">
                  <div className="text-block-17">Покупателям</div>
                  <div className="code-embed-10 w-embed"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 6.74036L3.28446 5.5L9 11.0193L14.7155 5.5L16 6.74036L9 13.5L2 6.74036Z" fill="currentcolor" /></svg></div>
                </div>
                <nav className="dropdown-list-3 w-dropdown-list">
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Оплата</a>
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Возврат</a>
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Доставка</a>
                </nav>
              </div>
            </div>
            <div className="w-layout-vflex flex-block-23">
              <div className="w-layout-hflex flex-block-86">
                <div className="text-block-17">Сотрудничество</div>
              </div>
              <a href="#" className="link">Поставщика</a>
              <a href="#" className="link">Дилерская сеть</a>
              <a href="#" className="link">Оптовым покупателям</a>
              <div data-hover="false" data-delay="0" className="dropdown-3 w-dropdown">
                <div className="dropdown-toggle-2 w-dropdown-toggle">
                  <div className="text-block-17">Сотрудничество</div>
                  <div className="code-embed-10 w-embed"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 6.74036L3.28446 5.5L9 11.0193L14.7155 5.5L16 6.74036L9 13.5L2 6.74036Z" fill="currentcolor" /></svg></div>
                </div>
                <nav className="dropdown-list-3 w-dropdown-list">
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Поставщика</a>
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Дилерская сеть</a>
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Оптовым покупателям</a>
                </nav>
              </div>
            </div>
            <div className="w-layout-vflex flex-block-23">
              <div className="w-layout-hflex flex-block-86">
                <div className="text-block-17">PROTEK</div>
              </div>
              <a href="#" className="link">Вакансии</a>
              <a href="#" className="link">О компании</a>
              <a href="#" className="link">Контакты</a>
              <div data-hover="false" data-delay="0" className="dropdown-3 w-dropdown">
                <div className="dropdown-toggle-2 w-dropdown-toggle">
                  <div className="text-block-17">PROTEK</div>
                  <div className="code-embed-10 w-embed"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 6.74036L3.28446 5.5L9 11.0193L14.7155 5.5L16 6.74036L9 13.5L2 6.74036Z" fill="currentcolor" /></svg></div>
                </div>
                <nav className="dropdown-list-3 w-dropdown-list">
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Вакансии</a>
                  <a href="#" className="dropdown-link-2 w-dropdown-link">О компании</a>
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Контакты</a>
                </nav>
              </div>
            </div>
            <div className="w-layout-vflex flex-block-23">
              <div className="w-layout-hflex flex-block-86">
                <div className="text-block-17">Оферта</div>
              </div>
              <a href="#" className="link">Поставщика</a>
              <a href="#" className="link">Поставщика</a>
              <a href="#" className="link">Поставщика</a>
              <div data-hover="false" data-delay="0" className="dropdown-3 w-dropdown">
                <div className="dropdown-toggle-2 w-dropdown-toggle">
                  <div className="text-block-17">Оферта</div>
                  <div className="code-embed-10 w-embed"><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M2 6.74036L3.28446 5.5L9 11.0193L14.7155 5.5L16 6.74036L9 13.5L2 6.74036Z" fill="currentcolor" /></svg></div>
                </div>
                <nav className="dropdown-list-3 w-dropdown-list">
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Поставщика</a>
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Поставщика</a>
                  <a href="#" className="dropdown-link-2 w-dropdown-link">Поставщика</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="w-layout-hflex flex-block-18-copy">
          <div className="w-layout-hflex flex-block-21"><img src="/images/mastercard.svg" loading="lazy" alt="" /><img src="/images/visa.svg" loading="lazy" alt="" /><img src="/images/mir.svg" loading="lazy" alt="" /></div>
          <div className="text-block-16">© 2025 Protek. Все права защищены.</div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 