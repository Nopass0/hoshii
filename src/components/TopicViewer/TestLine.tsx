import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BookCheck, CheckIcon, XIcon } from "lucide-react";
import { LineType } from "@/types";

type TestLineProps = {
  line: LineType;
};

const TestLine: React.FC<TestLineProps> = ({ line }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { t } = useTranslation();

  const handleOptionClick = (optionIndex: number, isMultiCorrect: boolean) => {
    if (isMultiCorrect) {
      setSelectedAnswers((prev) => {
        if (prev.includes(optionIndex)) {
          return prev.filter((index) => index !== optionIndex);
        } else {
          return [...prev, optionIndex];
        }
      });
    } else {
      setSelectedAnswers([optionIndex]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < line.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswers([]);
    } else {
      setShowResults(true);
    }
  };

  const isMultiCorrect =
    line.questions[currentQuestionIndex]?.correctAnswers.length > 1;

  return (
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
      {line.type === "test" && (
        <div className="rounded-md border p-4 dark:bg-zinc-800 dark:border-zinc-700 overflow-hidden">
          <h2 className="text-xl font-bold mb-2 dark:text-white flex flex-row items-center gap-2">
            <BookCheck /> {t("alphabet.miniTest.titleQuestion")}{" "}
            {currentQuestionIndex + 1}
          </h2>
          <p className="mb-4 dark:text-gray-300">
            {line.questions[currentQuestionIndex]?.question}
          </p>
          <ul>
            {line.questions[currentQuestionIndex]?.options.map(
              (option, optionIndex) => (
                <motion.li
                  key={optionIndex}
                  className="mb-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "left", transformBox: "local" }}
                >
                  <button
                    className={`rounded-md px-4 py-2 flex justify-between items-center ${
                      selectedAnswers.includes(optionIndex)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 dark:bg-zinc-700 dark:text-white"
                    }`}
                    onClick={() =>
                      handleOptionClick(optionIndex, isMultiCorrect)
                    }
                  >
                    {option}
                    {selectedAnswers.includes(optionIndex) && (
                      <CheckIcon className="ml-2" />
                    )}
                  </button>
                </motion.li>
              ),
            )}
          </ul>
          <motion.button
            className="rounded-md bg-green-500 text-white px-4 py-2"
            onClick={handleNextQuestion}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {t("alphabet.miniTest.next")}
          </motion.button>
        </div>
      )}
      {line.type === "results" && showResults && (
        <div className="rounded-md border p-4 dark:bg-zinc-800 dark:border-zinc-700">
          <h2 className="text-xl font-bold mb-2 dark:text-white">
            {t("alphabet.miniTest.resultsTitle")}
          </h2>
          <p className="mb-4 dark:text-gray-300">
            {t("alphabet.miniTest.resultsOverview", {
              correct: selectedAnswers.filter(
                (userAnswerIndex, userAnswerIndexInSelected) =>
                  line.questions.some(
                    (question) =>
                      question.correctAnswers.includes(userAnswerIndex) &&
                      selectedAnswers.length === question.correctAnswers.length,
                  ),
              ).length,
              total: line.questions.length,
            })}
          </p>
          <ul className="space-y-4">
            {line.questions.map((question, questionIndex) => {
              const userAnswerCorrect =
                question.correctAnswers.every((correctAnswerIndex) =>
                  selectedAnswers.includes(correctAnswerIndex),
                ) && selectedAnswers.length === question.correctAnswers.length;
              return (
                <motion.li
                  key={questionIndex}
                  className={`p-4 rounded-lg ${
                    userAnswerCorrect
                      ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 * questionIndex }}
                  style={{ transformOrigin: "left", transformBox: "local" }}
                >
                  <h3 className="font-semibold mb-2">{question.question}</h3>
                  <p className="mb-2">
                    {t("alphabet.miniTest.yourAnswer")}:{" "}
                    {selectedAnswers
                      .map((index) => question.options[index])
                      .join(", ") || t("alphabet.miniTest.notAnswered")}
                  </p>
                  <p>
                    {t("alphabet.miniTest.correctAnswer")}:{" "}
                    {question.correctAnswers
                      .map((index) => question.options[index])
                      .join(", ")}
                  </p>
                  {userAnswerCorrect ? (
                    <CheckIcon className="mt-2 h-6 w-6 text-green-500" />
                  ) : (
                    <XIcon className="mt-2 h-6 w-6 text-red-500" />
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default TestLine;
