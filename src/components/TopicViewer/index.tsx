import React, { useState } from "react";
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import TextLine from "./TextLine";
import TableLine from "./TableLine";
import ImageLine from "./ImageLine";
import CarouselLine from "./CarouselLine";
import MarkdownLine from "./MarkdownLine";
import HeadingLine from "./HeadingLine";
import ListLine from "./ListLine";
import QuoteLine from "./QuoteLine";
import CodeLine from "./CodeLine";
import AudioLine from "./AudioLine";
import TestLine from "./TestLine";
import SeparatorLine from "./SeparatorLine";
import FlexLayoutLine from "./FlexLayoutLine";
import CardLine from "./CardLine";
import JapaneseSentenceLine from "./JapaneseSentenceLine";
import { LineType, validateLines } from "@/types";
import EditableLineWrapper from "./EditableLineWrapper";
import { ScrollArea } from "../ui/scroll-area";

type TopicViewerProps = {
  lines: LineType[];
  cover?: string;
  title: string;
  isEditable?: boolean;
};

const TopicViewer: React.FC<TopicViewerProps> = ({
  lines,
  cover,
  title,
  isEditable = false,
}) => {
  const [editableLines, setEditableLines] = useState<LineType[]>(lines);
  const validatedLines = validateLines(editableLines);

  const updateLine = (index: number, updatedLine: LineType) => {
    const newLines = [...editableLines];
    newLines[index] = updatedLine;
    setEditableLines(newLines);
  };

  const renderLine = (line: LineType, index: number) => {
    switch (line.type) {
      case "text":
      case "hidden":
        return <TextLine key={index} line={line} />;
      case "tables":
        return <TableLine key={index} line={line} />;
      case "image":
        return <ImageLine key={index} line={line} />;
      case "carousel":
        return <CarouselLine key={index} line={line} />;
      case "markdown":
        return <MarkdownLine key={index} line={line} />;
      case "h2":
      case "h3":
      case "h4":
      case "h5":
        return <HeadingLine key={index} line={line} />;
      case "numerical":
      case "bulleted":
        return <ListLine key={index} line={line} />;
      case "quote":
        return <QuoteLine key={index} line={line} />;
      case "code":
        return <CodeLine key={index} line={line} />;
      case "audio":
        return <AudioLine key={index} line={line} />;
      case "test":
      case "results":
        return <TestLine key={index} line={line} />;
      case "separator":
        return <SeparatorLine key={index} line={line} />;
      case "flexLayout":
        return <FlexLayoutLine key={index} line={line} />;
      case "card":
        return <CardLine key={index} line={line} />;
      case "japaneseSentence":
        return <JapaneseSentenceLine key={index} line={line} />;
      default:
        return null;
    }
  };

  return (
    <ScrollArea>
      <div className="flex min-h-screen flex-col items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-7xl flex flex-col h-full my-10 ">
          <div className="flex flex-col mb-4">
            {cover && (
              <AspectRatio ratio={5 / 1}>
                <img
                  src={cover}
                  alt="cover"
                  className="object-cover rounded-md w-full h-full"
                />
              </AspectRatio>
            )}
            <h1 className="text-4xl font-bold ml-4 mt-4">{title}</h1>
          </div>
          <div className="flex flex-col gap-4 p-4">
            {validatedLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {isEditable ? (
                  <EditableLineWrapper
                    key={index}
                    line={line}
                    index={index}
                    updateLine={updateLine}
                  >
                    {React.createElement(renderLine(line, index), { line })}
                  </EditableLineWrapper>
                ) : (
                  renderLine(line, index)
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TopicViewer;
