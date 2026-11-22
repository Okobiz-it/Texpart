import React from "react";

interface RichTextContentProps {
  content?: string | null;
  className?: string;
  fallbackText?: string;
}

export default function RichTextContent({
  content,
  className = "",
  fallbackText = "No content available.",
}: RichTextContentProps) {
  if (!content || !content.trim()) {
    return <span className="text-slate-400 italic">{fallbackText}</span>;
  }

  const hasHtml = /<[a-z][\s\S]*>/i.test(content);

  if (hasHtml) {
    return (
      <div
        className={`rich-text-preview text-slate-700 leading-relaxed break-words
          [&_h1]:text-2xl [&_h1]:font-black [&_h1]:text-[#0A2540] [&_h1]:my-3
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#0A2540] [&_h2]:my-2.5
          [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[#0A2540] [&_h3]:my-2
          [&_h4]:text-base [&_h4]:font-bold [&_h4]:text-[#0A2540] [&_h4]:my-1.5
          [&_p]:my-2 [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2 [&_ul]:space-y-1
          [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2 [&_ol]:space-y-1
          [&_li]:leading-relaxed
          [&_blockquote]:border-l-4 [&_blockquote]:border-[#0066CC] [&_blockquote]:pl-3.5 [&_blockquote]:italic [&_blockquote]:my-3 [&_blockquote]:bg-slate-50 [&_blockquote]:py-1.5 [&_blockquote]:rounded-r
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
    <div className={`whitespace-pre-wrap leading-relaxed text-slate-700 break-words ${className}`}>
      {content}
    </div>
  );
}
