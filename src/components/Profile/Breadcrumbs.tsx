import Link from 'next/link';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="text-gray-400 mx-2">→</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-gray-600">
              {item.title}
            </Link>
          ) : (
            <span className="text-gray-400">{item.title}</span>
          )}
        </div>
      ))}
    </div>
  );
}
