import React from "react";

interface RichTextContentProps {
  content?: string | null;
  className?: string;
  fallbackText?: string;
}

export default function RichTextContent({
  content,
  className = "",
  fallbackText = "No message content provided.",
}: RichTextContentProps) {
  if (!content || !content.trim()) {
    return <span className="text-slate-400 italic">{fallbackText}</span>;
  }

  const hasHtml = /<[a-z][\s\S]*>/i.test(content);

  if (hasHtml) {
    return (
      <div
        className={`rich-text-preview text-slate-800 leading-relaxed break-words
          [&_h1]:text-xl [&_h1]:font-black [&_h1]:text-[#0A2540] [&_h1]:my-2
          [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#0A2540] [&_h2]:my-2
          [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-[#0A2540] [&_h3]:my-1.5
          [&_h4]:text-sm [&_h4]:font-bold [&_h4]:text-[#0A2540] [&_h4]:my-1
          [&_p]:my-1.5 [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:my-2 [&_ul]:space-y-1
          [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:my-2 [&_ol]:space-y-1
          [&_li]:leading-relaxed
          [&_blockquote]:border-l-4 [&_blockquote]:border-[#0066CC] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:my-2 [&_blockquote]:bg-slate-100/70 [&_blockquote]:py-1 [&_blockquote]:rounded-r
          [&_strong]:font-bold [&_strong]:text-[#0A2540]
          [&_b]:font-bold [&_b]:text-[#0A2540]
          [&_em]:italic
          [&_u]:underline
          [&_a]:text-[#0066CC] [&_a]:underline [&_a]:hover:text-[#0052CC]
          ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div className={`whitespace-pre-wrap leading-relaxed text-slate-800 break-words ${className}`}>
      {content}
    </div>
  );
}
