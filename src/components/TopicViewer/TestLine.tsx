import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BookCheck, CheckIcon, XIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineType } from "@/types";

type TestLineProps = {
  line: LineType;
};

const TestLine: React.FC<TestLineProps> = ({ line }) => {
  if (line.type !== "test" && line.type !== "results") return null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { t } = useTranslation();

  const handleOptionClick = (optionIndex: number, isMultiCorrect: boolean) => {
    if (isMultiCorrect) {
      setSelectedAnswers((prev) =>
        prev.includes(optionIndex)
          ? prev.filter((index) => index !== optionIndex)
          : [...prev, optionIndex],
      );
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

  const renderQuestion = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookCheck className="h-6 w-6" />
          {t("alphabet.miniTest.titleQuestion")} {currentQuestionIndex + 1}
        </h2>
        <p className="mb-6 text-lg">
          {line.questions[currentQuestionIndex]?.question}
        </p>
        <div className="space-y-4">
          {line.questions[currentQuestionIndex]?.options.map(
            (option, optionIndex) => (
              <motion.button
                key={optionIndex}
                className={`w-full text-left p-4 rounded-md ${
                  selectedAnswers.includes(optionIndex)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
                onClick={() => handleOptionClick(optionIndex, isMultiCorrect)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-between">
                  {option}
                  {selectedAnswers.includes(optionIndex) && (
                    <CheckIcon className="h-5 w-5" />
                  )}
                </span>
              </motion.button>
            ),
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Progress
            value={(currentQuestionIndex / line.questions.length) * 100}
            className="w-1/2"
          />
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswers.length === 0}
          >
            {currentQuestionIndex === line.questions.length - 1
              ? t("alphabet.miniTest.finish")
              : t("alphabet.miniTest.next")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderResults = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {t("alphabet.miniTest.resultsTitle")}
        </h2>
        <p className="mb-6 text-lg">
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
        <div className="space-y-6">
          <AnimatePresence>
            {line.questions.map((question, questionIndex) => {
              const userAnswerCorrect =
                question.correctAnswers.every((correctAnswerIndex) =>
                  selectedAnswers.includes(correctAnswerIndex),
                ) && selectedAnswers.length === question.correctAnswers.length;
              return (
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: questionIndex * 0.1 }}
                >
                  <Card
                    className={`p-4 ${
                      userAnswerCorrect
                        ? "bg-green-100 dark:bg-green-900"
                        : "bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    <h3 className="font-semibold mb-2">{question.question}</h3>
                    <p className="mb-2">
                      <strong>{t("alphabet.miniTest.yourAnswer")}:</strong>{" "}
                      {selectedAnswers
                        .map((index) => question.options[index])
                        .join(", ") || t("alphabet.miniTest.notAnswered")}
                    </p>
                    <p>
                      <strong>{t("alphabet.miniTest.correctAnswer")}:</strong>{" "}
                      {question.correctAnswers
                        .map((index) => question.options[index])
                        .join(", ")}
                    </p>
                    {userAnswerCorrect ? (
                      <CheckIcon className="mt-2 h-6 w-6 text-green-500" />
                    ) : (
                      <XIcon className="mt-2 h-6 w-6 text-red-500" />
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div
      className={`my-8 ${line.backgroundColor ? `bg-${line.backgroundColor}` : ""}`}
      style={{
        padding: line.padding || "0",
        color: line.color || "inherit",
        marginBottom: line.marginBottom || "0",
      }}
    >
      {showResults ? renderResults() : renderQuestion()}
    </div>
  );
};

export default TestLine;
