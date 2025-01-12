import { z } from "zod";
import React from "react";

// Define the ColumnDef schema
const ColumnDef = z.object({
  accessorKey: z.string(),
  header: z.union([
    z.string(),
    z.custom<React.ReactElement>((val) => React.isValidElement(val), {
      message: "Expected a React element",
    }),
  ]),
  cell: z
    .function()
    .args(z.object({ row: z.any() }))
    .returns(
      z.custom<React.ReactElement>((val) => React.isValidElement(val), {
        message: "Expected a React element",
      }),
    ),
});

// Define the Image schema
const Image = z.object({
  src: z.string(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  openFullscreen: z.boolean().optional(),
});

// Define the Table schema
const Table = z.object({
  tableData: z.array(z.any()),
  width: z.string(),
  columns: z.array(ColumnDef),
});

// Define the Question schema
const Question = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswers: z.array(z.number()),
});

// Define the Line schema
const Line = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string(),
    alignment: z.enum(["left", "center", "right"]).optional(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("hidden"),
    text: z.string(),
    fullText: z.string(),
    alignment: z.enum(["left", "center", "right"]).optional(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("tables"),
    tables: z.array(Table),
    align: z.enum(["left", "center", "right"]).optional(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("image"),
    image: z.string(),
    caption: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    openFullscreen: z.boolean().optional(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("carousel"),
    images: z.array(z.object({ src: z.string() })),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("markdown"),
    markdown: z.string(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("h2"),
    text: z.string(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("h3"),
    text: z.string(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("h4"),
    text: z.string(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("h5"),
    text: z.string(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("numerical"),
    items: z.array(z.string()),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("bulleted"),
    items: z.array(z.string()),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("quote"),
    text: z.string(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("code"),
    code: z.string(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("audio"),
    src: z.string(),
    caption: z.string().optional(),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("test"),
    questions: z.array(Question),
    currentQuestionIndex: z.number(),
    selectedAnswers: z.array(z.number()),
    setShowResults: z.function().args(z.boolean()).returns(z.void()),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("results"),
    showResults: z.boolean(),
    selectedAnswers: z.array(z.number()),
    questions: z.array(Question),
    padding: z.string().optional(),
    color: z.string().optional(),
    backgroundColor: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("separator"),
    orientation: z.enum(["horizontal", "vertical"]),
    padding: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("flexLayout"),
    direction: z.enum(["row", "column"]),
    items: z.array(z.any()), // This should be more specific, but for simplicity, we're using any
    padding: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("card"),
    mainContent: z.string(),
    secondaryContent: z.string().optional(),
    footer: z.string().optional(),
    padding: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
  z.object({
    type: z.literal("japaneseSentence"),
    words: z.array(
      z.object({
        japanese: z.string(),
        translation: z.string(),
        hiragana: z.string(),
        romaji: z.string(),
        type: z.enum(["subject", "object", "verb", "particle"]),
        examples: z.array(z.string()).optional(),
        forms: z.record(z.string(), z.string()).optional(),
      }),
    ),
    padding: z.string().optional(),
    marginBottom: z.string().optional(),
  }),
]);

// Export types for use in components
export type ColumnDefType = z.infer<typeof ColumnDef>;
export type ImageType = z.infer<typeof Image>;
export type TableType = z.infer<typeof Table>;
export type LineType = z.infer<typeof Line>;
export type QuestionType = z.infer<typeof Question>;

// Function to validate lines
export const validateLines = (lines: LineType[]): LineType[] => {
  return lines.map((line) => {
    const parsedLine = Line.safeParse(line);
    if (!parsedLine.success) {
      throw new Error(`Invalid line data: ${parsedLine.error.message}`);
    }
    return parsedLine.data;
  });
};
