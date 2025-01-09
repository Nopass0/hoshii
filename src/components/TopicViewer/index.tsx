import React, { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
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
import { LineType, validateLines } from "@/types";

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
  const validatedLines = validateLines(lines);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-7xl flex flex-col h-full my-10">
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
            <React.Fragment key={index}>
              {line.type === "text" || line.type === "hidden" ? (
                <TextLine line={line} />
              ) : line.type === "tables" ? (
                <TableLine line={line} />
              ) : line.type === "image" ? (
                <ImageLine line={line} />
              ) : line.type === "carousel" ? (
                <CarouselLine line={line} />
              ) : line.type === "markdown" ? (
                <MarkdownLine line={line} />
              ) : line.type.startsWith("h") ? (
                <HeadingLine line={line} />
              ) : line.type === "numerical" || line.type === "bulleted" ? (
                <ListLine line={line} />
              ) : line.type === "quote" ? (
                <QuoteLine line={line} />
              ) : line.type === "code" ? (
                <CodeLine line={line} />
              ) : line.type === "audio" ? (
                <AudioLine line={line} />
              ) : line.type === "test" || line.type === "results" ? (
                <TestLine line={line} />
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicViewer;
