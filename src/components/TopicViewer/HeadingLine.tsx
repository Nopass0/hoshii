import React from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";

type HeadingLineProps = {
  line: LineType;
};

const HeadingLine: React.FC<HeadingLineProps> = ({ line }) => {
  if (!["h2", "h3", "h4", "h5"].includes(line.type)) return null;

  const HeadingTag = line.type as keyof JSX.IntrinsicElements;

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
      <HeadingTag
        className={`font-bold ${line.type === "h2" ? "text-2xl" : line.type === "h3" ? "text-xl" : line.type === "h4" ? "text-lg" : "text-base"}`}
      >
        {line.text}
      </HeadingTag>
    </motion.div>
  );
};

export default HeadingLine;
