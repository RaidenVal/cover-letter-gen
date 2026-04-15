"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

interface CoverLetterEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function CoverLetterEditor({ content, onChange }: CoverLetterEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: textToHtml(content),
    immediatelyRender: false,
    onUpdate({ editor: e }) {
      onChange(e.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-[#f0eee6] bg-white overflow-hidden">
      <div className="flex items-center gap-1 border-b border-[#f0eee6] bg-[#faf9f5] px-3 py-2">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={function toggleBold() { editor.chain().focus().toggleBold().run(); }}
          label="Bold"
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={function toggleItalic() { editor.chain().focus().toggleItalic().run(); }}
          label="Italic"
        >
          <span className="italic">I</span>
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-[#e8e6dc]" />
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={function toggleBullet() { editor.chain().focus().toggleBulletList().run(); }}
          label="Bullet list"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={function toggleOrdered() { editor.chain().focus().toggleOrderedList().run(); }}
          label="Numbered list"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10M3 8V6l1-1M3 12v-1l1-1M3 17v-1l1-1" />
          </svg>
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-[#e8e6dc]" />
        <ToolbarButton
          active={false}
          onClick={function undo() { editor.chain().focus().undo().run(); }}
          label="Undo"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2M3 10l4-4M3 10l4 4" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          active={false}
          onClick={function redo() { editor.chain().focus().redo().run(); }}
          label="Redo"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a5 5 0 00-5 5v2M21 10l-4-4M21 10l-4 4" />
          </svg>
        </ToolbarButton>
      </div>
      <EditorContent
        editor={editor}
        className="prose max-w-none p-8 font-serif text-[17px] leading-[1.60] text-[#141413] [&_.tiptap]:outline-none [&_.tiptap]:min-h-[1050px]"
      />
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`rounded-md px-2 py-1 text-sm transition-colors ${
        active
          ? "bg-[#e8e6dc] text-[#141413]"
          : "text-[#87867f] hover:bg-[#e8e6dc] hover:text-[#4d4c48]"
      }`}
    >
      {children}
    </button>
  );
}

function textToHtml(text: string): string {
  return text
    .split("\n\n")
    .map((para) => `<p>${para.replace(/\n/g, "<br>")}</p>`)
    .join("");
}
