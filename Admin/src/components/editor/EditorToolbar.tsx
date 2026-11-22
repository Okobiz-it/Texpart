"use client";

import React from "react";
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
import {
  DEFAULT_FONT_COLORS,
  DEFAULT_BG_COLORS,
  FONT_SIZES,
  ActiveStyles,
} from "./editorConstants";

interface EditorToolbarProps {
  activeStyles: ActiveStyles;
  exec: (cmd: string, val?: string) => void;
  handleFontSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  showTextColorPicker: boolean;
  setShowTextColorPicker: (val: boolean) => void;
  showBgColorPicker: boolean;
  setShowBgColorPicker: (val: boolean) => void;
  showLinkPopover: boolean;
  setShowLinkPopover: (val: boolean) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  isInsideLink: boolean;
  handleOpenLinkPopover: () => void;
  handleApplyLink: () => void;
  handleRemoveLink: () => void;
  customTextColor: string;
  setCustomTextColor: (color: string) => void;
  customBgColor: string;
  setCustomBgColor: (color: string) => void;
  applyTextColor: (color: string) => void;
  applyBgColor: (color: string) => void;
}

export default function EditorToolbar({
  activeStyles,
  exec,
  handleFontSizeChange,
  showTextColorPicker,
  setShowTextColorPicker,
  showBgColorPicker,
  setShowBgColorPicker,
  showLinkPopover,
  setShowLinkPopover,
  linkUrl,
  setLinkUrl,
  isInsideLink,
  handleOpenLinkPopover,
  handleApplyLink,
  handleRemoveLink,
  customTextColor,
  setCustomTextColor,
  customBgColor,
  setCustomBgColor,
  applyTextColor,
  applyBgColor,
}: EditorToolbarProps) {
  return (
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
  );
}
