import React from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";

type QuoteLineProps = {
  line: LineType;
};

const QuoteLine: React.FC<QuoteLineProps> = ({ line }) => {
  if (line.type !== "quote") return null;

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
      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 dark:text-gray-300">
        {line.text}
      </blockquote>
    </motion.div>
  );
};

export default QuoteLine;
