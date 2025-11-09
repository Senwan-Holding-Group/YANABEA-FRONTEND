const CustomerApprovalSkeleton = () => {
  return (
    <div className="h-[calc(100dvh-23.25rem)] overflow-y-scroll w-full bg-white rounded-xl px-4 py-2 space-y-2 shadow-CS">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="h-12 py-2 flex items-center justify-between pr-3 border-b border-e-Primary-25">
          <div className="flex items-center gap-x-2 h-[1.188rem]">
            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-x-4 h-8">
            <div className="flex gap-2">
              <div className="w-16 h-8 bg-gray-200 rounded-xl animate-pulse" />
              <div className="w-16 h-8 bg-gray-200 rounded-xl animate-pulse" />
            </div>
            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerApprovalSkeleton;