"use client";

import React, { useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  ListOrdered,
  List,
  Quote as QuoteIcon,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your message or specifications here...",
  minHeight = "110px",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync initial or reset value into contentEditable
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (!value) {
        editorRef.current.innerHTML = "";
      }
    }
  }, [value]);

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (typeof document !== "undefined" && editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, arg);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const html = e.currentTarget.innerHTML;
    onChange(html);
  };

  return (
    <div
      className={`border border-slate-200 rounded-[4px] overflow-hidden bg-white focus-within:border-[#0066CC] focus-within:ring-1 focus-within:ring-[#0066CC] transition-all ${className}`}
    >
      {/* Editor Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex flex-wrap items-center gap-1 text-[#0A2540]">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("bold");
          }}
          className="p-1.5 hover:bg-white hover:text-[#0066CC] rounded-[4px] text-xs font-bold transition-colors"
          title="Bold (Ctrl+B)"
          aria-label="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("italic");
          }}
          className="p-1.5 hover:bg-white hover:text-[#0066CC] rounded-[4px] text-xs transition-colors"
          title="Italic (Ctrl+I)"
          aria-label="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("underline");
          }}
          className="p-1.5 hover:bg-white hover:text-[#0066CC] rounded-[4px] text-xs transition-colors"
          title="Underline (Ctrl+U)"
          aria-label="Underline"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-200 mx-1" />

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("insertOrderedList");
          }}
          className="p-1.5 hover:bg-white hover:text-[#0066CC] rounded-[4px] text-xs transition-colors"
          title="Numbered List"
          aria-label="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("insertUnorderedList");
          }}
          className="p-1.5 hover:bg-white hover:text-[#0066CC] rounded-[4px] text-xs transition-colors"
          title="Bullet List"
          aria-label="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("formatBlock", "<blockquote>");
          }}
          className="p-1.5 hover:bg-white hover:text-[#0066CC] rounded-[4px] text-xs transition-colors"
          title="Quote"
          aria-label="Quote"
        >
          <QuoteIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Auto-growing contentEditable container */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="w-full px-3.5 py-2.5 bg-slate-50/40 text-xs text-[#0A2540] focus:bg-white focus:outline-none leading-relaxed transition-colors relative before:content-[attr(data-placeholder)] before:text-slate-400 before:pointer-events-none empty:before:inline-block [&:not(:empty)]:before:hidden [&_blockquote]:border-l-2 [&_blockquote]:border-[#0066CC] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-1.5 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-1 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-1"
      />
    </div>
  );
}
