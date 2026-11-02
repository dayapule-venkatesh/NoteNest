import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

const TOAST_LIFETIME = 3600;

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
  info: "border-brand-200 bg-brand-50 text-brand-900",
};

const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const nextToast = event.detail;
      setToasts((current) => [...current, nextToast]);

      window.setTimeout(() => {
        setToasts((current) =>
          current.filter((item) => item.id !== nextToast.id),
        );
      }, TOAST_LIFETIME);
    };

    window.addEventListener("notenest:toast", handleToast);
    return () => window.removeEventListener("notenest:toast", handleToast);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end">
      {toasts.map((item) => {
        const Icon = icons[item.type] || Info;

        return (
          <div
            key={item.id}
            className={`animate-fade-up pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-xl shadow-forest/10 ${styles[item.type] || styles.info}`}
          >
            <Icon className="mt-0.5 size-5 shrink-0" />
            <p className="flex-1 text-sm font-semibold">{item.message}</p>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() =>
                setToasts((current) =>
                  current.filter((toastItem) => toastItem.id !== item.id),
                )
              }
              className="rounded-lg p-0.5 opacity-60 transition hover:opacity-100"
            >
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toaster;
