import React from "react";
import Link from "next/link";

const AvailableParts = () => (
  <section>
    <div className="w-layout-blockcontainer container2 w-container">
      <div className="w-layout-vflex flex-block-5">
        <div className="w-layout-hflex flex-block-31">
          <h2 className="heading-4">Автозапчасти в наличии</h2>
          <div className="w-layout-hflex flex-block-29">
            <Link href="/catalog" className="text-block-18" style={{display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
              Ко всем автозапчастям
              <img src="/images/Arrow_right.svg" loading="lazy" alt="" style={{marginLeft: 8}} />
            </Link>
          </div>
        </div>
        <div className="w-layout-hflex flex-block-6">
          {[...Array(4)].map((_, i) => (
            <Link href="/catalog">
            <div className="div-block-12" key={i}>
              <h1 className="heading-7">Heading</h1>
            </div>
            </Link>
          ))}
          
          <div className="w-layout-hflex flex-block-35">
            {[...Array(3)].map((_, i) => (
              <Link href="/catalog">
              <div className="div-block-12 small" key={i}>
                <h1 className="heading-7">Heading</h1>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AvailableParts; 