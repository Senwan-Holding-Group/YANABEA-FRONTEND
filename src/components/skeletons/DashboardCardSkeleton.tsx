const DashboardCardSkeleton = () => {
  return (
    <div className="h-8 flex w-full justify-between animate-pulse">
      <div className="flex items-center gap-x-2">
        <div className="h-[1.188rem] w-12 bg-Primary-50 rounded"></div>
        <div className="h-[1.313rem] w-24 bg-Primary-50 rounded"></div>
      </div>
      <div className="flex items-center gap-x-2">
        <div className="h-6 w-16 bg-Primary-50 rounded"></div>
        <div className="h-[1.563rem] w-20 bg-Primary-50 rounded-[0.875rem]"></div>
      </div>
    </div>
  );
};

export default DashboardCardSkeleton;