import React from "react";
import Link from 'next/link';
const AboutIntro = () => (
  <div className="w-layout-hflex flex-block-69">
    <div className="w-layout-vflex flex-block-68">
      <div className="text-block-36">
        Наши клиенты — как крупные поставщики, так и небольшие магазины, сервисные центры и СТО — получают возможность эффективно находить своих покупателей. Мы обеспечиваем своевременную поставку подходящих запчастей по привлекательным ценам.<br /><br />Мы стремимся сделать процесс покупок и продаж максимально выгодным и надёжным для всех участников. Контроль качества продукции, гарантия оплаты и соблюдение условий возврата в соответствии с законодательством — наши приоритеты.
      </div>
      <Link href="/catalog" legacyBehavior>
        <a  className="submit-button w-button">Перейти в каталог запчастей</a>
      </Link>
    </div>
    <img src="/images/auto_protek.png" loading="lazy" sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 830px" srcSet="/images/auto_protek-p-500.png 500w, /images/auto_protek-p-800.png 800w, /images/auto_protek.png 830w" alt="" className="image-14" />
  </div>
);

export default AboutIntro; 