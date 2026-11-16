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
  Heading,
  Type,
  ChevronDown,
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
  { label: "Huge (32px)", value: "7", px: "32px" },
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
  const [customTextColor, setCustomTextColor] = useState("#0066CC");
  const [customBgColor, setCustomBgColor] = useState("#FEF08A");

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
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      return sel.getRangeAt(0);
    }
    return null;
  };

  const restoreSelection = (range: Range | null) => {
    if (range) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  const exec = (command: string, arg: string | undefined = undefined) => {
    if (typeof document !== "undefined" && editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, arg);
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const format = e.target.value;
    if (format === "p") {
      exec("formatBlock", "<p>");
    } else {
      exec("formatBlock", `<${format}>`);
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
    // Try hiliteColor then backColor for cross-browser support
    try {
      exec("hiliteColor", color);
    } catch {
      exec("backColor", color);
    }
    setShowBgColorPicker(false);
  };

  return (
    <div className="border border-slate-200 rounded-[4px] overflow-hidden bg-white shadow-sm focus-within:border-[#0066CC] focus-within:ring-1 focus-within:ring-[#0066CC] transition-all">
      {/* Top Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center gap-1.5 text-[#0A2540]">
        {/* Headings Selector */}
        <div className="relative">
          <select
            onChange={handleHeadingChange}
            defaultValue="p"
            className="text-xs bg-white border border-slate-200 rounded-[4px] px-2 py-1 pr-6 font-medium text-[#0A2540] hover:border-slate-300 focus:outline-none focus:border-[#0066CC] appearance-none cursor-pointer"
            title="Heading Level"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

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
          className="p-1.5 hover:bg-slate-200 hover:text-[#0066CC] rounded-[4px] transition-colors"
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
          className="p-1.5 hover:bg-slate-200 hover:text-[#0066CC] rounded-[4px] transition-colors"
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
          className="p-1.5 hover:bg-slate-200 hover:text-[#0066CC] rounded-[4px] transition-colors"
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
          className="p-1.5 hover:bg-slate-200 hover:text-[#0066CC] rounded-[4px] transition-colors"
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
          className="p-1.5 hover:bg-slate-200 hover:text-[#0066CC] rounded-[4px] transition-colors"
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
          className="p-1.5 hover:bg-slate-200 hover:text-[#0066CC] rounded-[4px] transition-colors"
          title="Quote Block"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

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
                    className="w-7 h-7 rounded-[3px] border border-slate-300 shadow-sm hover:scale-110 transition-transform"
                    title={color}
                  />
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1">
                  Custom Color Picker
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customTextColor}
                    onChange={(e) => setCustomTextColor(e.target.value)}
                    className="w-8 h-8 rounded-[3px] cursor-pointer border border-slate-200 p-0.5"
                  />
                  <input
                    type="text"
                    value={customTextColor}
                    onChange={(e) => setCustomTextColor(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded-[3px] font-mono uppercase"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyTextColor(customTextColor);
                    }}
                    className="px-2.5 py-1 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-bold rounded-[3px]"
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
                    className="w-7 h-7 rounded-[3px] border border-slate-300 shadow-sm hover:scale-110 transition-transform relative"
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
                  <input
                    type="color"
                    value={customBgColor}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="w-8 h-8 rounded-[3px] cursor-pointer border border-slate-200 p-0.5"
                  />
                  <input
                    type="text"
                    value={customBgColor}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded-[3px] font-mono uppercase"
                  />
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      applyBgColor(customBgColor);
                    }}
                    className="px-2.5 py-1 bg-[#0066CC] hover:bg-[#0052CC] text-white text-xs font-bold rounded-[3px]"
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
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="w-full p-4 bg-white text-xs text-[#0A2540] focus:outline-none leading-relaxed relative before:content-[attr(data-placeholder)] before:text-slate-400 before:pointer-events-none empty:before:inline-block [&:not(:empty)]:before:hidden [&_h1]:text-2xl [&_h1]:font-black [&_h1]:my-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:my-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:my-1.5 [&_h4]:text-base [&_h4]:font-bold [&_h4]:my-1 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#0066CC] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-slate-50 [&_blockquote]:py-1"
      />
    </div>
  );
}
