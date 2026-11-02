import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CustomStar from "../assets/photos/CustomStar.jsx";
import getTimeAgo from "../utils/GetTime.jsx";
import {
  getExcerpt,
  getLabelStyle,
  getReadingTime,
} from "../utils/noteText.js";
import { tiltHandlers } from "../utils/interactive.js";

const NoteCard = ({ note, className = "" }) => {
  const updated = note?.updatedAt || note?.createdAt;
  const label = note?.label || "Unlabeled";

  return (
    <Link
      to={`/layout/noteDetail/${note?._id}`}
      onPointerMove={tiltHandlers.onPointerMove}
      onPointerLeave={tiltHandlers.onPointerLeave}
      className={`interactive-card card group relative flex min-h-[220px] flex-col p-5 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize ${getLabelStyle(label)}`}
        >
          <span className="size-1.5 rounded-full bg-current opacity-60" />
          {label}
        </span>
        <CustomStar data={note} />
      </div>

      <h3 className="mt-4 line-clamp-2 font-display text-xl font-semibold leading-snug text-ink transition group-hover:text-brand-700">
        {note?.title || "Untitled note"}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
        {getExcerpt(note?.note) || "No content yet. Open this note to start writing."}
      </p>

      <div className="mt-auto flex items-center justify-between pt-5 text-[11px] font-semibold text-muted/80">
        <span>{updated ? getTimeAgo(updated) : "Just now"}</span>
        <span>{getReadingTime(note?.note)} min read</span>
      </div>

      <span className="absolute right-5 top-14 rounded-lg bg-brand-50 p-1.5 text-brand-700 opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
};

export default NoteCard;
