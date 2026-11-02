import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  ArrowUpRight,
  MessageSquareText,
  NotebookText,
  Plus,
  RefreshCw,
  Sparkles,
  Star,
  Tag,
  Trash2,
  WandSparkles,
} from "lucide-react";
import PageHeader from "../Components/PageHeader";
import NoteCard from "../Components/NoteCard";
import EmptyState from "../Components/EmptyState";
import { fetchUserNotes } from "../Features/UserNotes";
import { tiltHandlers } from "../utils/interactive";

const greetingForHour = (hour) => {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const prompts = [
  "What's one thing you learned this week that future-you will thank you for writing down?",
  "What would make tomorrow feel lighter? Write the first small step.",
  "Describe a moment from today you want to remember in a month.",
  "What idea keeps returning to you? Give it three sentences.",
  "What are you pretending not to know? Write it down kindly.",
];

const labelBarColors = [
  "bg-brand-500",
  "bg-accent-500",
  "bg-amber-500",
  "bg-[#6f8896]",
];

const StatSkeleton = () => (
  <div className="card p-5">
    <div className="skeleton size-11 rounded-2xl" />
    <div className="skeleton mt-4 h-7 w-16" />
    <div className="skeleton mt-2 h-3 w-24" />
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const [promptIndex, setPromptIndex] = useState(0);
  const user = useSelector((state) => state.userDetails.userdata?.message);
  const notes = useSelector((state) => state.userNotes.userdata);
  const status = useSelector((state) => state.userNotes.status);
  const error = useSelector((state) => state.userNotes.error);

  const activeNotes = (notes || []).filter((note) => !note.Trash);
  const favorites = activeNotes.filter((note) => note.favorite);
  const trashed = (notes || []).filter((note) => note.Trash);

  const labelCounts = Object.entries(
    activeNotes.reduce((counts, note) => {
      const key = note.label?.trim() || "Unlabeled";
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {}),
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const maxLabelCount = Math.max(1, ...labelCounts.map(([, count]) => count));

  const recentNotes = [...activeNotes]
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt),
    )
    .slice(0, 4);

  const loading = status === "loading" && !notes;

  const stats = [
    {
      label: "Total notes",
      value: activeNotes.length,
      hint: "Ideas safely nested",
      icon: NotebookText,
      color: "bg-brand-50 text-brand-700",
    },
    {
      label: "Favorites",
      value: favorites.length,
      hint: "Your most-loved thoughts",
      icon: Star,
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Labels",
      value: new Set(activeNotes.map((note) => note.label || "Unlabeled")).size,
      hint: "Ways you organize ideas",
      icon: Tag,
      color: "bg-accent-50 text-accent-700",
    },
    {
      label: "In trash",
      value: trashed.length,
      hint: "Recoverable for now",
      icon: Trash2,
      color: "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${greetingForHour(new Date().getHours())}, ${user?.name?.split(" ")[0] || "friend"}`}
        title="Your nest at a glance"
        description="A calm overview of what you've been writing, saving and planning."
        actions={
          <>
            <Link to="/layout/community" className="btn-secondary">
              <MessageSquareText className="size-4" />
              Community
            </Link>
            <Link to="/layout/newNote" className="btn-primary">
              <Plus className="size-4" />
              New note
            </Link>
          </>
        }
      />

      {error ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 sm:flex-row sm:items-center">
          <span className="flex-1">{error}</span>
          <button
            type="button"
            onClick={() => dispatch(fetchUserNotes())}
            className="btn-secondary border-rose-200 bg-white px-3 py-1.5 text-xs text-rose-800"
          >
            Try again
          </button>
        </div>
      ) : null}

      <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {loading
          ? [1, 2, 3, 4].map((item) => <StatSkeleton key={item} />)
          : stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <article
                  key={stat.label}
                  onPointerMove={tiltHandlers.onPointerMove}
                  onPointerLeave={tiltHandlers.onPointerLeave}
                  className="interactive-card card p-4 sm:p-5"
                >
                  <div className={`flex size-10 items-center justify-center rounded-xl sm:size-11 sm:rounded-2xl ${stat.color}`}>
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-3 font-display text-2xl font-semibold text-ink sm:mt-4 sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-body sm:text-sm">
                    {stat.label}
                  </p>
                  <p className="mt-1 hidden text-[11px] text-muted sm:block">
                    {stat.hint}
                  </p>
                </article>
              );
            })}
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Recent notes
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Pick up where your thoughts left off.
                </p>
              </div>
              <Link
                to="/layout/allNotes"
                className="group inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-900"
              >
                View all
                <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {loading ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[1, 2].map((item) => (
                  <div key={item} className="skeleton h-56 rounded-3xl" />
                ))}
              </div>
            ) : recentNotes.length ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {recentNotes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>
            ) : (
              <div className="mt-5">
                <EmptyState
                  icon={NotebookText}
                  title="Your first note is waiting"
                  description="Capture a thought, a list or a tiny win. It all starts with one note."
                  action={
                    <Link to="/layout/newNote" className="btn-primary">
                      <Plus className="size-4" />
                      Write your first note
                    </Link>
                  }
                />
              </div>
            )}
          </section>

          <section className="card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  How you organize
                </h2>
                <p className="mt-1 text-xs text-muted">
                  A quick look at your most-used labels.
                </p>
              </div>
              <Tag className="size-5 text-muted/40" />
            </div>

            {labelCounts.length ? (
              <div className="mt-5 space-y-4">
                {labelCounts.map(([label, count], index) => (
                  <div key={label}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-semibold capitalize text-body">
                        {label}
                      </span>
                      <span className="text-muted">{count} notes</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#eee9de]">
                      <div
                        className={`h-full rounded-full transition-[width] duration-700 ease-out ${labelBarColors[index % labelBarColors.length]}`}
                        style={{ width: `${(count / maxLabelCount) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-xl bg-[#f7f4ec] px-4 py-6 text-center text-sm text-muted">
                Add labels to your notes and your organization style will appear
                here.
              </p>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="sidebar-texture rounded-3xl p-5 text-white shadow-xl shadow-forest/15">
            <div className="flex items-center gap-2 text-accent-200">
              <WandSparkles className="size-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
                AI spotlight
              </p>
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug">
              Long note? Get the short version.
            </h2>
            <p className="mt-2 text-xs leading-5 text-white/50">
              Open any note and tap “Summarize with AI” for a crisp recap in
              seconds.
            </p>
            <Link
              to="/layout/allNotes"
              className="group mt-4 inline-flex items-center gap-1.5 rounded-xl bg-paper px-3.5 py-2 text-xs font-bold text-forest transition hover:bg-brand-50"
            >
              Choose a note
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-base font-semibold text-ink">Quick actions</h2>
            <div className="mt-3 space-y-1.5">
              {[
                { to: "/layout/newNote", label: "Write a new note", icon: Plus },
                { to: "/layout/favorites", label: "Open favorites", icon: Star },
                { to: "/layout/community", label: "Say hi in community", icon: MessageSquareText },
                { to: "/layout/trash", label: "Review trash", icon: Trash2 },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-body transition hover:bg-brand-50 hover:text-brand-800"
                  >
                    <Icon className="size-4 text-muted transition-transform duration-200 group-hover:-rotate-6 group-hover:text-brand-700" />
                    <span className="flex-1">{action.label}</span>
                    <ArrowUpRight className="size-3.5 text-muted/50 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="card relative overflow-hidden p-5">
            <div className="relative flex items-center gap-2 text-emerald-700">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Community live
              </p>
            </div>
            <h2 className="relative mt-3 font-display text-lg font-semibold text-ink">
              There's a conversation happening.
            </h2>
            <p className="relative mt-2 text-xs leading-5 text-muted">
              Share a note, ask for feedback, or just listen in for a while.
            </p>
            <Link
              to="/layout/community"
              className="group relative mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900"
            >
              Join #general
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </section>

          <section className="card p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-accent-700">
                <Sparkles className="size-4" />
                <h2 className="font-display text-base font-semibold text-ink">
                  Tiny writing prompt
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPromptIndex((index) => (index + 1) % prompts.length)}
                aria-label="Show another writing prompt"
                title="Another prompt"
                className="rounded-lg p-1.5 text-muted transition hover:bg-brand-50 hover:text-brand-800 active:rotate-180"
              >
                <RefreshCw className="size-4" />
              </button>
            </div>
            <p key={promptIndex} className="animate-fade-up mt-3 text-sm leading-6 text-muted">
              “{prompts[promptIndex]}”
            </p>
            <Link
              to="/layout/newNote"
              className="mt-3 inline-flex text-xs font-bold text-brand-700 hover:text-brand-900"
            >
              Answer in a note →
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
