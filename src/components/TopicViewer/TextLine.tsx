import React, { useState } from "react";
import { motion } from "framer-motion";
import { marked } from "marked";
import { LineType } from "@/types";

type TextLineProps = {
  line: LineType;
};

const TextLine: React.FC<TextLineProps> = ({ line }) => {
  const [showFullText, setShowFullText] = useState(false);

  // Custom renderer for marked to style *text* as red
  const renderer = new marked.Renderer();
  renderer.em = ({ tokens }: marked.Tokens.Em) =>
    `<em style="color: red;">${tokens.join("")}</em>`;
  renderer.strong = ({ tokens }: marked.Tokens.Strong) =>
    `<strong style="color: red;">${tokens.join("")}</strong>`;

  return (
    <motion.div
      className={`flex flex-col gap-2 ${line.backgroundColor ? `bg-${line.backgroundColor}` : ""}`}
      style={{
        padding: line.padding || "0",
        color: line.color || "inherit",
        marginBottom: line.marginBottom || "0",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {line.type === "hidden" && (
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowFullText(!showFullText);
          }}
        >
          <div
            className={`markdown ${line.alignment || "center"}`}
            dangerouslySetInnerHTML={{
              __html: marked(showFullText ? line.fullText : line.text || "", {
                renderer,
              }),
            }}
            style={{ textAlign: line.alignment || "center" }}
          />
        </div>
      )}
      {line.type === "text" && (
        <div
          className={`markdown ${line.alignment || "center"}`}
          dangerouslySetInnerHTML={{
            __html: marked(line.text || "", { renderer }),
          }}
          style={{ textAlign: line.alignment || "center" }}
        />
      )}
    </motion.div>
  );
};

export default TextLine;
