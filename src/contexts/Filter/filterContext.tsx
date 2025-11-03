import { createContext } from "react";

export type FilterContextType = {
  activeTab: string;
  setActiveTab:React.Dispatch<React.SetStateAction<string>>
};

export const FilterContext = createContext<FilterContextType | undefined>(undefined);