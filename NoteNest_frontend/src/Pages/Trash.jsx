import { useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  NotebookText,
  RotateCcw,
  SearchX,
  Trash2,
} from "lucide-react";
import PageHeader from "../Components/PageHeader";
import SearchBar from "../Components/SearchBar";
import EmptyState from "../Components/EmptyState";
import ConfirmDialog from "../Components/ConfirmDialog";
import { API_URL } from "../Features/API";
import { fetchUserNotes } from "../Features/UserNotes";
import { getPlainText } from "../utils/noteText";
import { toast } from "../utils/toast";
import getTimeAgo from "../utils/GetTime";

const Trash = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.userNotes.userdata);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const trashedNotes = useMemo(
    () => (notes || []).filter((note) => note.Trash),
    [notes],
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return trashedNotes;

    return trashedNotes.filter((note) =>
      [note.title, note.label, getPlainText(note.note)]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [trashedNotes, query]);

  const handleRestore = async (id) => {
    setBusyId(id);
    try {
      const response = await axios.patch(
        `${API_URL}/api/note/restore`,
        { id },
        { withCredentials: true },
      );

      if (response.data.status) {
        await dispatch(fetchUserNotes());
        toast.success("Note restored to your library");
      } else {
        toast.error(response.data.message || "Could not restore this note");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not restore this note",
      );
    } finally {
      setBusyId("");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const response = await axios.delete(`${API_URL}/api/note/deleteNote`, {
        data: { id: deleteTarget._id },
        withCredentials: true,
      });

      if (response.data.status) {
        await dispatch(fetchUserNotes());
        toast.success("Note deleted permanently");
        setDeleteTarget(null);
      } else {
        toast.error(response.data.message || "Could not delete this note");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not delete this note",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="A second chance"
        title="Trash"
        description="Notes stay here until you restore them or delete them for good. No pressure."
        actions={
          <span className="badge-neutral">
            <Trash2 className="size-3.5" />
            {trashedNotes.length} in trash
          </span>
        }
      />

      <section className="card p-4 sm:p-5">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search trashed notes…"
        />
        <p className="mt-3 text-xs leading-5 text-muted">
          Restoring a note puts it back in All notes. Deleting is permanent and
          cannot be undone.
        </p>
      </section>

      {filtered.length ? (
        <section className="card overflow-hidden">
          <div className="hidden grid-cols-[minmax(0,1fr)_140px_120px_190px] gap-4 border-b border-line bg-[#faf7f0] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-muted md:grid">
            <span>Note</span>
            <span>Label</span>
            <span>Moved to trash</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-line/60">
            {filtered.map((note) => (
              <div
                key={note._id}
                className="grid gap-3 px-4 py-4 transition hover:bg-brand-50/40 sm:px-5 md:grid-cols-[minmax(0,1fr)_140px_120px_190px] md:items-center md:gap-4"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                    <NotebookText className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-body">
                      {note.title || "Untitled note"}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                      {getPlainText(note.note).slice(0, 90) || "No content"}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-[#f1ede4] px-2.5 py-1 text-[10px] font-semibold capitalize text-muted">
                  {note.label || "Unlabeled"}
                </span>

                <span className="text-xs text-muted">
                  {note.updatedAt ? getTimeAgo(note.updatedAt) : "Recently"}
                </span>

                <div className="flex items-center gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => handleRestore(note._id)}
                    disabled={busyId === note._id}
                    className="btn-secondary px-3 py-1.5 text-xs"
                  >
                    <RotateCcw className="size-3.5" />
                    {busyId === note._id ? "Restoring…" : "Restore"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(note)}
                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 active:scale-95"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : trashedNotes.length ? (
        <EmptyState
          icon={SearchX}
          title="No trashed notes match that search"
          description="Try another word, or clear the search to see everything in trash."
          action={
            <button type="button" onClick={() => setQuery("")} className="btn-secondary">
              Clear search
            </button>
          }
        />
      ) : (
        <EmptyState
          icon={Trash2}
          title="Trash is empty"
          description="Nothing to tidy up here. When you move a note to trash, it will wait here until you decide what to do."
        />
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this note permanently?"
        description={
          deleteTarget
            ? `“${deleteTarget.title || "Untitled note"}” will be gone for good. This cannot be undone.`
            : ""
        }
        confirmLabel="Delete permanently"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Trash;
