export const getPlainText = (html = "") => {
  if (typeof document === "undefined") return "";

  const element = document.createElement("div");
  element.innerHTML = html;
  return (element.textContent || element.innerText || "").replace(/\s+/g, " ").trim();
};

export const getExcerpt = (html, length = 130) => {
  const text = getPlainText(html);
  if (text.length <= length) return text;
  return `${text.slice(0, length).trimEnd()}…`;
};

export const getReadingTime = (html) => {
  const words = getPlainText(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const labelStyles = {
  work: "bg-[#eef1f3] text-[#48606e] border-[#d9e1e6]",
  personal: "bg-brand-50 text-brand-700 border-brand-200",
  study: "bg-amber-50 text-amber-800 border-amber-200",
  ideas: "bg-accent-50 text-accent-700 border-accent-200",
};

export const getLabelStyle = (label) =>
  labelStyles[String(label || "").toLowerCase()] ||
  "bg-brand-50 text-brand-700 border-brand-200";
