import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FolderHeart,
  MessagesSquare,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  WandSparkles,
  Zap,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import BrandMark from "../Components/BrandMark";
import Reveal from "../Components/Reveal";
import { tiltHandlers } from "../utils/interactive";

const features = [
  {
    icon: PenLine,
    title: "A writing space you'll love",
    description:
      "A clean TipTap editor with headings, tables, tasks, images and formatting — without the clutter.",
    color: "bg-brand-50 text-brand-700",
  },
  {
    icon: WandSparkles,
    title: "AI summaries",
    description:
      "Turn long notes into a 30-second recap with Gemini or OpenAI. A local summarizer keeps it working without a key.",
    color: "bg-accent-50 text-accent-700",
  },
  {
    icon: MessagesSquare,
    title: "Live community",
    description:
      "A real-time #general room where note-makers share ideas, ask questions and cheer each other on.",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    icon: Star,
    title: "Favorites that stay close",
    description:
      "Star the notes you return to and find them instantly in a focused favorites view.",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: Trash2,
    title: "Forgiving by design",
    description:
      "Move notes to trash, restore them when you change your mind, or delete them permanently.",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: Search,
    title: "Find anything fast",
    description:
      "Search every note by title, content or label and jump back into the right thought in seconds.",
    color: "bg-[#f1ede4] text-ink",
  },
];

const steps = [
  {
    icon: BookOpen,
    title: "Capture the thought",
    description:
      "Write in a focused, beautiful editor. Add labels, images, tables and checklists as your idea grows.",
  },
  {
    icon: Sparkles,
    title: "Let AI tidy it up",
    description:
      "One click turns a long note into a crisp summary, so you can review it later without re-reading everything.",
  },
  {
    icon: MessagesSquare,
    title: "Share the journey",
    description:
      "Drop into the community, swap ideas and keep momentum with people who also think in notes.",
  },
];

const LandingPage = () => (
  <div className="app-bg min-h-screen overflow-x-hidden">
    <Navbar />

    <main>
      <section className="relative">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28 lg:pt-20">
          <div className="min-w-0 animate-fade-up">
            <span className="badge">
              <span className="size-1.5 animate-pulse rounded-full bg-accent-500" />
              New · AI summaries + community
            </span>

            <h1 className="mt-6 max-w-2xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Your thoughts,
              <br />
              <span className="relative inline-block italic text-accent-600">
                beautifully
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 14"
                  className="absolute -bottom-2 left-0 h-3 w-full text-accent-400"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9c38-6 77-7 113-4 33 3 65 1 101-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              organised.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
              NoteNest is the calm home for everything you want to remember.
              Write beautifully, summarize with AI, and grow alongside a live
              community of note-makers.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup" className="btn-primary group px-6 py-3 text-base">
                Start writing free
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a href="#features" className="btn-secondary px-6 py-3 text-base">
                Explore features
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "M", "S", "J"].map((letter, index) => (
                    <span
                      key={letter}
                      className={`flex size-8 items-center justify-center rounded-full border-2 border-paper text-[10px] font-bold text-white ${
                        ["bg-brand-600", "bg-accent-500", "bg-emerald-600", "bg-[#9a7b3f]"][index]
                      }`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-semibold text-muted">
                  Loved by curious minds
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                <div className="flex gap-0.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="size-3.5 fill-current" />
                  ))}
                </div>
                Simple by design
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-lg animate-fade-up lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-3 top-7 h-full w-full -rotate-3 rounded-2xl border border-line bg-[#e9e2d3]"
            />
            <div
              aria-hidden="true"
              className="absolute -right-2 top-3 h-full w-full rotate-2 rounded-2xl border border-line bg-[#e1e8df]"
            />

            <div className="card relative overflow-hidden p-3 shadow-[0_35px_75px_-38px_rgba(40,44,34,0.55)]">
              <div className="flex items-center gap-2 border-b border-line px-3 pb-3 pt-1">
                <span className="size-2.5 rounded-full bg-rose-300" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-brand-300" />
                <div className="mx-auto flex items-center gap-2 rounded-full bg-[#f7f4ec] px-3 py-1 text-[10px] font-semibold text-muted">
                  <ShieldCheck className="size-3 text-brand-600" />
                  notenest.app
                </div>
              </div>

              <div className="grid grid-cols-[82px_minmax(0,1fr)] gap-3 pt-3 sm:grid-cols-[92px_minmax(0,1fr)]">
                <div className="rounded-2xl bg-forest p-3 text-white">
                  <div className="mb-4 flex items-center gap-1.5">
                    <BrandMark className="size-5 rounded-md" />
                    <span className="text-[9px] font-bold">NoteNest</span>
                  </div>
                  {["Dashboard", "All notes", "Favorites", "Community"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`mb-1.5 rounded-lg px-2 py-1.5 text-[7px] font-semibold transition ${
                          index === 1
                            ? "bg-paper text-forest"
                            : "text-white/45 hover:bg-white/5 hover:text-white/70"
                        }`}
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-brand-700">
                        Your workspace
                      </p>
                      <p className="font-display text-base font-semibold text-ink">
                        Good morning, Maya
                      </p>
                    </div>
                    <div className="flex size-7 items-center justify-center rounded-full bg-accent-100 text-[8px] font-bold text-accent-800">
                      M
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-line bg-paper p-2.5 shadow-sm">
                      <p className="text-[7px] font-semibold text-muted">Total notes</p>
                      <p className="mt-1 font-display text-lg font-semibold text-ink">24</p>
                    </div>
                    <div className="rounded-xl border border-line bg-paper p-2.5 shadow-sm">
                      <p className="text-[7px] font-semibold text-muted">Favorites</p>
                      <p className="mt-1 font-display text-lg font-semibold text-ink">7</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        title: "Launch checklist",
                        label: "Work",
                        color: "bg-[#eef1f3] text-[#48606e]",
                      },
                      {
                        title: "Weekend ideas",
                        label: "Personal",
                        color: "bg-brand-50 text-brand-700",
                      },
                    ].map((note) => (
                      <div
                        key={note.title}
                        className="rounded-xl border border-line bg-paper p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200"
                      >
                        <span className={`rounded-full px-1.5 py-0.5 text-[6px] font-bold ${note.color}`}>
                          {note.label}
                        </span>
                        <p className="mt-2 text-[8px] font-bold leading-tight text-body">
                          {note.title}
                        </p>
                        <div className="mt-2 space-y-1">
                          <div className="h-1 w-full rounded-full bg-[#eee9de]" />
                          <div className="h-1 w-4/5 rounded-full bg-[#eee9de]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-float absolute -right-3 top-24 w-48 rounded-2xl border border-line bg-paper/95 p-4 shadow-2xl shadow-forest/15 backdrop-blur sm:-right-6">
              <div className="flex items-center gap-1.5 text-accent-700">
                <WandSparkles className="size-3.5" />
                <p className="text-[8px] font-bold uppercase tracking-wider">AI summary</p>
              </div>
              <p className="mt-2 text-[9px] font-medium leading-4 text-body">
                • Launch moved to Friday
                <br />
                • Three assets still missing
                <br />
                • Ask design for final copy
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-accent-100">
                <div className="h-full w-4/5 rounded-full bg-accent-500" />
              </div>
            </div>

            <div className="absolute -bottom-5 left-0 flex items-center gap-2 rounded-2xl border border-line bg-paper/95 px-3 py-2 shadow-xl shadow-forest/10 backdrop-blur sm:-left-4">
              <div className="flex size-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <MessagesSquare className="size-3.5" />
              </div>
              <div>
                <p className="text-[8px] font-bold text-body">Community is live</p>
                <p className="text-[7px] text-muted">12 note-makers chatting</p>
              </div>
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-line bg-paper/55 py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge">Everything in one nest</span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Small features. A noticeably calmer workflow.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              NoteNest stays out of your way while giving you the tools that
              actually make writing and remembering easier.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={index * 60}>
                  <article
                    onPointerMove={tiltHandlers.onPointerMove}
                    onPointerLeave={tiltHandlers.onPointerLeave}
                    className="interactive-card card group h-full p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={`flex size-11 items-center justify-center rounded-2xl ${feature.color}`}>
                        <Icon className="size-5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                      </div>
                      <span className="font-display text-sm font-semibold text-muted/50">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {feature.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <span className="badge">How it works</span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                From scattered thought to a nest that makes sense.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                No complicated setup. Start with one note, then let the workspace
                grow with you.
              </p>

              <ul className="mt-7 space-y-3 text-sm font-medium text-body">
                {[
                  "Free to start — no credit card",
                  "Your notes stay yours",
                  "Works on desktop and mobile",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 text-brand-600" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link to="/signup" className="btn-primary group mt-8">
                Create your free account
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Reveal>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Reveal key={step.title} delay={index * 90}>
                    <article className="card group flex items-start gap-4 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-200 sm:p-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-600">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-6 text-muted">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="pb-20 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="sidebar-texture relative overflow-hidden rounded-[2rem] px-6 py-12 text-white shadow-2xl shadow-forest/20 sm:px-10 lg:px-14">
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex items-center gap-2 text-accent-200">
                    <Zap className="size-4" />
                    <p className="text-xs font-bold uppercase tracking-[0.18em]">
                      You're not writing alone
                    </p>
                  </div>
                  <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                    A community that turns quiet ideas into momentum.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                    Join the live #general room, share a note you're proud of, ask
                    for feedback, or simply lurk until you're ready. Everyone is
                    welcome.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Link
                      to="/signup"
                      className="btn-secondary group border-transparent bg-paper px-5 py-2.5 text-forest hover:bg-brand-50"
                    >
                      Join the community
                      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <FolderHeart className="size-4 text-accent-200" />
                      Notes, summaries and conversations in one place
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-xs lg:w-64">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                        # general
                      </p>
                      <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-300">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                        Live
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex gap-2">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-rose-200 text-[8px] font-bold text-rose-800">
                          A
                        </div>
                        <div className="rounded-xl rounded-bl-sm bg-white/10 px-2.5 py-2 text-[9px] leading-4 text-white/70">
                          Just tried the AI summary on my meeting notes. Wild.
                        </div>
                      </div>
                      <div className="flex flex-row-reverse gap-2">
                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-300 text-[8px] font-bold text-accent-900">
                          M
                        </div>
                        <div className="rounded-xl rounded-br-sm bg-accent-500 px-2.5 py-2 text-[9px] leading-4 text-white">
                          Same! It caught the action items I forgot.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <Reveal className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
          <div className="card px-6 py-12 sm:px-12">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Ready to give your thoughts a nicer home?
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Start with one note. Add AI summaries and a community when you're ready.
            </p>
            <Link to="/signup" className="btn-primary group mt-7 px-7 py-3 text-base">
              Get started free
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>

    <footer className="border-t border-line bg-paper/55 py-8 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-body">
          <BrandMark className="size-7 rounded-lg" />
          NoteNest — a calmer place for your thoughts.
        </div>
        <div className="flex items-center gap-5 text-xs font-semibold text-muted">
          <Link to="/login" className="transition hover:text-brand-800">
            Log in
          </Link>
          <Link to="/signup" className="transition hover:text-brand-800">
            Sign up
          </Link>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  </div>
);

export default LandingPage;
