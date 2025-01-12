import React, { useState } from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";

type TextLineProps = {
  line: LineType;
};

const TextLine: React.FC<TextLineProps> = ({ line }) => {
  const [showFullText, setShowFullText] = useState(false);

  if (line.type !== "text" && line.type !== "hidden") return null;

  const renderMarkdown = (text: string) => {
    return text.replace(
      /(\*\*|__)(.*?)\1|(\*|_)(.*?)\3/g,
      (match, p1, p2, p3, p4) => {
        if (p1) {
          return `<span class="text-red-500 font-bold">${p2}</span>`;
        } else {
          return `<span class="text-blue-500 italic">${p4}</span>`;
        }
      },
    );
  };

  const content =
    line.type === "hidden" && !showFullText
      ? line.text
      : line.type === "hidden"
        ? line.fullText
        : line.text;

  return (
    <motion.div
      className={`flex flex-col gap-2 ${
        line.backgroundColor ? `bg-${line.backgroundColor}` : ""
      }`}
      style={{
        padding: line.padding || "0",
        color: line.color || "inherit",
        marginBottom: line.marginBottom || "0",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`markdown ${line.alignment || "text-left"}`}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content || "") }}
        onClick={() => {
          if (line.type === "hidden") {
            setShowFullText(!showFullText);
          }
        }}
        style={{ cursor: line.type === "hidden" ? "pointer" : "default" }}
      />
    </motion.div>
  );
};

export default TextLine;
