import React from "react";
import { motion } from "framer-motion";
import { marked } from "marked";
import { LineType } from "@/types";

type MarkdownLineProps = {
  line: LineType;
};

const MarkdownLine: React.FC<MarkdownLineProps> = ({ line }) => (
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
    {line.type === "markdown" && (
      <div
        className="markdown"
        dangerouslySetInnerHTML={{
          __html: marked(line.markdown || ""),
        }}
      />
    )}
  </motion.div>
);

export default MarkdownLine;
