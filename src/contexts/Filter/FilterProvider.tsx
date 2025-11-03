import { useState } from "react";
import { FilterContext } from "./filterContext";

type FilterProviderProps = {
  children: React.ReactNode;
};

const FilterProvider = ({ children }: FilterProviderProps) => {
  const [activeTab, setActiveTab] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
        activeTab,
        setActiveTab,
  
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
