import { Link } from "react-router-dom";
import BrandMark from "./BrandMark";

const posters = [
  {
    label: "Personal",
    title: "Ideas for a calmer week",
    color: "bg-[#efe3ce] text-[#4d402d]",
    rotate: "-rotate-6",
  },
  {
    label: "Work",
    title: "Launch checklist",
    color: "bg-[#dfe8dd] text-[#2f4534]",
    rotate: "rotate-3",
  },
  {
    label: "Ideas",
    title: "Things worth remembering",
    color: "bg-[#f2d8c9] text-[#5d3528]",
    rotate: "-rotate-2",
  },
];

const AuthShell = ({
  title,
  subtitle,
  children,
  footer,
  panelTitle = "A calmer place for everything you want to remember.",
  panelText = "Capture ideas, summarize them with AI, and share the journey with a community that gets it.",
}) => (
  <div className="grid min-h-screen bg-canvas lg:grid-cols-[1.05fr_0.95fr]">
    <aside className="sidebar-texture relative hidden overflow-hidden p-12 text-white lg:flex lg:flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-10 font-display text-[22rem] font-semibold leading-none text-white/[0.035]"
      >
        N
      </div>

      <Link to="/" className="relative flex items-center gap-3">
        <BrandMark className="size-11 rounded-2xl" />
        <div>
          <p className="font-display text-xl font-semibold leading-none">NoteNest</p>
          <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-200/70">
            Your second brain
          </p>
        </div>
      </Link>

      <div className="relative mt-16 max-w-lg">
        <span className="badge border-white/10 bg-white/10 text-white/80">
          Notes · AI · Community
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.12] tracking-tight xl:text-5xl">
          {panelTitle}
        </h1>
        <p className="mt-5 text-base leading-7 text-white/55">{panelText}</p>

        <ul className="mt-8 space-y-3 text-sm text-white/70">
          {[
            "Beautiful notes that stay organized",
            "AI summaries in one click",
            "A live community of note-makers",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="flex size-5 items-center justify-center rounded-full bg-accent-400/20 text-accent-200">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-auto flex items-end gap-4 pt-14">
        {posters.map((poster) => (
          <div
            key={poster.title}
            className={`w-44 rounded-2xl p-4 shadow-2xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${poster.color} ${poster.rotate}`}
          >
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">
              {poster.label}
            </p>
            <p className="mt-2 font-display text-sm font-semibold leading-snug">
              {poster.title}
            </p>
            <div className="mt-4 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-black/10" />
              <div className="h-1.5 w-4/5 rounded-full bg-black/10" />
              <div className="h-1.5 w-3/5 rounded-full bg-black/10" />
            </div>
          </div>
        ))}
      </div>
    </aside>

    <main className="flex items-center justify-center px-4 py-10 sm:px-8">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
          <BrandMark className="size-10 rounded-xl" />
          <span className="font-display text-xl font-semibold text-ink">NoteNest</span>
        </Link>

        <div className="animate-fade-up card p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>
          ) : null}
          <div className="mt-7">{children}</div>
          {footer ? (
            <div className="mt-6 border-t border-line pt-5 text-center text-sm text-muted">
              {footer}
            </div>
          ) : null}
        </div>

        <p className="mt-6 text-center text-xs text-muted/80">
          © {new Date().getFullYear()} NoteNest. Made for people who think in notes.
        </p>
      </div>
    </main>
  </div>
);

export default AuthShell;
