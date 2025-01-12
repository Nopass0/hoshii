import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { LineType } from "@/types";

type MarkdownLineProps = {
  line: LineType;
};

const MarkdownLine: React.FC<MarkdownLineProps> = ({ line }) => {
  if (line.type !== "markdown") return null;

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
      <ReactMarkdown
        components={{
          strong: ({ node, ...props }) => (
            <span className="text-red-500 font-bold" {...props} />
          ),
          em: ({ node, ...props }) => (
            <span className="text-blue-500 italic" {...props} />
          ),
        }}
      >
        {line.markdown}
      </ReactMarkdown>
    </motion.div>
  );
};

export default MarkdownLine;
