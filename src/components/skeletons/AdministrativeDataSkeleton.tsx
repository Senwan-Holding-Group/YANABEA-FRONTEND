const AdministrativeDataSkeleton = () => {
  return (
    <div className="space-y-4 w-80">
      <div className="h-6 w-40 bg-Primary-25 rounded animate-pulse" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center h-10">
            <div className="w-24 h-6 bg-Primary-25 rounded animate-pulse" />
            <div className="ml-2 w-32 h-6 bg-Primary-25 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdministrativeDataSkeleton;