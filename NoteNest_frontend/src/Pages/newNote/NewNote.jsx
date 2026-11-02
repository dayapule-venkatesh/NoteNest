import { useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent, EditorContext } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import { TextStyle, FontSize } from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from "@tiptap/extension-table";
import {
  ArrowLeft,
  Check,
  Loader2,
  Save,
  Tag,
} from "lucide-react";
import axios from "axios";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeaderOptions from "./HeaderOptions";
import CustomStar from "../../assets/photos/CustomStar.jsx";
import { fetchUserNotes } from "../../Features/UserNotes.jsx";
import { API_URL } from "../../Features/API.js";
import { toast } from "../../utils/toast";

const LABELS = ["Work", "Personal", "Study", "Ideas"];

const countWords = (editor) =>
  editor
    ? editor.getText().trim().split(/\s+/).filter(Boolean).length
    : 0;

const NewNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.userNotes.userdata);
  const status = useSelector((state) => state.userNotes.status);

  const existingNote = useMemo(() => {
    if (id) return notes?.find((note) => note._id === id);
    return location.state?.ele;
  }, [id, notes, location.state]);

  const noteId = id || existingNote?._id;
  const isEditing = Boolean(noteId);

  const [title, setTitle] = useState("Untitled note");
  const [label, setLabel] = useState("");
  const [saving, setSaving] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const initialized = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      Highlight,
      Placeholder.configure({
        placeholder: "Start writing your note…",
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      FontSize,
      Image.configure({ inline: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        class: "tiptap rich-text outline-none px-5 py-5 sm:px-8 sm:py-6",
      },
    },
    content: "<p></p>",
    onUpdate: ({ editor: currentEditor }) => {
      setWordCount(countWords(currentEditor));
    },
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  useEffect(() => {
    if (!editor || initialized.current) return;

    // If we're opening a saved note, wait for the notes request to finish so
    // the editor opens with the right content.
    if (id && !existingNote && (status === "loading" || status === "idle")) return;

    initialized.current = true;

    if (existingNote) {
      editor.commands.setContent(existingNote.note || "<p></p>", {
        emitUpdate: false,
      });
      setTitle(existingNote.title || "Untitled note");
      setLabel(existingNote.label || "");
      setWordCount(countWords(editor));
    } else {
      editor.commands.setContent("<p></p>", { emitUpdate: false });
      setWordCount(0);
    }
  }, [editor, id, existingNote, status]);

  const handleSave = async () => {
    if (saving) return;

    if (!title.trim()) {
      toast.error("Give your note a title before saving");
      return;
    }

    const content = editor?.getHTML() || "";
    setSaving(true);

    try {
      if (isEditing) {
        const response = await axios.patch(
          `${API_URL}/api/note/edit`,
          {
            id: noteId,
            title: title.trim(),
            label: label.trim(),
            note: content,
          },
          { withCredentials: true },
        );

        if (response.data.status) {
          await dispatch(fetchUserNotes());
          toast.success("Note updated");
          navigate(`/layout/noteDetail/${noteId}`);
        } else {
          toast.error(response.data.message || "Could not update this note");
        }
      } else {
        const response = await axios.post(
          `${API_URL}/api/note/newnote`,
          { title: title.trim(), label: label.trim(), note: content },
          { withCredentials: true },
        );

        if (response.data.status) {
          await dispatch(fetchUserNotes());
          toast.success("Note saved to your nest");
          navigate("/layout/allNotes");
        } else {
          toast.error(response.data.message || "Could not save this note");
        }
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Could not save this note. Try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <RouterLink
          to="/layout/allNotes"
          className="inline-flex w-fit items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-muted transition hover:bg-paper hover:text-brand-800"
        >
          <ArrowLeft className="size-4" />
          Back to notes
        </RouterLink>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-[11px] font-semibold text-muted shadow-sm">
            <Check className="size-3.5 text-emerald-600" />
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary px-5 py-2.5 text-xs"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {saving ? "Saving…" : isEditing ? "Save changes" : "Save note"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Untitled note"
          aria-label="Note title"
          className="w-full border-0 bg-transparent font-display text-3xl font-semibold tracking-tight text-ink outline-none placeholder:text-muted/50 sm:text-4xl"
        />

        {isEditing ? (
          <div className="flex shrink-0 items-center gap-1 rounded-xl border border-line bg-paper px-2 py-1.5 text-[11px] font-semibold text-muted shadow-sm">
            <CustomStar data={existingNote} />
            Favorite
          </div>
        ) : null}
      </div>

      <div className="card overflow-hidden">
        {editor ? <HeaderOptions editor={editor} /> : null}
        <EditorContext.Provider value={providerValue}>
          <EditorContent editor={editor} />
        </EditorContext.Provider>
      </div>

      <div className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
            <Tag className="size-3.5" />
            Label
          </span>

          <div className="flex flex-wrap gap-1.5">
            {LABELS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLabel(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition active:scale-95 ${
                  label.toLowerCase() === item.toLowerCase()
                    ? "bg-forest text-paper shadow-sm"
                    : "bg-[#f1ede4] text-muted hover:bg-brand-50 hover:text-brand-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            placeholder="Or type a custom label…"
            className="w-full rounded-xl border border-line bg-paper px-3 py-1.5 text-xs text-body outline-none transition placeholder:text-muted focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 sm:max-w-[180px]"
          />
        </div>

        <p className="text-[11px] text-muted">
          {isEditing ? "Changes are saved to your note" : "A new note in your nest"}
        </p>
      </div>
    </div>
  );
};

export default NewNote;
