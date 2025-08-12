import type { ReactNode } from "react";
import SearchInput from "../SearchInput";
import { Button } from "../ui/button";
export type FilterTab = {
  key: string;
  label: string;
  isActive?: boolean;
};

type ListsLayoutProps = {
  children: ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  filterTabs?: FilterTab[];
  onFilterTabChange?: (tabKey: string) => void;
  onCreateNew?: () => void;
  createButtonLabel?: string;
};

const ListsLayout = ({
  children,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search",
  filterTabs = [],
  onFilterTabChange,
  onCreateNew,
  createButtonLabel = "Create new",
}: ListsLayoutProps) => {
  return (
    <div className="bg-white rounded-xl px-6 py-4 h-[calc(100dvh-8.875rem)]">
      {(onSearchChange || onCreateNew) && (
        <div className="pb-2 space-y-4">
          <div className="flex justify-between items-start gap-4 ">
            {onSearchChange && (
              <div className="flex-1 max-w-md">
                <SearchInput
                  value={searchValue}
                  onChange={onSearchChange}
                  placeholder={searchPlaceholder}
                />
              </div>
            )}
            {onCreateNew && (
              <Button
                onClick={onCreateNew}
                className="bg-Primary-500 hover:bg-Primary-400 rounded-xl cursor-pointer text-white px-6">
                {createButtonLabel}
              </Button>
            )}
          </div>
          {filterTabs.length > 0 && (
            <div className="flex gap-2 overflow-x-scroll ">
              {filterTabs.map((tab) => (
                <Button
                  key={tab.key}
                  size="sm"
                  onClick={() => onFilterTabChange?.(tab.key)}
                  className={`rounded-full px-4 py-2 hover:bg-[#F5ECDD]/75 cursor-pointer bg-[#F5ECDD] shadow-CS text-base${
                    tab.isActive
                      ? " text-Primary-500 border border-Primary-500"
                      : " text-Primary-400  "
                  }`}>
                  {tab.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default ListsLayout;
