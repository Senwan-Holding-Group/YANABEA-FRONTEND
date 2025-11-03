import { useLocation } from "react-router";
import { navItems } from "@/lib/constants";

export const useCurrentNavItem = () => {
  const location = useLocation();
  
  const currentItem = navItems[0].items.find(
    (item) => location.pathname.includes(item.path)
  );
  
  return currentItem!;
};