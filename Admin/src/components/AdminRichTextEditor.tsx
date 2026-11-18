"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Palette,
  Highlighter,
  ChevronDown,
  Link as LinkIcon,
  Unlink,
  Check,
  X,
} from "lucide-react";

interface AdminRichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const DEFAULT_FONT_COLORS = [
  "#000000",
  "#0A2540",
  "#0066CC",
  "#2563EB",
  "#DC2626",
  "#16A34A",
  "#D97706",
  "#7C3AED",
  "#475569",
  "#FFFFFF",
];

const DEFAULT_BG_COLORS = [
  "transparent",
  "#FEF08A", // soft yellow
  "#BAE6FD", // soft blue
  "#BBF7D0", // soft green
  "#FED7AA", // soft orange
  "#FBCFE8", // soft pink
  "#E2E8F0", // soft gray
  "#FEE2E2", // soft red
  "#DDD6FE", // soft purple
  "#0A2540", // dark navy
];

const FONT_SIZES = [
  { label: "Small (12px)", value: "1", px: "12px" },
  { label: "Normal (14px)", value: "3", px: "14px" },
  { label: "Medium (16px)", value: "4", px: "16px" },
  { label: "Large (20px)", value: "5", px: "20px" },
  { label: "Extra Large (24px)", value: "6", px: "24px" },
];

export default function AdminRichTextEditor({
  value,
  onChange,
  placeholder = "Write product specifications, technical details, material descriptions...",
  minHeight = "220px",
}: AdminRichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isInsideLink, setIsInsideLink] = useState(false);
  const [customTextColor, setCustomTextColor] = useState("#0066CC");
  const [customBgColor, setCustomBgColor] = useState("#FEF08A");
  const savedSelectionRef = useRef<Range | null>(null);

  // Active formatting state for toolbar highlights
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    unorderedList: false,
    orderedList: false,
    blockquote: false,
    link: false,
    fontSize: "3",
  });

  const checkActiveStyles = React.useCallback(() => {
    if (typeof document === "undefined" || !editorRef.current) return;
    const sel = window.getSelection();
    if (!sel || !sel.anchorNode) return;

    // Verify selection is within our editor canvas
    if (!editorRef.current.contains(sel.anchorNode)) return;

    try {
      const isBold = document.queryCommandState("bold");
      const isItalic = document.queryCommandState("italic");
      const isUnderline = document.queryCommandState("underline");
      const isUnordered = document.queryCommandState("insertUnorderedList");
      const isOrdered = document.queryCommandState("insertOrderedList");
      const currentFontSize = document.queryCommandValue("fontSize") || "3";

      let isBlockquote = false;
      let isLink = false;
      let node: Node | null = sel.anchorNode;
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tag = (node as HTMLElement).tagName.toLowerCase();
          if (tag === "blockquote") isBlockquote = true;
          if (tag === "a") isLink = true;
        }
        node = node.parentNode;
      }

      setActiveStyles({
        bold: isBold,
        italic: isItalic,
        underline: isUnderline,
        unorderedList: isUnordered,
        orderedList: isOrdered,
        blockquote: isBlockquote,
        link: isLink,
        fontSize: currentFontSize,
      });
    } catch {}
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      checkActiveStyles();
    };
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [checkActiveStyles]);

  // Keep editor content in sync with external value
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      if (!value) {
        editorRef.current.innerHTML = "";
      } else if (editorRef.current.innerHTML === "") {
        editorRef.current.innerHTML = value;
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

  const exec = (command: string, arg: string | undefined = undefined) => {
    if (typeof document !== "undefined" && editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, arg);
      onChange(editorRef.current.innerHTML);
      setTimeout(checkActiveStyles, 10);
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeVal = e.target.value;
    exec("fontSize", sizeVal);
  };

  const applyTextColor = (color: string) => {
    exec("foreColor", color);
    setShowTextColorPicker(false);
  };

  const applyBgColor = (color: string) => {
    try {
      exec("hiliteColor", color);
    } catch {
      exec("backColor", color);
    }
    setShowBgColorPicker(false);
  };

  const isEmptyElement = (el: HTMLElement) => {
    const text = (el.textContent || el.innerText || "").replace(
      /[\u200B\uFEFF\n\r\s\u00A0]/g,
      ""
    );
    const hasMedia = !!el.querySelector("img, video, iframe");
    return text === "" && !hasMedia;
  };

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
    const existing = findParentLink();
    if (existing) {
      setLinkUrl(existing.getAttribute("href") || "");
      setIsInsideLink(true);
    } else {
      setLinkUrl("");
      setIsInsideLink(false);
    }
    setShowLinkPopover(true);
    setShowTextColorPicker(false);
    setShowBgColorPicker(false);
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

  return (
    <div className="border border-slate-200 rounded-[4px] overflow-hidden bg-white shadow-sm focus-within:border-[#0066CC] focus-within:ring-1 focus-within:ring-[#0066CC] transition-all relative">
      {/* Top Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center gap-1.5 text-[#0A2540] relative">
        {/* Font Size Selector */}
        <div className="relative">
          <select
            onChange={handleFontSizeChange}
            defaultValue="3"
            className="text-xs bg-white border border-slate-200 rounded-[4px] px-2 py-1 pr-6 font-medium text-[#0A2540] hover:border-slate-300 focus:outline-none focus:border-[#0066CC] appearance-none cursor-pointer"
            title="Font Size"
          >
            {FONT_SIZES.map((fs) => (
              <option key={fs.value} value={fs.value}>
                {fs.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <span className="w-px h-5 bg-slate-200 mx-1" />

        {/* Bold, Italic, Underline */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("bold");
          }}
          className={`p-1.5 rounded-[4px] transition-all ${
            activeStyles.bold
              ? "bg-[#0066CC] text-white shadow-xs font-bold"
              : "text-slate-600 hover:bg-slate-200 hover:text-[#0066CC]"
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("italic");
          }}
          className={`p-1.5 rounded-[4px] transition-all ${
            activeStyles.italic
              ? "bg-[#0066CC] text-white shadow-xs font-bold"
              : "text-slate-600 hover:bg-slate-200 hover:text-[#0066CC]"
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("underline");
          }}
          className={`p-1.5 rounded-[4px] transition-all ${
            activeStyles.underline
              ? "bg-[#0066CC] text-white shadow-xs font-bold"
              : "text-slate-600 hover:bg-slate-200 hover:text-[#0066CC]"
          }`}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-5 bg-slate-200 mx-1" />

        {/* Lists & Quote */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("insertUnorderedList");
          }}
          className={`p-1.5 rounded-[4px] transition-all ${
            activeStyles.unorderedList
              ? "bg-[#0066CC] text-white shadow-xs font-bold"
              : "text-slate-600 hover:bg-slate-200 hover:text-[#0066CC]"
          }`}
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("insertOrderedList");
          }}
          className={`p-1.5 rounded-[4px] transition-all ${
            activeStyles.orderedList
              ? "bg-[#0066CC] text-white shadow-xs font-bold"
              : "text-slate-600 hover:bg-slate-200 hover:text-[#0066CC]"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            exec("formatBlock", "<blockquote>");
          }}
          className={`p-1.5 rounded-[4px] transition-all ${
            activeStyles.blockquote
              ? "bg-[#0066CC] text-white shadow-xs font-bold"
              : "text-slate-600 hover:bg-slate-200 hover:text-[#0066CC]"
          }`}
          title="Quote Block"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-5 bg-slate-200 mx-1" />

        {/* Hyperlink Tool Button */}
        <div className="relative">
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              handleOpenLinkPopover();
            }}
            className={`p-1.5 rounded-[4px] transition-all ${
              activeStyles.link
                ? "bg-[#0066CC] text-white shadow-xs font-bold"
                : "text-slate-600 hover:bg-slate-200 hover:text-[#0066CC]"
            }`}
            title="Add / Edit Hyperlink (Ctrl+K)"
          >
            <LinkIcon className={`w-3.5 h-3.5 ${activeStyles.link ? "text-white" : "text-[#0066CC]"}`} />
          </button>

          {/* Floating Link Popover */}
          {showLinkPopover && (
            <div className="absolute left-0 top-full mt-1.5 p-3 bg-white border border-slate-200 rounded-[4px] shadow-xl z-30 w-80 space-y-2">
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

        <span className="w-px h-5 bg-slate-200 mx-1" />

        {/* Text Color Picker Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowTextColorPicker(!showTextColorPicker);
              setShowBgColorPicker(false);
            }}
            className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-[4px] text-xs font-medium transition-colors"
            title="Text Font Color"
          >
            <Palette className="w-3.5 h-3.5 text-[#0066CC]" />
            <span>Color</span>
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </button>

          {showTextColorPicker && (
            <div className="absolute left-0 top-full mt-1.5 p-3 bg-white border border-slate-200 rounded-[4px] shadow-xl z-30 w-52 space-y-2.5">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                Preset Colors
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {DEFAULT_FONT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyTextColor(color);
                    }}
                    style={{ backgroundColor: color }}
                    className="w-7 h-7 rounded-[4px] border border-slate-300 shadow-sm hover:scale-110 transition-transform"
                    title={color}
                  />
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">
                  Custom Color Picker
                </span>
                <div className="flex items-center gap-2">
                  <label
                    className="w-8 h-8 shrink-0 rounded-[4px] border-2 border-slate-300 shadow-xs cursor-pointer overflow-hidden flex items-center justify-center relative hover:border-[#0066CC] transition-colors"
                    style={{ backgroundColor: customTextColor }}
                    title="Pick custom font color"
                  >
                    <input
                      type="color"
                      value={customTextColor}
                      onChange={(e) => setCustomTextColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                  <input
                    type="text"
                    value={customTextColor}
                    onChange={(e) => setCustomTextColor(e.target.value)}
                    className="flex-1 h-8 px-2 text-xs border border-slate-200 rounded-[4px] font-mono uppercase focus:outline-none focus:border-[#0066CC]"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyTextColor(customTextColor);
                    }}
                    className="h-8 px-2.5 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-bold rounded-[4px] transition-colors cursor-pointer"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Text Background (Highlight) Color Picker Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowBgColorPicker(!showBgColorPicker);
              setShowTextColorPicker(false);
            }}
            className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 hover:border-slate-300 rounded-[4px] text-xs font-medium transition-colors"
            title="Text Background Highlight"
          >
            <Highlighter className="w-3.5 h-3.5 text-amber-500" />
            <span>Highlight</span>
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </button>

          {showBgColorPicker && (
            <div className="absolute left-0 top-full mt-1.5 p-3 bg-white border border-slate-200 rounded-[4px] shadow-xl z-30 w-52 space-y-2.5">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                Highlight Colors
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {DEFAULT_BG_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyBgColor(color);
                    }}
                    style={{ backgroundColor: color === "transparent" ? "#ffffff" : color }}
                    className="w-7 h-7 rounded-[4px] border border-slate-300 shadow-sm hover:scale-110 transition-transform relative"
                    title={color === "transparent" ? "Clear Highlight" : color}
                  >
                    {color === "transparent" && (
                      <span className="text-red-500 text-[10px] font-bold block">X</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">
                  Custom Highlight Picker
                </span>
                <div className="flex items-center gap-2">
                  <label
                    className="w-8 h-8 shrink-0 rounded-[4px] border-2 border-slate-300 shadow-xs cursor-pointer overflow-hidden flex items-center justify-center relative hover:border-[#0066CC] transition-colors"
                    style={{ backgroundColor: customBgColor }}
                    title="Pick custom highlight color"
                  >
                    <input
                      type="color"
                      value={customBgColor}
                      onChange={(e) => setCustomBgColor(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                  </label>
                  <input
                    type="text"
                    value={customBgColor}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="flex-1 h-8 px-2 text-xs border border-slate-200 rounded-[4px] font-mono uppercase focus:outline-none focus:border-[#0066CC]"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyBgColor(customBgColor);
                    }}
                    className="h-8 px-2.5 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-bold rounded-[4px] transition-colors cursor-pointer"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editable Canvas */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          onChange(e.currentTarget.innerHTML);
          checkActiveStyles();
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={checkActiveStyles}
        onMouseUp={checkActiveStyles}
        onFocus={checkActiveStyles}
        onClick={checkActiveStyles}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="w-full p-4 bg-white text-xs text-[#0A2540] focus:outline-none leading-relaxed relative before:content-[attr(data-placeholder)] before:text-slate-400 before:pointer-events-none empty:before:inline-block [&:not(:empty)]:before:hidden [&_h1]:text-2xl [&_h1]:font-black [&_h1]:my-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-1.5 [&_h4]:text-base [&_h4]:font-bold [&_h4]:my-1 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#0066CC] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-slate-50 [&_blockquote]:py-1 [&_a]:text-[#0066CC] [&_a]:underline [&_a]:hover:text-blue-700"
      />
    </div>
  );
}
