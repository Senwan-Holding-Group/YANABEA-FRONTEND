const EmployeeListSkeleton = () => {
  return (
    <div className="grid gap-4 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white space-y-2 rounded-xl pt-2 pr-4 pb-2 pl-4 border border-Primary-25 shadow-CS">
          <div className="flex items-center gap-x-2">
            <div className="h-[1.188rem] w-16 bg-Primary-50 rounded"></div>
            <div className="h-[1.188rem] w-24 bg-Primary-50 rounded"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 bg-Primary-50 rounded"></div>
            <div className="h-[30px] w-[30px] bg-Primary-50 rounded-full"></div>
          </div>
          <div className="flex justify-between h-6">
            <div className="flex items-center gap-x-2">
              <div className="h-5 w-8 bg-Primary-50 rounded"></div>
              <div className="h-4 w-8 bg-Primary-50 rounded"></div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="h-5 w-8 bg-Primary-50 rounded"></div>
              <div className="h-4 w-10 bg-Primary-50 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeListSkeleton;