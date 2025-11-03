import type { FilterTab } from "./layouts/ListsLayout";
import { Button } from "./ui/button";
type FilterTabProps = {
  filterTabs: FilterTab[];
  onFilterTabChange: ((tabKey: string) => void) | undefined;
};
const CFilterTab = ({ filterTabs, onFilterTabChange }: FilterTabProps) => {
  return (
    <div className="flex gap-2 overflow-x-scroll ">
      {filterTabs.map((tab) => (
        <Button
          key={tab.key}
          size="sm"
          onClick={() => onFilterTabChange?.(tab.key)}
          className={`rounded-full px-4 py-2 hover:bg-Secondary-50/75 cursor-pointer bg-Secondary-50 shadow-CS text-base${
            tab.isActive
              ? " text-Primary-500 border border-Primary-500"
              : " text-Primary-400  "
          }`}>
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default CFilterTab;
