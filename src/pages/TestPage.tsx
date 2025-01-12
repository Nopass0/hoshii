import React from "react";
import TopicViewer from "@/components/TopicViewer";
import { LineType } from "@/types";

import cover from "@/assets/cover2.jpg";

const TestPage: React.FC = () => {
  const lines: LineType[] = [
    {
      type: "text",
      text: "Welcome to our Japanese Language Learning Platform!",
      alignment: "center",
      marginBottom: "1rem",
    },
    {
      type: "h2",
      text: "Basic Japanese Phrases",
      marginBottom: "1rem",
    },
    {
      type: "tables",
      tables: [
        {
          tableData: [
            { phrase: "こんにちは", meaning: "Hello", romaji: "Konnichiwa" },
            { phrase: "ありがとう", meaning: "Thank you", romaji: "Arigatou" },
            { phrase: "さようなら", meaning: "Goodbye", romaji: "Sayounara" },
          ],
          width: "100%",
          columns: [
            {
              accessorKey: "phrase",
              header: "Japanese",
              cell: ({ row }) => <div>{row.getValue("phrase")}</div>,
            },
            {
              accessorKey: "meaning",
              header: "English",
              cell: ({ row }) => <div>{row.getValue("meaning")}</div>,
            },
            {
              accessorKey: "romaji",
              header: "Romaji",
              cell: ({ row }) => <div>{row.getValue("romaji")}</div>,
            },
          ],
        },
      ],
      padding: "1rem",
      marginBottom: "2rem",
      align: "center",
    },
    {
      type: "image",
      image: cover,
      caption: "Japanese Landscape",
      width: 400,
      height: 300,
      openFullscreen: true,
      marginBottom: "1rem",
    },
    {
      type: "japaneseSentence",
      words: [
        {
          japanese: "私",
          translation: "I",
          hiragana: "わたし",
          romaji: "watashi",
          type: "subject",
        },
        {
          japanese: "は",
          translation: "topic marker",
          hiragana: "は",
          romaji: "wa",
          type: "particle",
        },
        {
          japanese: "日本語",
          translation: "Japanese language",
          hiragana: "にほんご",
          romaji: "nihongo",
          type: "object",
        },
        {
          japanese: "を",
          translation: "object marker",
          hiragana: "を",
          romaji: "wo",
          type: "particle",
        },
        {
          japanese: "勉強します",
          translation: "study",
          hiragana: "べんきょうします",
          romaji: "benkyoushimasu",
          type: "verb",
        },
      ],
      marginBottom: "1rem",
    },
    {
      type: "audio",
      src: "https://zvukogram.com/mp3/cats/2969/whispering-cherry-blossoms-20240601-132249.mp3",
      caption: "Listen to the pronunciation",
      marginBottom: "1rem",
    },
    {
      type: "flexLayout",
      direction: "row",
      padding: "50px",
      items: [
        {
          type: "image",
          image: cover,
          caption: "Japanese Landscape",
          width: 400,
          height: 300,
          openFullscreen: true,
          marginBottom: "1rem",
        },
        {
          type: "tables",
          tables: [
            {
              tableData: [
                {
                  phrase: "こんにちは",
                  meaning: "Hello",
                  romaji: "Konnichiwa",
                },
                {
                  phrase: "ありがとう",
                  meaning: "Thank you",
                  romaji: "Arigatou",
                },
                {
                  phrase: "さようなら",
                  meaning: "Goodbye",
                  romaji: "Sayounara",
                },
              ],
              width: "100%",
              columns: [
                {
                  accessorKey: "phrase",
                  header: "Japanese",
                  cell: ({ row }) => <div>{row.getValue("phrase")}</div>,
                },
                {
                  accessorKey: "meaning",
                  header: "English",
                  cell: ({ row }) => <div>{row.getValue("meaning")}</div>,
                },
                {
                  accessorKey: "romaji",
                  header: "Romaji",
                  cell: ({ row }) => <div>{row.getValue("romaji")}</div>,
                },
              ],
            },
          ],
          padding: "1rem",
          marginBottom: "2rem",
          align: "center",
        },
        {
          type: "japaneseSentence",
          words: [
            {
              japanese: "私",
              translation: "I",
              hiragana: "わたし",
              romaji: "watashi",
              type: "subject",
            },
            {
              japanese: "は",
              translation: "topic marker",
              hiragana: "は",
              romaji: "wa",
              type: "particle",
            },
            {
              japanese: "日本語",
              translation: "Japanese language",
              hiragana: "にほんご",
              romaji: "nihongo",
              type: "object",
            },
            {
              japanese: "を",
              translation: "object marker",
              hiragana: "を",
              romaji: "wo",
              type: "particle",
            },
            {
              japanese: "勉強します",
              translation: "study",
              hiragana: "べんきょうします",
              romaji: "benkyoushimasu",
              type: "verb",
            },
          ],
          marginBottom: "1rem",
        },
      ],
    },
    {
      type: "separator",
      orientation: "horizontal",
      marginBottom: "1rem",
    },
    {
      type: "test",
      questions: [
        {
          question: 'What does "こんにちは" mean?',
          options: ["Hello", "Thank you", "Goodbye"],
          correctAnswers: [0],
        },
        {
          question: 'How do you say "Thank you" in Japanese?',
          options: ["さようなら", "ありがとう", "こんにちは"],
          correctAnswers: [1],
        },
      ],
      currentQuestionIndex: 0,
      selectedAnswers: [],
      setShowResults: () => {},
      marginBottom: "1rem",
    },
  ];

  return (
    <div className="container mx-auto py-8 overflow-y-auto">
      <TopicViewer
        lines={lines}
        cover={cover}
        title="Japanese Language Learning"
      />
    </div>
  );
};

export default TestPage;
