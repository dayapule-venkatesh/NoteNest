const emit = (message, type) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("notenest:toast", {
      detail: { message, type, id: `${Date.now()}-${Math.random()}` },
    }),
  );
};

export const toast = (message, type = "success") => emit(message, type);

toast.success = (message) => emit(message, "success");
toast.error = (message) => emit(message, "error");
toast.info = (message) => emit(message, "info");
