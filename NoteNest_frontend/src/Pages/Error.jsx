import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Ghost } from "lucide-react";

const Error = () => {
  const location = useLocation();
  const message =
    location.state?.message ||
    "Something slipped out of the nest. The page could not be found.";

  return (
    <div className="app-bg flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-lg p-8 text-center sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 text-brand-700">
          <Ghost className="size-7" />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-accent-600">
          A small detour
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">
          That page isn't in the nest.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">{message}</p>
        <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
          <Link to="/layout" className="btn-primary">
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
          <Link to="/" className="btn-secondary">
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
