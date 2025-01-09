import React, { useState, useEffect, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

// Hiragana, Katakana, and Combined Hiragana data
const hiragana = [
  ["あ", "い", "う", "え", "お"],
  ["か", "き", "く", "け", "こ"],
  ["さ", "し", "す", "せ", "そ"],
  ["た", "ち", "つ", "て", "と"],
  ["な", "に", "ぬ", "ね", "の"],
  ["は", "ひ", "ふ", "へ", "ほ"],
  ["ま", "み", "む", "め", "も"],
  ["や", "", "ゆ", "", "よ"],
  ["ら", "り", "る", "れ", "ろ"],
  ["わ", "", "を", "", "ん"],
];

const katakana = [
  ["ア", "イ", "ウ", "エ", "オ"],
  ["カ", "キ", "ク", "ケ", "コ"],
  ["サ", "シ", "ス", "セ", "ソ"],
  ["タ", "チ", "ツ", "テ", "ト"],
  ["ナ", "ニ", "ヌ", "ネ", "ノ"],
  ["ハ", "ヒ", "フ", "ヘ", "ホ"],
  ["マ", "ミ", "ム", "メ", "モ"],
  ["ヤ", "", "ユ", "", "ヨ"],
  ["ラ", "リ", "ル", "レ", "ロ"],
  ["ワ", "", "ヲ", "", "ン"],
];

const combinedHiragana = [
  ["きゃ", "きゅ", "きょ"],
  ["しゃ", "しゅ", "しょ"],
  ["ちゃ", "ちゅ", "ちょ"],
  ["にゃ", "にゅ", "にょ"],
  ["ひゃ", "ひゅ", "ひょ"],
  ["みゃ", "みゅ", "みょ"],
  ["りゃ", "りゅ", "りょ"],
];

// Words for the trainer
const words = [
  { kana: "こんにちは", romaji: "konnichiwa" },
  { kana: "ありがとう", romaji: "arigatou" },
  { kana: "さようなら", romaji: "sayounara" },
  { kana: "おはよう", romaji: "ohayou" },
  { kana: "こんばんは", romaji: "konbanwa" },
  { kana: "すみません", romaji: "sumimasen" },
  { kana: "お願いします", romaji: "onegaishimasu" },
  { kana: "ありがとうございます", romaji: "arigatougozaimasu" },
  { kana: "おめでとう", romaji: "omedetou" },
  { kana: "お元気ですか", romaji: "ogenkidesuka" },
];

// CharacterBlock component
const CharacterBlock: React.FC<{ char: string }> = memo(({ char }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center  rounded-lg cursor-pointer relative border dark:border-sidebar duration-300 transition-colors  hover:border-primary"
    onClick={() => new Audio(`/sounds/${char}.mp3`).play()}
  >
    <span className="text-xl sm:text-2xl">{char}</span>
  </motion.div>
));

// AlphabetDisplay component
const AlphabetDisplay = memo(() => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full"
    >
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-4 mx-auto flex justify-center">
                {t("alphabet.hiragana")}
              </h3>
              <div className="grid grid-cols-5 gap-1 mx-16 gap-y-4">
                {hiragana.flat().map((char, index) => (
                  <CharacterBlock
                    key={`hiragana-${char}-${index}`}
                    char={char}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold  mx-auto flex justify-center mb-4">
                {t("alphabet.katakana")}
              </h3>
              <div className="grid grid-cols-5 gap-1 mx-16 gap-y-4">
                {katakana.flat().map((char, index) => (
                  <CharacterBlock
                    key={`katakana-${char}-${index}`}
                    char={char}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 mt-2 mx-auto flex justify-center">
              {t("alphabet.combinedSounds")}
            </h3>
            <div className="grid grid-cols-7 gap-1 gap-y-4 mx-56 mb-6">
              {combinedHiragana.flat().map((char, index) => (
                <CharacterBlock key={`combined-${char}-${index}`} char={char} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </motion.div>
  );
});

// Trainer component
const Trainer = memo(({ currentWordIndex, input, setInput, time, record }) => {
  const { t } = useTranslation();
  const word = words[currentWordIndex];

  return (
    <motion.div
      key="trainer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="h-full flex flex-col items-center justify-center"
    >
      <motion.div
        key={word.kana}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-4xl font-bold mb-8">{word.kana}</div>
      </motion.div>
      <div className="flex items-center gap-4 mb-8">
        <Input
          id="alphabet-input"
          name="alphabet-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("alphabet.enterRomaji")}
          className="w-64"
        />
      </div>
      <Progress
        value={(currentWordIndex / words.length) * 100}
        className="w-64 mt-8"
      />
      <div className="flex gap-8 mt-8">
        <div>
          {t("alphabet.time")}: {time}s
        </div>
        <div>
          {t("alphabet.record")}: {record !== null ? `${record}s` : "N/A"}
        </div>
      </div>
    </motion.div>
  );
});

// Main AlphabetPage component
const AlphabetPage: React.FC = () => {
  const { t } = useTranslation();
  const [trainerActive, setTrainerActive] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);
  const [record, setRecord] = useState<number | null>(null);

  // Load record from localStorage
  useEffect(() => {
    const savedRecord = localStorage.getItem("record");
    if (savedRecord) {
      setRecord(parseInt(savedRecord, 10));
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (trainerActive) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [trainerActive]);

  // Check answer logic
  const checkAnswer = useCallback(() => {
    if (input.toLowerCase() === words[currentWordIndex].romaji) {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex((prev) => prev + 1);
        setInput("");
      } else {
        if (record === null || time < record) {
          setRecord(time);
          localStorage.setItem("record", time.toString());
        }
        setTrainerActive(false);
      }
    }
  }, [input, currentWordIndex, record, time]);

  // Trigger checkAnswer when input changes
  useEffect(() => {
    if (trainerActive && input.length > 0) {
      checkAnswer();
    }
  }, [trainerActive, input, checkAnswer]);

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4">
      <div className="w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{t("pages.alphabet")}</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setTrainerActive(!trainerActive);
              if (!trainerActive) {
                setCurrentWordIndex(0);
                setInput("");
                setTime(0);
              }
            }}
          >
            {trainerActive ? t("alphabet.alphabet") : t("alphabet.trainer")}
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          <AnimatePresence>
            {!trainerActive ? (
              <AlphabetDisplay key="alphabet" />
            ) : (
              <Trainer
                key="trainer"
                currentWordIndex={currentWordIndex}
                input={input}
                setInput={setInput}
                time={time}
                record={record}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AlphabetPage;
