import { Search, X } from "lucide-react";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search notes…",
  className = "",
}) => (
  <div
    className={`flex items-center gap-2 rounded-xl border border-line bg-paper px-3.5 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] transition focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-500/10 ${className}`}
  >
    <Search className="size-4 shrink-0 text-muted" />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="w-full bg-transparent text-sm text-body outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
    />
    {value ? (
      <button
        type="button"
        aria-label="Clear search"
        onClick={() => onChange?.("")}
        className="rounded-md p-0.5 text-muted transition hover:bg-brand-50 hover:text-brand-800"
      >
        <X className="size-4" />
      </button>
    ) : null}
  </div>
);

export default SearchBar;
