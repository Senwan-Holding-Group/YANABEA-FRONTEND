import { useContext } from "react";
import { FilterContext, type FilterContextType } from "./filterContext";

export const useFilterContext = (): FilterContextType => {
  const filterContext = useContext(FilterContext);
  if (!filterContext) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return filterContext;
};