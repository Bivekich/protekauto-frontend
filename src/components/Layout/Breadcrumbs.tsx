'use client';

type BreadcrumbItem = {
  label: string;
  href?: string;
  current?: boolean;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <div className="flex items-center text-sm">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && <span className="text-[#8E9AAC] mx-[8px]">→</span>}
          <span className={item.current ? 'text-[#8E9AAC]' : 'text-[#000814]'}>
            {item.href ? <a href={item.href}>{item.label}</a> : item.label}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
