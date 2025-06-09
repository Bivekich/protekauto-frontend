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
            {showCount && typeof count === 'number' && (
              <div className="text-block-4">Найдено {count} товаров</div>
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

);

export default CatalogInfoHeader; 