import { useEditorState } from "@tiptap/react";
import { useRef } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  ListChecks,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  Link,
  Unlink,
  Quote,
  Minus,
  Code,
  Image as ImageIcon,
  Table as TableIcon,
  Undo,
  Redo,
  Highlighter,
} from "lucide-react";

const Divider = () => <span className="mx-1 hidden h-6 w-px shrink-0 bg-line sm:block" />;

const HeaderOptions = ({ editor }) => {
  const savedSelection = useRef(null);

  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      isBold: currentEditor.isActive("bold"),
      isItalic: currentEditor.isActive("italic"),
      isStrike: currentEditor.isActive("strike"),
      isUnderline: currentEditor.isActive("underline"),
      isH1: currentEditor.isActive("heading", { level: 1 }),
      isH2: currentEditor.isActive("heading", { level: 2 }),
      isH3: currentEditor.isActive("heading", { level: 3 }),
      isBulletList: currentEditor.isActive("bulletList"),
      isOrderedList: currentEditor.isActive("orderedList"),
      isTaskList: currentEditor.isActive("taskList"),
      isAlignLeft: currentEditor.isActive({ textAlign: "left" }),
      isAlignCenter: currentEditor.isActive({ textAlign: "center" }),
      isAlignRight: currentEditor.isActive({ textAlign: "right" }),
      isAlignJustify: currentEditor.isActive({ textAlign: "justify" }),
      isLink: currentEditor.isActive("link"),
      isQuote: currentEditor.isActive("blockquote"),
      isCodeBlock: currentEditor.isActive("codeBlock"),
      isHighlight: currentEditor.isActive("highlight"),
      canUndo: currentEditor.can().undo(),
      canRedo: currentEditor.can().redo(),
    }),
  });

  if (!editor || !state) return null;

  const buttonClass = (active) => `toolbar-button ${active ? "active" : ""}`;

  const saveSelection = () => {
    const { from, to } = editor.state.selection;
    if (from !== to) savedSelection.current = { from, to };
  };

  const applyFontSize = (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    const size = event.currentTarget.value;
    if (!size || !savedSelection.current) return;

    const { from, to } = savedSelection.current;
    editor
      .chain()
      .focus()
      .setTextSelection({ from, to })
      .setFontSize(`${size}px`)
      .run();
  };

  return (
    <nav className="flex items-center gap-0.5 overflow-x-auto border-b border-line bg-[#faf7f0] px-3 py-2">
      <button
        type="button"
        title="Undo"
        disabled={!state.canUndo}
        className={buttonClass(false)}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo />
      </button>
      <button
        type="button"
        title="Redo"
        disabled={!state.canRedo}
        className={buttonClass(false)}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo />
      </button>

      <Divider />

      <button
        type="button"
        title="Heading 1"
        className={buttonClass(state.isH1)}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 />
      </button>
      <button
        type="button"
        title="Heading 2"
        className={buttonClass(state.isH2)}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 />
      </button>
      <button
        type="button"
        title="Heading 3"
        className={buttonClass(state.isH3)}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 />
      </button>

      <Divider />

      <button
        type="button"
        title="Bold"
        className={buttonClass(state.isBold)}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </button>
      <button
        type="button"
        title="Italic"
        className={buttonClass(state.isItalic)}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </button>
      <button
        type="button"
        title="Underline"
        className={buttonClass(state.isUnderline)}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline />
      </button>
      <button
        type="button"
        title="Strikethrough"
        className={buttonClass(state.isStrike)}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </button>

      <input
        type="number"
        min="8"
        max="100"
        placeholder="Size"
        title="Font size"
        aria-label="Font size"
        onMouseDown={saveSelection}
        onKeyDown={applyFontSize}
        className="ml-1 w-14 shrink-0 rounded-lg border border-line bg-paper px-1.5 py-1 text-[11px] text-muted outline-none transition focus:border-brand-400"
      />

      <Divider />

      <button
        type="button"
        title="Bullet list"
        className={buttonClass(state.isBulletList)}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </button>
      <button
        type="button"
        title="Numbered list"
        className={buttonClass(state.isOrderedList)}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </button>
      <button
        type="button"
        title="Task list"
        className={buttonClass(state.isTaskList)}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      >
        <ListChecks />
      </button>

      <Divider />

      <button
        type="button"
        title="Align left"
        className={buttonClass(state.isAlignLeft)}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <TextAlignStart />
      </button>
      <button
        type="button"
        title="Align center"
        className={buttonClass(state.isAlignCenter)}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <TextAlignCenter />
      </button>
      <button
        type="button"
        title="Align right"
        className={buttonClass(state.isAlignRight)}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <TextAlignEnd />
      </button>
      <button
        type="button"
        title="Justify"
        className={buttonClass(state.isAlignJustify)}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <TextAlignJustify />
      </button>

      <Divider />

      <button
        type="button"
        title="Link"
        className={buttonClass(state.isLink)}
        onClick={() => {
          const url = window.prompt("Enter URL");
          if (url) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }
        }}
      >
        {state.isLink ? <Unlink /> : <Link />}
      </button>
      <button
        type="button"
        title="Quote"
        className={buttonClass(state.isQuote)}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote />
      </button>
      <button
        type="button"
        title="Divider"
        className={buttonClass(false)}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus />
      </button>
      <button
        type="button"
        title="Code block"
        className={buttonClass(state.isCodeBlock)}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code />
      </button>
      <button
        type="button"
        title="Image"
        className={buttonClass(false)}
        onClick={() => {
          const url = window.prompt("Enter image URL");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
      >
        <ImageIcon />
      </button>
      <button
        type="button"
        title="Table"
        className={buttonClass(false)}
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        <TableIcon />
      </button>

      <Divider />

      <label
        title="Text color"
        className="relative inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-brand-50"
      >
        <span className="size-4 rounded-full border-2 border-paper bg-forest shadow-sm ring-1 ring-line" />
        <input
          type="color"
          aria-label="Text color"
          onChange={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
      <button
        type="button"
        title="Highlight"
        className={buttonClass(state.isHighlight)}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter />
      </button>
    </nav>
  );
};

export default HeaderOptions;
