import React from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { LineType } from "@/types";

type SeparatorLineProps = {
  line: LineType;
};

const SeparatorLine: React.FC<SeparatorLineProps> = ({ line }) => {
  if (line.type !== "separator") return null;

  return (
    <motion.div
      className={`${line.backgroundColor ? `bg-${line.backgroundColor}` : ""}`}
      style={{
        padding: line.padding || "0",
        marginBottom: line.marginBottom || "0",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Separator
        className={line.orientation === "vertical" ? "h-full" : "w-full"}
        orientation={line.orientation}
      />
    </motion.div>
  );
};

export default SeparatorLine;
