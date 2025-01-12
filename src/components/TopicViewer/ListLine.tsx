import React from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";

type ListLineProps = {
  line: LineType;
};

const ListLine: React.FC<ListLineProps> = ({ line }) => {
  if (line.type !== "numerical" && line.type !== "bulleted") return null;

  const ListTag = line.type === "numerical" ? "ol" : "ul";

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
      <ListTag
        className={line.type === "numerical" ? "list-decimal" : "list-disc"}
      >
        {line.items.map((item, index) => (
          <li key={index} className="ml-6">
            {item}
          </li>
        ))}
      </ListTag>
    </motion.div>
  );
};

export default ListLine;
