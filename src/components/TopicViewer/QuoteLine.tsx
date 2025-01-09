import React from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";

type QuoteLineProps = {
  line: LineType;
};

const QuoteLine: React.FC<QuoteLineProps> = ({ line }) => (
  <motion.div
    className={`flex flex-col  gap-2 ${line.backgroundColor ? `bg-${line.backgroundColor}` : ""}`}
    style={{
      padding: line.padding || "0",
      color: line.color || "inherit",
      marginBottom: line.marginBottom || "0",
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {line.type === "quote" && (
      <blockquote className="border-l-4 py-2 border-primary pl-4 text-sidebar-accent-foreground dark:text-sidebar-primary-foreground italic">
        {line.text}
      </blockquote>
    )}
  </motion.div>
);

export default QuoteLine;
