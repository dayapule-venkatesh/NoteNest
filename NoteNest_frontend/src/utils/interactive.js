const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const tiltCard = (event) => {
  if (event.pointerType === "touch") return;

  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  event.currentTarget.style.setProperty("--mx", `${x * 100}%`);
  event.currentTarget.style.setProperty("--my", `${y * 100}%`);
  event.currentTarget.style.setProperty("--ry", `${clamp((x - 0.5) * 4, -2.5, 2.5)}deg`);
  event.currentTarget.style.setProperty("--rx", `${clamp((0.5 - y) * 4, -2.5, 2.5)}deg`);
};

export const resetTilt = (event) => {
  event.currentTarget.style.setProperty("--mx", "50%");
  event.currentTarget.style.setProperty("--my", "50%");
  event.currentTarget.style.setProperty("--ry", "0deg");
  event.currentTarget.style.setProperty("--rx", "0deg");
};

export const tiltHandlers = {
  onPointerMove: tiltCard,
  onPointerLeave: resetTilt,
};
