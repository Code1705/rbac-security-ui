import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { SearchBarProps } from "../types/index";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  debounceTime = 100,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(localValue);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, onChange, debounceTime]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5 text-gray-500" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="block w-full pl-12 pr-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-full shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-200 transition-colors"
        placeholder={placeholder}
        aria-label="Search"
      />
    </div>
  );
}
