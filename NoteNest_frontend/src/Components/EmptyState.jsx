const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="card relative flex flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(28,37,30,0.12)_0.7px,transparent_0.7px)] [background-size:18px_18px]"
    />
    <div className="relative">
      {Icon ? (
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 text-brand-700 shadow-sm">
          <Icon className="size-7" />
        </div>
      ) : null}
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  </div>
);

export default EmptyState;
