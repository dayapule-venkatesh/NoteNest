import { AlertTriangle } from "lucide-react";

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-forest/55 p-4 backdrop-blur-sm">
      <div className="animate-fade-up w-full max-w-md rounded-3xl border border-line bg-paper p-6 shadow-2xl">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-700">
          <AlertTriangle className="size-6" />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
        ) : null}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn-secondary"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn-danger"
          >
            {loading ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
