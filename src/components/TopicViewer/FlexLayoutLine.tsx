import React from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";
import TextLine from "./TextLine";
import ImageLine from "./ImageLine";
import TableLine from "./TableLine";

type FlexLayoutLineProps = {
  line: LineType;
};

const FlexLayoutLine: React.FC<FlexLayoutLineProps> = ({ line }) => {
  if (line.type !== "flexLayout") return null;

  const renderItem = (item: LineType, index: number) => {
    switch (item.type) {
      case "text":
      case "hidden":
        return <TextLine key={index} line={item} />;
      case "image":
        return <ImageLine key={index} line={item} />;
      case "tables":
        return <TableLine key={index} line={item} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`flex ${line.direction === "column" ? "flex-col" : "flex-row"} gap-4 ${
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
      {line.items.map((item, index) => renderItem(item, index))}
    </motion.div>
  );
};

export default FlexLayoutLine;
