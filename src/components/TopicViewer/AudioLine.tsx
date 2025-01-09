import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LineType } from "@/types";

type AudioLineProps = {
  line: LineType;
};

const AudioLine: React.FC<AudioLineProps> = ({ line }) => (
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
    {line.type === "audio" && (
      <div className="rounded-md border p-4 flex items-center">
        <audio controls className="w-full">
          <source src={line.src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        {line.caption && <span className="text-sm ml-2">{line.caption}</span>}
      </div>
    )}
  </motion.div>
);

export default AudioLine;
