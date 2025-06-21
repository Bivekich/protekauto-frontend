import React from "react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface CatalogInfoHeaderProps {
  title: string;
  count?: number;
  productName?: string;
  breadcrumbs?: Breadcrumb[];
  showCount?: boolean;
  showProductHelp?: boolean;
}

const CatalogInfoHeader: React.FC<CatalogInfoHeaderProps> = ({
  title,
  count,
  productName,
  breadcrumbs,
  showCount = false,
  showProductHelp = false,
}) => (
  <section className="section-info">
  <div className="w-layout-blockcontainer container info w-container">
      <div className="w-layout-vflex flex-block-9">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="w-layout-hflex flex-block-7">
            {breadcrumbs.map((bc, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <div className="text-block-3">→</div>}
                {bc.href ? (
                  <a href={bc.href} className="link-block w-inline-block">
                    <div>{bc.label}</div>
                  </a>
                ) : (
                  <span className="link-block-2 w-inline-block">
                    <div>{bc.label}</div>
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <div className="w-layout-hflex flex-block-8">
          <div className="w-layout-hflex flex-block-10">
            <h1 className="heading">{title}</h1>
            {showCount && (
              <div className="text-block-4">
                {typeof count === 'number' ? (
                  `Найдено ${count} товаров`
                ) : (
                  <span className="flex items-center gap-2">
                    Подсчитываем товары...
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
              </div>
            )}
          </div>
          {showProductHelp && productName && (
            <div className="w-layout-hflex flex-block-11">
              <img src="/images/qwestions.svg" loading="lazy" alt="" className="image-4" />
              <div className="text-block-5">Как правильно выбрать {productName}?</div>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default CatalogInfoHeader; 