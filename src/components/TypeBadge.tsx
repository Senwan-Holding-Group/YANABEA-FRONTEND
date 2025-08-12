import React from 'react';

type TypeBadgeProps = {
  type: 'Out stock' | 'Withdraw' | 'Sales' | 'Return' | 'In stock' | string;
  className?: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, className = "" }) => {
  const getTypeStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case 'out stock':
        return 'bg-Error-50 text-Error-500 ';
      case 'withdraw':
        return 'bg-Primary-50 text-Primary-500 ';
      case 'sales':
        return 'bg-Success-50 text-Success-500 ';
      case 'return':
        return 'bg-Error-50 text-Error-500 ';
      case 'in stock':
        return 'bg-Success-50 text-Success-500 ';
      default:
        return 'bg-Gray-200 text-gray-900 ';
    }
  };

  return (
    <span
      className={`inline-flex items-center h-[1.563rem] px-2.5 py-0.5 rounded-full text-base font-normal border ${getTypeStyles(type)} ${className}`}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
