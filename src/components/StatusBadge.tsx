import React from 'react';

type StatusBadgeProps = {
  status: boolean;
  className?: string;
}

 const getStatus = (status: boolean) => {
  return status ? 'active' : 'inactive';
};
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const getStatusStyles = (status: boolean) => {
    switch (getStatus(status)) {
      case 'active':
        return 'bg-Success-50 text-Success-500 ';
      case 'inactive':
        return 'bg-Gray-100 text-Gray-900 ';
      default:
        return 'bg-Gray-100 text-Gray-900 ';
    }
  };

  return (
    <span
      className={`inline-flex items-center h-[1.563rem] px-2.5 py-0.5 rounded-full text-base font-normal border ${getStatusStyles(status)} ${className}`}
    >
      {getStatus(status)}
    </span>
  );
};

export default StatusBadge;
