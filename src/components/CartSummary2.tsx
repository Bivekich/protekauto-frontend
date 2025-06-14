import React, { useState } from "react";
import InfoOrder1 from "./InfoOrder1";

const subdivisions = [
  'ООО "Рога и копыта"',
  'ООО "Рога и копыта 2"',
  'ООО "Рога и копыта 3"',
];
const tags = [
  'Чт, 17 апреля',
  'Пт, 18 апреля',
  'Сб, 19 апреля',
  'Вс, 20 апреля',
];

const ACTIVE_COLOR = 'var(--_button---primary)';
const INACTIVE_COLOR = '#F6F8FA';
const ACTIVE_TEXT = '#fff';
const INACTIVE_TEXT = '#222';

const CartSummary2: React.FC = () => {
  const [consent, setConsent] = useState(false);
  const [selectedTag, setSelectedTag] = useState<number | null>(null);
  const [selectedSubdivision, setSelectedSubdivision] = useState(subdivisions[0]);
  const [subdivDropdown, setSubdivDropdown] = useState(false);
  const [groupChecked, setGroupChecked] = useState(false);
  const [separateChecked, setSeparateChecked] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);

  // Логика блокировки выбора даты и радиокнопок
  const canSelectTag = !separateChecked;

  return (
    <div className="w-layout-vflex cart-ditail">
      <div className="cart-detail-info">
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Подразделение</div>
          <div className="w-layout-hflex flex-block-62" style={{ position: 'relative', cursor: 'pointer', minWidth: 220 }} onClick={() => setSubdivDropdown(v => !v)}>
            <div className="text-block-31" style={{ width: '100%' }}>{selectedSubdivision}</div>
            <div className="code-embed w-embed" style={{ transform: subdivDropdown ? 'rotate(180deg)' : undefined, transition: '0.2s' }}>
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            {subdivDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                background: '#fff',
                border: '1px solid #eee',
                borderTop: 'none',
                zIndex: 10,
                borderRadius: '0 0 10px 10px',
                boxShadow: '0 4px 16px #0001',
                marginTop: 0,
                overflow: 'hidden',
                minWidth: 220
              }}>
                {subdivisions.map(sub => (
                  <div key={sub} style={{ padding: '10px 16px', cursor: 'pointer', background: sub === selectedSubdivision ? 'var(--_button---primary)' : 'transparent', color: sub === selectedSubdivision ? '#fff' : '#222', transition: 'background 0.2s, color 0.2s' }}
                    onMouseDown={e => { e.preventDefault(); setSelectedSubdivision(sub); setSubdivDropdown(false); }}
                    onMouseOver={e => { e.currentTarget.style.background = sub === selectedSubdivision ? 'var(--_button---primary)' : '#f6f8fa'; e.currentTarget.style.color = sub === selectedSubdivision ? '#fff' : '#222'; }}
                    onMouseOut={e => { e.currentTarget.style.background = sub === selectedSubdivision ? 'var(--_button---primary)' : 'transparent'; e.currentTarget.style.color = sub === selectedSubdivision ? '#fff' : '#222'; }}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-layout-vflex flex-block-66">
          <div className="w-layout-hflex flex-block-64" style={{ cursor: 'pointer' }} onClick={() => setGroupChecked(v => !v)}>
            <div className="div-block-22" style={{ border: `1.5px solid ${ACTIVE_COLOR}`, borderRadius: '50%', width: 18, height: 18, marginRight: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: groupChecked ? ACTIVE_COLOR : '#fff', transition: 'background 0.2s' }}>
              {groupChecked && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />}
            </div>
            <div className="radio-text">Объединить получения</div>
            <div
              className="code-embed-2 w-embed"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              style={{ position: 'relative' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00033 1.16663C3.78033 1.16663 1.16699 3.77996 1.16699 6.99996C1.16699 10.22 3.78033 12.8333 7.00033 12.8333C10.2203 12.8333 12.8337 10.22 12.8337 6.99996C12.8337 3.77996 10.2203 1.16663 7.00033 1.16663ZM7.58366 9.91663H6.41699V8.74996H7.58366V9.91663ZM7.58366 7.58329H6.41699V4.08329H7.58366V7.58329Z" fill="currentColor" />
              </svg>
              {showInfo && (
                <div style={{ position: 'absolute', left: '50%', top: '120%', transform: 'translateX(-50%)', zIndex: 100 }}>
                  <InfoOrder1>
                    Заказанный товар будет <br />доставлен, как только весь<br />товар поступит на склад
                  </InfoOrder1>
                </div>
              )}
            </div>
          </div>
          <div className="w-layout-hflex flex-block-65">
            {tags.map((tag, i) => (
              <div
                className="w-layout-hflex tag-button"
                key={i}
                onClick={() => canSelectTag && setSelectedTag(selectedTag === i ? null : i)}
                style={{
                  background: selectedTag === i ? ACTIVE_COLOR : INACTIVE_COLOR,
                  color: selectedTag === i ? ACTIVE_TEXT : INACTIVE_TEXT,
                  cursor: canSelectTag ? 'pointer' : 'not-allowed',
                  borderRadius: 8,
                  padding: '4px 12px',
                  marginRight: 8,
                  opacity: canSelectTag ? 1 : 0.5,
                  transition: 'background 0.2s, color 0.2s, opacity 0.2s',
                }}
              >
                <div className="tag-text">{tag}</div>
              </div>
            ))}
          </div>
          <div className="w-layout-hflex flex-block-64" style={{ cursor: 'pointer' }} onClick={() => setSeparateChecked(v => !v)}>
            <div className="div-block-22" style={{ border: `1.5px solid ${ACTIVE_COLOR}`, borderRadius: '50%', width: 18, height: 18, marginRight: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: separateChecked ? ACTIVE_COLOR : '#fff', transition: 'background 0.2s' }}>
              {separateChecked && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff' }} />}
            </div>
            <div className="radio-text">Получать по мере поступления</div>
            <div
              className="code-embed-2 w-embed"
              onMouseEnter={() => setShowInfo2(true)}
              onMouseLeave={() => setShowInfo2(false)}
              style={{ position: 'relative' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00033 1.16663C3.78033 1.16663 1.16699 3.77996 1.16699 6.99996C1.16699 10.22 3.78033 12.8333 7.00033 12.8333C10.2203 12.8333 12.8337 10.22 12.8337 6.99996C12.8337 3.77996 10.2203 1.16663 7.00033 1.16663ZM7.58366 9.91663H6.41699V8.74996H7.58366V9.91663ZM7.58366 7.58329H6.41699V4.08329H7.58366V7.58329Z" fill="currentColor" />
              </svg>
              {showInfo2 && (
                <div style={{ position: 'absolute', left: '50%', top: '120%', transform: 'translateX(-50%)', zIndex: 100 }}>
                  <InfoOrder1>
                    Заказанный товар будет <br />доставлен раздельно, по мере поступления на склад
                  </InfoOrder1>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-layout-vflex flex-block-58">
          <div className="text-block-31">Способ получения</div>
          <h4 className="heading-12">Доставка курьером</h4>
          <div className="text-block-32">Калининградская область, Калиниград, улица Понартская, 5, кв./офис 1, Подъезд 1, этаж 1</div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-vflex flex-block-63">
          <h4 className="heading-12">Получатель</h4>
          <div className="w-layout-hflex flex-block-62">
            <input
              className="text-block-31"
              style={{ border: 'none', outline: 'none', borderRadius: 6, padding: '4px 8px', width: '100%', background: '#f6f8fa' }}
              placeholder="Имя и фамилия"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="w-layout-hflex flex-block-62">
            <input
              className="text-block-31"
              style={{ border: 'none', outline: 'none', borderRadius: 6, padding: '4px 8px', width: '100%', background: '#f6f8fa' }}
              placeholder="Номер телефона"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-vflex flex-block-60">
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy">Товары, 3 шт.</div>
            <div className="text-block-33">2 538 ₽</div>
          </div>
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy">Моя скидка</div>
            <div className="text-block-33">-570 ₽</div>
          </div>
          <div className="w-layout-hflex flex-block-59">
            <div className="text-block-21-copy">Доставка</div>
            <div className="text-block-33">39 ₽</div>
          </div>
        </div>
        <div className="px-line"></div>
        <div className="w-layout-hflex flex-block-59">
          <div className="text-block-32">Итого</div>
          <h4 className="heading-9-copy-copy">39 389 ₽</h4>
        </div>
        <a href="/payments-method" className="submit-button fill w-button">Оформить заказ</a>
        <div className="w-layout-hflex privacy-consent" style={{ cursor: 'pointer' }} onClick={() => setConsent((v) => !v)}>
          <div
            className={"div-block-7" + (consent ? " active" : "")}
            style={{ marginRight: 8, cursor: 'pointer' }}
          >
            {consent && (
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M2 5.5L6 9L12 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div className="consent-text">Соглашаюсь с правилами пользования торговой площадкой и возврата</div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary2; 