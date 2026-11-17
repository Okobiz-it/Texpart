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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (typeof window === "undefined" || !editorRef.current) return;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);

      // Find enclosing blockquote if any
      let node: Node | null = range.startContainer;
      let blockquote: HTMLElement | null = null;
      while (node && node !== editorRef.current) {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).tagName.toLowerCase() === "blockquote"
        ) {
          blockquote = node as HTMLElement;
          break;
        }
        node = node.parentNode;
      }

      if (!blockquote) return;

      // Clean text content of the entire blockquote
      const bqText = (blockquote.innerText || "")
        .replace(/[\u200B\uFEFF\n\r]/g, "")
        .trim();

      // Case 1: Entire blockquote is empty (user selected quote on empty line, or emptied it)
      if (bqText === "" && !blockquote.querySelector("img")) {
        e.preventDefault();
        const p = document.createElement("p");
        p.innerHTML = "<br>";
        blockquote.parentNode?.replaceChild(p, blockquote);

        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);

        onChange(editorRef.current.innerHTML);
        return;
      }

      // Case 2: Find the specific child line block of blockquote containing the cursor
      let childBlock: HTMLElement | null = null;
      let curr: Node | null = range.startContainer;
      while (curr && curr !== editorRef.current) {
        if (curr.parentNode === blockquote) {
          if (curr.nodeType === Node.ELEMENT_NODE) {
            childBlock = curr as HTMLElement;
          }
          break;
        }
        curr = curr.parentNode;
      }

      if (childBlock) {
        const childText = (childBlock.innerText || "")
          .replace(/[\u200B\uFEFF\n\r]/g, "")
          .trim();
        const hasImg = !!childBlock.querySelector("img");

        // If the current quote line/block is empty, exit the quote!
        if (childText === "" && !hasImg) {
          e.preventDefault();
          childBlock.remove();

          const p = document.createElement("p");
          p.innerHTML = "<br>";

          if (blockquote.nextSibling) {
            blockquote.parentNode?.insertBefore(p, blockquote.nextSibling);
          } else {
            blockquote.parentNode?.appendChild(p);
          }

          // If blockquote became completely empty, remove it
          if (
            (blockquote.innerText || "")
              .replace(/[\u200B\uFEFF\n\r]/g, "")
              .trim() === "" &&
            !blockquote.querySelector("img")
          ) {
            blockquote.remove();
          }

          const newRange = document.createRange();
          newRange.setStart(p, 0);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);

          onChange(editorRef.current.innerHTML);
          return;
        }
      } else {
        // Case 3: Blockquote has direct text and <br> elements (no child divs)
        const childNodes = Array.from(blockquote.childNodes);
        if (childNodes.length > 0) {
          const lastChild = childNodes[childNodes.length - 1];
          const secondLast = childNodes.length > 1 ? childNodes[childNodes.length - 2] : null;

          const isAtEnd =
            range.startContainer === blockquote
              ? range.startOffset >= childNodes.length - 1
              : range.startContainer === lastChild;

          if (isAtEnd && lastChild.nodeName === "BR") {
            e.preventDefault();
            lastChild.remove();
            if (secondLast && secondLast.nodeName === "BR") {
              secondLast.remove();
            }

            const p = document.createElement("p");
            p.innerHTML = "<br>";

            if (blockquote.nextSibling) {
              blockquote.parentNode?.insertBefore(p, blockquote.nextSibling);
            } else {
              blockquote.parentNode?.appendChild(p);
            }

            if (
              (blockquote.innerText || "")
                .replace(/[\u200B\uFEFF\n\r]/g, "")
                .trim() === ""
            ) {
              blockquote.remove();
            }

            const newRange = document.createRange();
            newRange.setStart(p, 0);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);

            onChange(editorRef.current.innerHTML);
            return;
          }
        }
      }
    } else if (e.key === "Backspace") {
      if (typeof window === "undefined" || !editorRef.current) return;
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      let node: Node | null = range.startContainer;
      let blockquote: HTMLElement | null = null;
      while (node && node !== editorRef.current) {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).tagName.toLowerCase() === "blockquote"
        ) {
          blockquote = node as HTMLElement;
          break;
        }
        node = node.parentNode;
      }

      if (!blockquote) return;

      const bqText = (blockquote.innerText || "")
        .replace(/[\u200B\uFEFF\n\r]/g, "")
        .trim();

      if (bqText === "" && !blockquote.querySelector("img")) {
        e.preventDefault();
        const p = document.createElement("p");
        p.innerHTML = "<br>";
        blockquote.parentNode?.replaceChild(p, blockquote);

        const newRange = document.createRange();
        newRange.setStart(p, 0);
        newRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(newRange);

        onChange(editorRef.current.innerHTML);
        return;
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
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="w-full px-3.5 py-2.5 bg-slate-50/40 text-xs text-[#0A2540] focus:bg-white focus:outline-none leading-relaxed transition-colors relative before:content-[attr(data-placeholder)] before:text-slate-400 before:pointer-events-none empty:before:inline-block [&:not(:empty)]:before:hidden [&_blockquote]:border-l-2 [&_blockquote]:border-[#0066CC] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-1.5 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-1 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-1"
      />
    </div>
  );
}
