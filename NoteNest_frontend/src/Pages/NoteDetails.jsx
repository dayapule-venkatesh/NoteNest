import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  NotebookText,
  Pencil,
  Tag,
  Trash2,
} from "lucide-react";
import CustomStar from "../assets/photos/CustomStar.jsx";
import AISummary from "../Components/AISummary";
import EmptyState from "../Components/EmptyState";
import { API_URL } from "../Features/API";
import { fetchUserNotes } from "../Features/UserNotes";
import { getReadingTime, getLabelStyle } from "../utils/noteText";
import { toast } from "../utils/toast";
import getTimeAgo from "../utils/GetTime.jsx";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const NoteDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.userNotes.userdata);
  const status = useSelector((state) => state.userNotes.status);

  const note =
    (id ? notes?.find((item) => item._id === id) : null) ||
    location.state?.ele;

  const loading = status === "loading" && !note;

  const handleTrash = async () => {
    if (!note?._id) return;

    try {
      const response = await axios.patch(
        `${API_URL}/api/note/Trash`,
        { id: note._id },
        { withCredentials: true },
      );

      if (response.data.status) {
        await dispatch(fetchUserNotes());
        toast.success("Note moved to trash");
        navigate("/layout/allNotes");
      } else {
        toast.error(response.data.message || "Could not move note to trash");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not move note to trash",
      );
    }
  };

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="skeleton h-10 w-40" />
        <div className="skeleton h-12 w-3/4" />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="skeleton h-[520px] rounded-3xl" />
          <div className="skeleton h-72 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <EmptyState
        icon={NotebookText}
        title="This note could not be found"
        description="It may have been deleted, or the link may be out of date."
        action={
          <Link to="/layout/allNotes" className="btn-primary">
            Back to all notes
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/layout/allNotes"
          className="inline-flex w-fit items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-muted transition hover:bg-paper hover:text-brand-800"
        >
          <ArrowLeft className="size-4" />
          Back to all notes
        </Link>

        <div className="flex items-center gap-2">
          <CustomStar data={note} className="border border-line bg-white shadow-sm" />
          <Link
            to={`/layout/newNote/${note._id}`}
            className="btn-secondary px-4 py-2 text-xs"
          >
            <Pencil className="size-3.5" />
            Edit
          </Link>
          <button
            type="button"
            onClick={handleTrash}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            <Trash2 className="size-3.5" />
            Trash
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <article className="card overflow-hidden">
          <div className="border-b border-line bg-[#fbf8f1] bg-[radial-gradient(rgba(28,37,30,0.06)_0.7px,transparent_0.7px)] [background-size:18px_18px] px-5 pb-7 pt-6 sm:px-8 sm:pt-8">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getLabelStyle(note.label)}`}
              >
                <Tag className="size-3" />
                {note.label || "Unlabeled"}
              </span>
              <span className="badge-neutral">
                <Clock3 className="size-3" />
                {getReadingTime(note.note)} min read
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {note.title || "Untitled note"}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                Created {formatDate(note.createdAt)}
              </span>
              <span>Updated {note.updatedAt ? getTimeAgo(note.updatedAt) : "just now"}</span>
            </div>
          </div>

          <div
            className="rich-text px-5 py-7 sm:px-8 sm:py-9"
            dangerouslySetInnerHTML={{
              __html:
                note.note ||
                "<p class='text-muted'>This note is waiting for its first words.</p>",
            }}
          />
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <AISummary noteId={note._id} noteTitle={note.title} />

          <section className="card p-5">
            <h2 className="font-display text-sm font-bold text-ink">Note details</h2>
            <dl className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Label</dt>
                <dd className="font-semibold capitalize text-body">
                  {note.label || "Unlabeled"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Created</dt>
                <dd className="font-semibold text-body">
                  {formatDate(note.createdAt)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Last updated</dt>
                <dd className="font-semibold text-body">
                  {note.updatedAt ? getTimeAgo(note.updatedAt) : "Just now"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Reading time</dt>
                <dd className="font-semibold text-body">
                  {getReadingTime(note.note)} min
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-3xl border border-accent-200 bg-accent-50/70 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-700">
              A small nudge
            </p>
            <p className="mt-2 text-sm leading-6 text-accent-900/75">
              Add one concrete next step to this note. Future-you will know
              exactly where to begin.
            </p>
            <Link
              to={`/layout/newNote/${note._id}`}
              className="mt-3 inline-flex text-xs font-bold text-accent-700 hover:text-accent-900"
            >
              Edit this note →
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default NoteDetails;
