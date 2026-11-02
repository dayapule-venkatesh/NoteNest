import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Plus, SearchX, Star } from "lucide-react";
import PageHeader from "../Components/PageHeader";
import SearchBar from "../Components/SearchBar";
import NoteCard from "../Components/NoteCard";
import EmptyState from "../Components/EmptyState";
import { getPlainText } from "../utils/noteText";

const Favorites = () => {
  const [query, setQuery] = useState("");
  const notes = useSelector((state) => state.userNotes.userdata);
  const status = useSelector((state) => state.userNotes.status);

  const favorites = useMemo(
    () => (notes || []).filter((note) => note.favorite && !note.Trash),
    [notes],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return favorites;

    return favorites.filter((note) =>
      [note.title, note.label, getPlainText(note.note)]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [favorites, query]);

  const loading = status === "loading" && !notes;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Keep close"
        title="Favorites"
        description="The notes you keep coming back to, all in one calm corner."
        actions={
          <Link to="/layout/newNote" className="btn-primary">
            <Plus className="size-4" />
            New note
          </Link>
        }
      />

      <section className="card p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search your favorites…"
            className="flex-1"
          />
          <span className="badge shrink-0">
            <Star className="size-3.5 fill-current" />
            {filtered.length} saved
          </span>
        </div>
      </section>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="skeleton h-56 rounded-3xl" />
          ))}
        </div>
      ) : filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      ) : favorites.length ? (
        <EmptyState
          icon={SearchX}
          title="No favorites match that search"
          description="Try a different word, or clear the search to see every starred note."
          action={
            <button type="button" onClick={() => setQuery("")} className="btn-secondary">
              Clear search
            </button>
          }
        />
      ) : (
        <EmptyState
          icon={Star}
          title="No favorites yet"
          description="Tap the star on any note and it will appear here, ready whenever inspiration strikes."
          action={
            <Link to="/layout/allNotes" className="btn-primary">
              Browse your notes
            </Link>
          }
        />
      )}
    </div>
  );
};

export default Favorites;
