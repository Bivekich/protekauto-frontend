import React from "react";
import Link from "next/link";

const AvailableParts = () => (
  <section>
    <div className="w-layout-blockcontainer container2 w-container">
      <div className="w-layout-vflex flex-block-5">
        <div className="w-layout-hflex flex-block-31">
          <h2 className="heading-4">Автозапчасти в наличии</h2>
          <div className="w-layout-hflex flex-block-29">
            <Link href="/catalog" legacyBehavior>
              <a className="text-block-18">Ко всем автозапчастям</a>
            </Link>
            <img src="/images/Arrow_right.svg" loading="lazy" alt="" />
          </div>
        </div>
        <div className="w-layout-hflex flex-block-6">
          <Link href="/catalog" legacyBehavior>
            <a className="div-block-12" id="w-node-bc394713-4b8e-44e3-8ddf-3edc1c31a743-3b3232bc">
              <h1 className="heading-7">Аксессуары</h1>
              <img src="/images/IMG_1.png" loading="lazy" alt="" className="image-22" />
            </a>
          </Link>
          <Link href="/catalog" legacyBehavior>
            <a className="div-block-12-copy">
              <h1 className="heading-7">Воздушные фильтры</h1>
              <img src="/images/IMG_2.png" loading="lazy" alt="" className="image-22" />
            </a>
          </Link>
          <Link href="/catalog" legacyBehavior>
            <a className="div-block-12">
              <h1 className="heading-7">Шины</h1>
              <img src="/images/IMG_3.png" loading="lazy" alt="" className="image-22" />
            </a>
          </Link>
          <Link href="/catalog" legacyBehavior>
            <a className="div-block-123">
              <h1 className="heading-7-white">Аккумуляторы</h1>
              <img src="/images/IMG_4.png" loading="lazy" alt="" className="image-22" />
            </a>
          </Link>
          <div className="w-layout-hflex flex-block-35" id="w-node-_8908a890-8c8f-e12c-999f-08d5da3bcc01-3b3232bc">
            <Link href="/catalog" legacyBehavior>
              <a className="div-block-12 small">
                <h1 className="heading-7">Диски</h1>
                <img src="/images/IMG_5.png" loading="lazy" alt="" className="image-22" />
              </a>
            </Link>
            <Link href="/catalog" legacyBehavior>
              <a className="div-block-12 small">
                <h1 className="heading-7">Свечи</h1>
                <img src="/images/IMG_6.png" loading="lazy" alt="" className="image-22" />
              </a>
            </Link>
            <Link href="/catalog" legacyBehavior>
              <a className="div-block-red small">
                <h1 className="heading-7-white">Масла</h1>
                <img src="/images/IMG_7.png" loading="lazy" alt="" className="image-22" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AvailableParts;