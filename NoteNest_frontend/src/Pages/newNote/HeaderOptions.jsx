import { isList, useEditorState } from "@tiptap/react";
import React, { useRef } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  LayoutList,
  ListOrdered,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  Link,
  Unlink,
  Quote,
  Minus,
  Code,
  Image,
  Table,
  Undo,
  Redo,
  Highlighter,
} from "lucide-react";

const HeaderOptions = ({ editor }) => {
  const getButtonClass = (active) => `toolbar-button ${active ? "active" : ""}`;
  const {
    isBold,
    isItalic,
    isStrike,
    isUnderline,
    isH1,
    isH2,
    isH3,
    isList,
    isListOrdered,
    islayoutlist,
    isleft,
    isright,
    iscenter,
    isjustify,
    islink,
    isquote,
    ishorizontal,
    iscodeblock,
    isimage,
    istable,
    canUndo,
    canRedo,
    ishighlight,
  } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isStrike: editor.isActive("strike"),
      isUnderline: editor.isActive("underline"),

      isH1: editor.isActive("heading", { level: 1 }),
      isH2: editor.isActive("heading", { level: 2 }),
      isH3: editor.isActive("heading", { level: 3 }),
      isList: editor.isActive("list"),
      isListOrdered: editor.isActive("listordered"),
      islayoutlist: editor.isActive("layoutlist"),
      isleft: editor.isActive("left"),
      isright: editor.isActive("right"),
      iscenter: editor.isActive("center"),
      isjustify: editor.isActive("justify"),
      islink: editor.isActive("link"),
      isquote: editor.isActive("quote"),
      ishorizontal: editor.isActive("horizontal"),
      iscodeblock: editor.isActive("codeblock"),
      isimage: editor.isActive("image"),
      istable: editor.isActive("table"),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
      ishighlight:editor.isActive("hidhlight")
    }),
  });

  const savedSelection = useRef(null);

  const saveSelection = () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;

    if (from !== to) {
      savedSelection.current = { from, to };
    }
  };
  return (
    <nav className="border-2 border-[#d1d1e0]   rounded-xl shadow-md ">
      <div className="flex justify-between p-1 ">
        <div className="flex flex-col">
          TEXT
          <div className="flex gap-1">
            <button
            title="Heading 1"
              className={getButtonClass(isH1)}
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
              }}
            >
              <Heading1 />
            </button>

            <button
            title="Heading 2"
              className={getButtonClass(isH2)}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 />
            </button>

            <button
            title="Heading 3"
              className={getButtonClass(isH3)}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Heading3 />
            </button>
            <button
            title="Bold"
              className={getButtonClass(isBold)}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold />
            </button>
            <button
            title="Italic"
              className={getButtonClass(isItalic)}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic />
            </button>
            <button
            title="Underline"
              className={getButtonClass(isUnderline)}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <Underline />
            </button>

            <button
            title="Strike through"
              className={getButtonClass(isStrike)}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough />
            </button>
            <input
            title="Font size"
              type="number"
              min="8"
              max="100"
              placeholder="size"
              className="border border-gray-500 rounded-xl p-0.5 shadow-md"
              onMouseDown={saveSelection}

              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  const size = e.currentTarget.value;

                  if (!size || !editor || !savedSelection.current) return;

                  const { from, to } = savedSelection.current;

                  editor
                    .chain()
                    .setTextSelection({ from, to })
                    .setFontSize(`${size}px`)
                    .run();
                }
              }}
            />
          </div>
        </div>
        <div className="flex flex-col">
          LISTS
          <div className="flex gap-1">
            <button
            title="Dotted list"
              className={getButtonClass(isList)}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List />
            </button>

            <button
            title="Numbered list"
              className={getButtonClass(isListOrdered)}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered />
            </button>
            <button
            title="check List"
              className={getButtonClass(islayoutlist)}
              type="button"
              onClick={() => editor.chain().focus().toggleTaskList().run()}
            >
              <LayoutList />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          ALIGN
          <div className="flex gap-1">
            <button
            title="Text left"
              className={getButtonClass(isleft)}
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
            >
              <TextAlignStart />
            </button>

            <button
            title="Text Center"
              className={getButtonClass(iscenter)}
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
            >
              <TextAlignCenter />
            </button>

            <button
            title="Text right"
              className={getButtonClass(isright)}
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
            >
              <TextAlignEnd />
            </button>

            <button
            title="Text Justify"
              className={getButtonClass(isjustify)}
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
            >
              <TextAlignJustify className="hover:'justify'" />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          INSERT
          <div className="flex gap-1">
            <button
              title="Link"
              className={getButtonClass(islink)}
              onClick={() => {
                const url = window.prompt("Enter URL");

                if (url) {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .setLink({ href: url })
                    .run();
                }
              }}
            >
              {islink ? <Unlink  /> : <Link />}
            </button>

            <button
            title="quote"
              className={getButtonClass(isquote)}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote />
            </button>
            <button
            title="Horizontal line"
              className={getButtonClass(ishorizontal)}
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <Minus />
            </button>

            <button
            title="Code Block"
              className={getButtonClass(iscodeblock)}
              onClick={() => {
                editor.chain().focus().toggleCodeBlock().run();
              }}
            >
              <Code />
            </button>
            <button
            title="Image"
              type="button"
              className={getButtonClass(isimage)}
              onClick={() => {
                const url = prompt("Enter image URL");

                if (url) {
                  editor.chain().focus().setImage({ src: url }).run();
                }
              }}
            >
              <Image />
            </button>
            <button
            title="Table"
              className={getButtonClass(istable)}
              type="button"
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .insertTable({
                    rows: 3,
                    cols: 3,
                    withHeaderRow: true,
                  })
                  .run();
              }}
            >
              <Table />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          EDIT
          <div className="flex gap-1">
            <button
            title="Undo"
              type="button"
              disabled={!canUndo}
              className={` 
    toolbar-button
    ${
      canUndo
        ? "text-black hover:bg-gray-100"
        : "text-gray-400 cursor-not-allowed"
    }
  `}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo />
            </button>

            <button
            title="Redo"
              className={`toolbar-button${canRedo ? "text-black hover:bg-gray-100" : "text-gray-400 cursor-not-allowed"}`}
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!canRedo}
            >
              <Redo />
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          MORE
          <div className="flex gap-1">
            <input
            title="Text color"
              type="color"
              onChange={(e) => {
                editor.chain().focus().setColor(e.target.value).run();
              }}
            />

            <button
            title="Highlighter"
            className={getButtonClass(ishighlight)}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
            >
              <Highlighter />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderOptions;
