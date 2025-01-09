import React, { useState, useEffect } from "react";
import TopicViewer from "@/components/TopicViewer";
import cover from "../assets/cover2.jpg";
import { QuestionType, LineType, validateLines } from "@/types";
import { shuffleArray } from "@/utils";

function TestPage() {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[]>(
    [],
  );
  const [lines, setLines] = useState<LineType[]>([]);

  useEffect(() => {
    const testQuestions: QuestionType[] = [
      {
        question:
          "Какое из следующих слов - правильное японское слово для 'кошка'?",
        options: ["ねこ", "いぬ", "とり"],
        correctAnswers: [0],
      },
      {
        question:
          "Какая правильная форма прошедшего времени от глагола 'tabemasu' (есть)?",
        options: ["たべました", "たべます", "たべ"],
        correctAnswers: [0],
      },
      {
        question: "Сколько времени длится академический год в Японии?",
        options: ["1 год", "2 года", "3 года"],
        correctAnswers: [0],
      },
      // Добавьте еще вопросы здесь
    ];
    setShuffledQuestions(shuffleArray(testQuestions));
  }, []);

  useEffect(() => {
    const exampleLines: LineType[] = [
      {
        type: "text",
        text: "Добро пожаловать в этот подробный обзор японской грамматики!",
        alignment: "left",
        marginBottom: "1rem",
      },
      {
        type: "h2",
        text: "Основная структура предложения",
        marginBottom: "1rem",
      },
      {
        type: "text",
        text: "В японском языке основная структура предложения обычно подчиняется шаблону Подлежащее-Дополнение-Глагол (SOV). Это означает, что глагол обычно ставится в конце предложения.",
        marginBottom: "1rem",
      },
      {
        type: "quote",
        text: "主語 + 宾語 + 動詞",
        marginBottom: "1rem",
      },
      {
        type: "image",
        image: cover,
        caption: "Это образец изображения",
        width: 640,
        height: 480,
        openFullscreen: true,
        marginBottom: "1rem",
      },
      {
        type: "carousel",
        images: [
          { src: "https://via.placeholder.com/640x480?text=Image+2" },
          { src: "https://via.placeholder.com/640x480?text=Image+3" },
          { src: "https://via.placeholder.com/640x480?text=Image+4" },
        ],
        marginBottom: "1rem",
      },
      {
        type: "tables",
        tables: [
          {
            tableData: [
              {
                id: "1",
                baseForm: "いく (iku)",
                present: "いきます (ikimasu)",
                past: "いきました (ikkimasu)",
              },
              {
                id: "2",
                baseForm: "食べる (taberu)",
                present: "たべます (tabemasu)",
                past: "たべました (tabemasu)",
              },
              {
                id: "3",
                baseForm: "行く (o kuru)",
                present: "きます (kimasu)",
                past: "きました (kimashita)",
              },
            ],
            width: "60%",
            columns: [
              {
                accessorKey: "baseForm",
                header: "Основная форма",
                cell: ({ row }) => <div>{row.getValue("baseForm")}</div>,
              },
              {
                accessorKey: "present",
                header: "Настоящее (вежливая форма)",
                cell: ({ row }) => <div>{row.getValue("present")}</div>,
              },
              {
                accessorKey: "past",
                header: "Прошлое (вежливая форма)",
                cell: ({ row }) => <div>{row.getValue("past")}</div>,
              },
            ],
          },
        ],
        padding: "2rem",
        marginBottom: "2rem",
        align: "center",
      },
      {
        type: "numerical",
        items: [
          "Первое утверждение",
          "Второе утверждение",
          "Третье утверждение",
        ],
        marginBottom: "1rem",
      },
      {
        type: "bulleted",
        items: ["Беззнаковое утверждение 1", "Беззнаковое утверждение 2"],
        marginBottom: "1rem",
      },
      {
        type: "markdown",
        markdown:
          "**Ресурсы для дальнейшего изучения**:\n- [Текстовая книга Genki](https://www.amazon.com/Genki-Textbook-Narrative-Methods-Japanese/dp/0190201639)\n- [Руководство Тэй Кима по изучению японского](https://www.guidetojapanese.org/)",
        padding: "2rem",
        marginBottom: "2rem",
      },
      {
        type: "audio",
        src: "https://www.soundjay.com/button/beep-07.mp3",
        caption: "Пример аудио",
        marginBottom: "1rem",
      },
      {
        type: "code",
        code: `const sum = (a, b) => a + b;
console.log(sum(2, 3));`,
        marginBottom: "1rem",
      },
      {
        type: "test",
        questions: shuffledQuestions,
        currentQuestionIndex: 0,
        selectedAnswers: [],
        setShowResults: setShowResults, // Убедитесь, что setShowResults определена
        padding: "2rem",
        marginBottom: "2rem",
      },
      {
        type: "results",
        showResults: false,
        selectedAnswers: [],
        questions: shuffledQuestions,
        padding: "2rem",
        marginBottom: "2rem",
      },
    ];

    try {
      const validatedLines = validateLines(exampleLines);
      setLines(validatedLines);
    } catch (error) {
      console.error("Ошибка валидации:", error);
    }
  }, [shuffledQuestions]);

  const setShowResults = (show: boolean) => {
    const updatedLines = lines.map((line) =>
      line.type === "test" || line.type === "results"
        ? { ...line, showResults: show }
        : line,
    );
    setLines(updatedLines);
  };

  return (
    <TopicViewer
      lines={lines}
      cover={cover}
      title="Руководство по грамматике японского языка"
    />
  );
}

export default TestPage;
