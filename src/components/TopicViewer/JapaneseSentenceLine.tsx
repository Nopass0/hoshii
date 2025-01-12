import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LineType } from "@/types";

type JapaneseSentenceLineProps = {
  line: LineType;
};

const JapaneseSentenceLine: React.FC<JapaneseSentenceLineProps> = ({
  line,
}) => {
  if (line.type !== "japaneseSentence") return null;

  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const getUnderlineColor = (type: string) => {
    switch (type) {
      case "subject":
        return "border-red-500";
      case "object":
        return "border-blue-500";
      case "verb":
        return "border-green-500";
      case "particle":
        return "border-yellow-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <motion.div
      className={`flex flex-wrap gap-1 ${line.backgroundColor ? `bg-${line.backgroundColor}` : ""}`}
      style={{
        padding: line.padding || "0",
        marginBottom: line.marginBottom || "0",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {line.words.map((word, index) => (
        <Popover key={index}>
          <PopoverTrigger>
            <motion.span
              className={`cursor-pointer border-b-2 ${getUnderlineColor(word.type)}`}
              onMouseEnter={() => setHoveredWord(word.japanese)}
              onMouseLeave={() => setHoveredWord(null)}
              animate={{
                backgroundColor:
                  hoveredWord === word.japanese
                    ? "rgba(255, 0, 0, 0.1)"
                    : "transparent",
              }}
            >
              {word.japanese}
            </motion.span>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <p>
                <strong>Перевод:</strong> {word.translation}
              </p>
              <p>
                <strong>Хирагана:</strong> {word.hiragana}
              </p>
              <p>
                <strong>Ромадзи:</strong> {word.romaji}
              </p>
              {word.examples && (
                <div>
                  <strong>Примеры:</strong>
                  <ul>
                    {word.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              {word.forms && (
                <div>
                  <strong>Формы:</strong>
                  <ul>
                    {Object.entries(word.forms).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </motion.div>
  );
};

export default JapaneseSentenceLine;
