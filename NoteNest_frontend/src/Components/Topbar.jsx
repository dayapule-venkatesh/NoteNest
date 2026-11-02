import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, MessagesSquare, Plus, Search } from "lucide-react";

const Topbar = ({ onMenu }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const user = useSelector((state) => state.userDetails.userdata?.message);

  const initials = (user?.name || "N")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleShortcut = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/layout/allNotes?q=${encodeURIComponent(term)}` : "/layout/allNotes");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-canvas/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Open menu"
          className="icon-btn lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <form onSubmit={handleSearch} className="relative hidden max-w-md flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your notes…"
            aria-label="Search your notes"
            aria-keyshortcuts="/"
            className="w-full rounded-xl border border-line bg-paper py-2.5 pl-10 pr-12 text-sm text-body shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] outline-none transition placeholder:text-muted focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-line bg-[#f7f4ec] px-1.5 py-0.5 text-[10px] font-bold text-muted lg:inline-block">
            /
          </kbd>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/layout/community"
            className="icon-btn relative"
            aria-label="Open community chat"
            title="Community chat"
          >
            <MessagesSquare className="size-[18px]" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-emerald-500 ring-2 ring-paper" />
          </Link>

          <Link to="/layout/newNote" className="btn-primary hidden sm:inline-flex">
            <Plus className="size-4" />
            New note
          </Link>

          <Link
            to="/layout/profile"
            className="ml-1 flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-paper bg-brand-100 text-xs font-bold text-brand-800 shadow-sm ring-1 ring-line transition hover:ring-brand-300"
            aria-label="Open profile"
          >
            {user?.profile ? (
              <img src={user.profile} alt="" className="size-full object-cover" />
            ) : (
              initials
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
