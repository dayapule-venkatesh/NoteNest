import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NotebookText, Plus, SearchX, SlidersHorizontal } from "lucide-react";
import PageHeader from "../Components/PageHeader";
import SearchBar from "../Components/SearchBar";
import NoteCard from "../Components/NoteCard";
import EmptyState from "../Components/EmptyState";
import { fetchUserNotes } from "../Features/UserNotes";
import { getPlainText } from "../utils/noteText";

const All_Notes = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeLabel, setActiveLabel] = useState("all");
  const [sortBy, setSortBy] = useState("updated");

  const notes = useSelector((state) => state.userNotes.userdata);
  const status = useSelector((state) => state.userNotes.status);
  const error = useSelector((state) => state.userNotes.error);

  const activeNotes = useMemo(
    () => (notes || []).filter((note) => !note.Trash),
    [notes],
  );

  const labels = useMemo(
    () =>
      [
        ...new Set(
          activeNotes.map((note) => note.label?.trim()).filter(Boolean),
        ),
      ].sort(),
    [activeNotes],
  );

  const filteredNotes = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = activeNotes.filter((note) => {
      const matchesLabel =
        activeLabel === "all" || note.label?.toLowerCase() === activeLabel.toLowerCase();
      const matchesQuery =
        !term ||
        [note.title, note.label, getPlainText(note.note)]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term));

      return matchesLabel && matchesQuery;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "title") {
        return String(a.title || "").localeCompare(String(b.title || ""));
      }

      const aDate = new Date(sortBy === "created" ? a.createdAt : a.updatedAt || a.createdAt);
      const bDate = new Date(sortBy === "created" ? b.createdAt : b.updatedAt || b.createdAt);
      return bDate - aDate;
    });
  }, [activeNotes, query, activeLabel, sortBy]);

  const updateQuery = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("q", value);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setActiveLabel("all");
    setSearchParams({}, { replace: true });
  };

  const loading = status === "loading" && !notes;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Your library"
        title="All notes"
        description="Every thought, plan and half-formed idea — searchable and neatly nested."
        actions={
          <Link to="/layout/newNote" className="btn-primary">
            <Plus className="size-4" />
            New note
          </Link>
        }
      />

      {error ? (
        <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => dispatch(fetchUserNotes())}
            className="font-semibold underline"
          >
            Retry
          </button>
        </div>
      ) : null}

      <section className="card space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchBar
            value={query}
            onChange={updateQuery}
            placeholder="Search titles, labels or content…"
            className="flex-1"
          />

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort notes"
                className="w-full appearance-none rounded-xl border border-line bg-paper py-2.5 pl-8 pr-8 text-xs font-semibold text-body shadow-[0_1px_0_rgba(255,255,255,0.8)_inset] outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 sm:w-auto"
              >
                <option value="updated">Recently updated</option>
                <option value="created">Newest first</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>

            <span className="badge-neutral shrink-0">
              {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
            </span>
          </div>
        </div>

        {labels.length ? (
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveLabel("all")}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition active:scale-95 ${
                activeLabel === "all"
                  ? "bg-forest text-paper shadow-sm"
                  : "bg-[#f1ede4] text-muted hover:bg-brand-50 hover:text-brand-800"
              }`}
            >
              All labels
            </button>
            {labels.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveLabel(label)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold capitalize transition active:scale-95 ${
                  activeLabel === label
                    ? "bg-forest text-paper shadow-sm"
                    : "bg-[#f1ede4] text-muted hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
      </section>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="skeleton h-56 rounded-3xl" />
          ))}
        </div>
      ) : filteredNotes.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : activeNotes.length === 0 ? (
        <EmptyState
          icon={NotebookText}
          title="Your library is empty"
          description="Start with a thought, a list or a tiny observation. Your first note doesn't need to be perfect."
          action={
            <Link to="/layout/newNote" className="btn-primary">
              <Plus className="size-4" />
              Write your first note
            </Link>
          }
        />
      ) : (
        <EmptyState
          icon={SearchX}
          title="No notes match those filters"
          description="Try a different search term or clear the label filter to see everything again."
          action={
            <button type="button" onClick={clearFilters} className="btn-secondary">
              Clear filters
            </button>
          }
        />
      )}
    </div>
  );
};

export default All_Notes;
