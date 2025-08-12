import React from 'react';

type ApprovalStatusBadgeProps = {
  status: 'New' | 'Approved' | 'Rejected' | string;
  className?: string;
}

const ApprovalStatusBadge: React.FC<ApprovalStatusBadgeProps> = ({ status, className = "" }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-Primary-50 text-Primary-500' ;
      case 'approved':
        return 'bg-Success-50 text-Success-500 ';
      case 'rejected':
        return 'bg-Error-50 text-Error-500 ';
      default:
        return 'bg-Gray-100 text-Gray-900';
    }
  };

  return (
    <span
      className={`inline-flex items-center h-[1.563rem] px-2.5 py-0.5 rounded-full text-base font-normal border ${getStatusStyles(status)} ${className}`}
    >
      {status}
    </span>
  );
};

export default ApprovalStatusBadge;
