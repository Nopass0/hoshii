import React from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";

type HeadingLineProps = {
  line: LineType;
};

const HeadingLine: React.FC<HeadingLineProps> = ({ line }) => (
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
    {line.type === "h2" && <h2 className="text-2xl font-bold">{line.text}</h2>}
    {line.type === "h3" && <h3 className="text-xl font-bold">{line.text}</h3>}
    {line.type === "h4" && <h4 className="text-lg font-bold">{line.text}</h4>}
    {line.type === "h5" && <h5 className="text-base font-bold">{line.text}</h5>}
  </motion.div>
);

export default HeadingLine;
