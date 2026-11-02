import { Link } from "react-router-dom";

const PageHeader = ({ eyebrow, title, description, actions, className = "" }) => (
  <header
    className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}
  >
    <div>
      {eyebrow ? (
        <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-700">
          <span className="h-px w-5 bg-accent-500" />
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
    {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
  </header>
);

export const HeaderLink = ({ to, children, variant = "primary" }) => (
  <Link to={to} className={variant === "primary" ? "btn-primary" : "btn-secondary"}>
    {children}
  </Link>
);

export default PageHeader;
