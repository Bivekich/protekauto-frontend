import React from 'react';

type StatusType = 'gray' | 'blue' | 'green' | 'yellow' | 'red';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className = '',
}) => {
  const statusClasses: Record<StatusType, string> = {
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]} ${className}`}
    >
      {label}
    </span>
  );
};
