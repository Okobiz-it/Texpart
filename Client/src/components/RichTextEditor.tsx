"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  ListOrdered,
  List,
  Quote as QuoteIcon,
  Link as LinkIcon,
  Unlink,
  Check,
  X,
  ExternalLink,
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
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isInsideLink, setIsInsideLink] = useState(false);
  const savedSelectionRef = useRef<Range | null>(null);

  // Sync initial or reset value into contentEditable
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (!value) {
        editorRef.current.innerHTML = "";
      }
    }
  }, [value]);

  const saveSelection = () => {
    if (typeof window === "undefined") return null;
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      return sel.getRangeAt(0).cloneRange();
    }
    return null;
  };

  const restoreSelection = (range: Range | null) => {
    if (typeof window === "undefined" || !range) return;
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const executeCommand = (command: string, arg: string | undefined = undefined) => {
    if (typeof document !== "undefined" && editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, arg);
      if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  // Helper to check if an element is completely empty
  const isEmptyElement = (el: HTMLElement) => {
    const text = (el.textContent || el.innerText || "").replace(
      /[\u200B\uFEFF\n\r\s\u00A0]/g,
      ""
    );
    const hasMedia = !!el.querySelector("img, video, iframe");
    return text === "" && !hasMedia;
  };

  // Check if current selection is inside an anchor link
  const findParentLink = (): HTMLAnchorElement | null => {
    if (typeof window === "undefined" || !editorRef.current) return null;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    let node: Node | null = sel.getRangeAt(0).startContainer;
    while (node && node !== editorRef.current) {
      if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName.toLowerCase() === "a") {
        return node as HTMLAnchorElement;
      }
      node = node.parentNode;
    }
    return null;
  };

  const handleOpenLinkPopover = () => {
    savedSelectionRef.current = saveSelection();
    const existingLink = findParentLink();
    if (existingLink) {
      setLinkUrl(existingLink.getAttribute("href") || "");
      setIsInsideLink(true);
    } else {
      setLinkUrl("");
      setIsInsideLink(false);
    }
    setShowLinkPopover(true);
  };

  const handleApplyLink = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    restoreSelection(savedSelectionRef.current);

    const trimmed = linkUrl.trim();
    if (trimmed) {
      let finalUrl = trimmed;
      if (!/^https?:\/\//i.test(finalUrl) && !/^mailto:/i.test(finalUrl) && !/^tel:/i.test(finalUrl) && !finalUrl.startsWith("#")) {
        finalUrl = "https://" + finalUrl;
      }
      document.execCommand("createLink", false, finalUrl);

      // Enhance links with target="_blank" and rel="noopener noreferrer"
      const links = editorRef.current.querySelectorAll("a");
      links.forEach((a) => {
        if (!a.getAttribute("target") && a.getAttribute("href")?.startsWith("http")) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        }
        a.className = "text-[#0066CC] underline hover:text-blue-700 transition-colors font-medium";
      });

      onChange(editorRef.current.innerHTML);
    }

    setShowLinkPopover(false);
    setLinkUrl("");
  };

  const handleRemoveLink = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    restoreSelection(savedSelectionRef.current);
    document.execCommand("unlink", false);
    onChange(editorRef.current.innerHTML);
    setShowLinkPopover(false);
    setLinkUrl("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Ctrl+K or Cmd+K to open hyperlink dialog
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      handleOpenLinkPopover();
      return;
    }

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

      // Check if entire blockquote is empty (e.g. 2nd enter in an empty quote line)
      if (isEmptyElement(blockquote)) {
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

      // Check if cursor is in an empty child block inside blockquote
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

      if (childBlock && isEmptyElement(childBlock)) {
        e.preventDefault();
        childBlock.remove();

        const p = document.createElement("p");
        p.innerHTML = "<br>";

        if (blockquote.nextSibling) {
          blockquote.parentNode?.insertBefore(p, blockquote.nextSibling);
        } else {
          blockquote.parentNode?.appendChild(p);
        }

        if (isEmptyElement(blockquote)) {
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

      if (blockquote && isEmptyElement(blockquote)) {
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
      className={`border border-slate-200 rounded-[4px] overflow-hidden bg-white focus-within:border-[#0066CC] focus-within:ring-1 focus-within:ring-[#0066CC] transition-all relative ${className}`}
    >
      {/* Editor Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex flex-wrap items-center gap-1 text-[#0A2540] relative">
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
          title="Quote Block"
          aria-label="Quote"
        >
          <QuoteIcon className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-4 bg-slate-200 mx-1" />

        {/* Hyperlink Tool Button */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            handleOpenLinkPopover();
          }}
          className="p-1.5 hover:bg-white hover:text-[#0066CC] rounded-[4px] text-xs transition-colors flex items-center gap-1"
          title="Add / Edit Hyperlink (Ctrl+K)"
          aria-label="Add Hyperlink"
        >
          <LinkIcon className="w-3.5 h-3.5 text-[#0066CC]" />
        </button>

        {/* Floating Link Popover */}
        {showLinkPopover && (
          <div className="absolute left-3 top-full mt-1.5 p-3 bg-white border border-slate-200 rounded-[4px] shadow-xl z-30 w-80 space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#0A2540] flex items-center gap-1.5">
                <LinkIcon className="w-3 h-3 text-[#0066CC]" />
                <span>{isInsideLink ? "Edit Hyperlink" : "Insert Hyperlink"}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowLinkPopover(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500 block">
                Destination URL (e.g. https://... or mailto:...)
              </label>
              <input
                type="text"
                autoFocus
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleApplyLink();
                  } else if (e.key === "Escape") {
                    setShowLinkPopover(false);
                  }
                }}
                placeholder="https://example.com"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#0066CC] font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-1 gap-2">
              <button
                type="button"
                onClick={handleRemoveLink}
                className="px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 rounded-[4px] font-medium transition-colors flex items-center gap-1"
                title="Remove link from selection"
              >
                <Unlink className="w-3 h-3" />
                <span>Unlink</span>
              </button>

              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={() => setShowLinkPopover(false)}
                  className="px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-100 rounded-[4px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyLink}
                  className="px-3 py-1 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-bold rounded-[4px] shadow-sm flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Apply</span>
                </button>
              </div>
            </div>
          </div>
        )}
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
        className="w-full px-3.5 py-2.5 bg-slate-50/40 text-xs text-[#0A2540] focus:bg-white focus:outline-none leading-relaxed transition-colors relative before:content-[attr(data-placeholder)] before:text-slate-400 before:pointer-events-none empty:before:inline-block [&:not(:empty)]:before:hidden [&_blockquote]:border-l-4 [&_blockquote]:border-[#0066CC] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-2 [&_blockquote]:bg-slate-50/80 [&_blockquote]:py-1 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-1.5 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-1.5 [&_a]:text-[#0066CC] [&_a]:underline [&_a]:hover:text-blue-700"
      />
    </div>
  );
}
