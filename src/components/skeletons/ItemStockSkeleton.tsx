const ItemStockSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 animate-pulse">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-white space-y-2 rounded-xl pt-2 pr-6 pb-4 pl-4 border border-Primary-25 shadow-CS">
          <div className="flex items-center gap-x-2">
            <div className="h-[1.188rem] w-12 bg-Primary-50 rounded"></div>
            <div className="h-[1.313rem] w-20 bg-Primary-50 rounded"></div>
          </div>
          <div className="h-4 w-24 bg-Primary-50 rounded"></div>
          <div className="flex justify-between h-[1.563rem]">
            <div className="flex items-center gap-x-2">
              <div className="h-5 w-8 bg-Primary-50 rounded"></div>
              <div className="h-[1.563rem] w-8 bg-Primary-50 rounded-[14px]"></div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="h-5 w-8 bg-Primary-50 rounded"></div>
              <div className="h-[1.563rem] w-10 bg-Primary-50 rounded-[14px]"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemStockSkeleton;