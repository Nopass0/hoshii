import React from "react";
import { motion } from "framer-motion";
import { LineType } from "@/types";

type ListLineProps = {
  line: LineType;
};

const ListLine: React.FC<ListLineProps> = ({ line }) => (
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
    {line.type === "numerical" && (
      <ol className="pl-6">
        {line.items.map((item: string, itemIndex: number) => (
          <div key={itemIndex} className="flex flex-row gap-1">
            <li
              key={itemIndex}
              className=" w-4 float-right text-sidebar-foreground/50"
            >
              {itemIndex + 1}.
            </li>
            <li className="" key={itemIndex}>
              {item}
            </li>
          </div>
        ))}
      </ol>
    )}
    {line.type === "bulleted" && (
      <ul className="pl-6">
        {line.items.map((item: string, itemIndex: number) => (
          <div key={itemIndex} className="flex flex-row gap-1">
            <li
              key={itemIndex}
              className=" w-4 float-right text-sidebar-foreground/50"
            >
              {/* bullet char */}•
            </li>
            <li className="" key={itemIndex}>
              {item}
            </li>
          </div>
        ))}
      </ul>
    )}
  </motion.div>
);

export default ListLine;
