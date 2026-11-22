"use client";

import React, { useRef, useState, useEffect } from "react";
import { ActiveStyles } from "./editor/editorConstants";
import EditorToolbar from "./editor/EditorToolbar";

interface AdminRichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

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
      <EditorToolbar
        activeStyles={activeStyles}
        exec={exec}
        handleFontSizeChange={handleFontSizeChange}
        showTextColorPicker={showTextColorPicker}
        setShowTextColorPicker={setShowTextColorPicker}
        showBgColorPicker={showBgColorPicker}
        setShowBgColorPicker={setShowBgColorPicker}
        showLinkPopover={showLinkPopover}
        setShowLinkPopover={setShowLinkPopover}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        isInsideLink={isInsideLink}
        handleOpenLinkPopover={handleOpenLinkPopover}
        handleApplyLink={handleApplyLink}
        handleRemoveLink={handleRemoveLink}
        customTextColor={customTextColor}
        setCustomTextColor={setCustomTextColor}
        customBgColor={customBgColor}
        setCustomBgColor={setCustomBgColor}
        applyTextColor={applyTextColor}
        applyBgColor={applyBgColor}
      />

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
