import { Input } from "./ui/input";
import { Button } from "./ui/button";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}: SearchInputProps) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="relative flex-1 ">
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.currentTarget.value);
          }}
          className="pr-16 rounded-xl"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2 text-gray-500 hover:text-gray-700">
            Clear
          </Button>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        className="whitespace-nowrap rounded-xl border border-Primary-100 text-Primary-500">
        Search by ID
      </Button>
    </div>
  );
};

export default SearchInput;
