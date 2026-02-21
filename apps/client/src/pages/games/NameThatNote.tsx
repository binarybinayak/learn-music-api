import { useQuery } from "@tanstack/react-query";
import { fetchNameThatNote } from "../../services/games";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import type { nameThatNoteQuestionType } from "@learn-music-app/shared";
import {
  NAME_THAT_NOTE_DIFFICULTIES,
  NAME_THAT_NOTE_INSTRUMENTS,
} from "../../app/constants";

const NameThatNotePage = () => {
  const [difficulty, setDifficulty] =
    useState<(typeof NAME_THAT_NOTE_DIFFICULTIES)[number]>("easy");
  const [instrument, setInstrument] =
    useState<(typeof NAME_THAT_NOTE_INSTRUMENTS)[number]>("piano_long");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState(""); // for god mode
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { data, isLoading, refetch } = useQuery<nameThatNoteQuestionType>({
    queryKey: ["nameThatNote", difficulty, instrument],
    queryFn: () => fetchNameThatNote({ difficulty, instrument }),
  });

  const handleSubmit = () => {
    if (difficulty === "god") {
      if (!inputValue) return;
      setSubmitted(true);
      if (inputValue.trim().toLowerCase() === data?.answer.toLowerCase()) {
        setScore((prev) => prev + 1);
      }
    } else {
      if (!selectedOption) return;
      setSubmitted(true);
      if (selectedOption === data?.answer) setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setInputValue("");
    setSubmitted(false);
    refetch();
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setInputValue("");
    setSubmitted(false);
    setScore(0);
    refetch();
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(null);
    setInputValue("");
    setSubmitted(false);
    setDifficulty(
      e.target.value as (typeof NAME_THAT_NOTE_DIFFICULTIES)[number],
    );
    setScore(0);
    refetch();
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(null);
    setInputValue("");
    setSubmitted(false);
    setInstrument(
      e.target.value as (typeof NAME_THAT_NOTE_INSTRUMENTS)[number],
    );
    setScore(0);
    refetch();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Name That Note</h1>

      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Difficulty:</label>
          <select
            value={difficulty}
            onChange={handleDifficultyChange}
            className="p-2 border rounded"
          >
            {NAME_THAT_NOTE_DIFFICULTIES.map((level) => (
              <option key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Instrument:</label>
          <select
            value={instrument}
            onChange={handleInstrumentChange}
            className="p-2 border rounded"
          >
            {NAME_THAT_NOTE_INSTRUMENTS.map((inst) => (
              <option key={inst} value={inst}>
                {inst
                  .replace("_", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 text-lg">
        <span className="font-semibold text-gray-700">Score:</span> {score}
      </div>

      {isLoading && <p>Loading...</p>}

      {data && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <audio controls className="w-full mb-4" src={data.file}>
            Your browser does not support the audio element.
          </audio>

          {difficulty === "god" ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Type your answer here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={submitted}
                className="p-2 border rounded"
              />
              {submitted && (
                <div className="mt-2 flex items-center gap-2">
                  {inputValue.trim().toLowerCase() ===
                  data.answer.toLowerCase() ? (
                    <>
                      <FaCheckCircle className="text-green-500 text-2xl" />
                      <span className="text-green-700 font-medium">
                        Correct!
                      </span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-red-500 text-2xl" />
                      <span className="text-red-700 font-medium">
                        Wrong! Correct answer: {data.answer}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <form className="flex flex-col gap-3">
              {data.options!.map((option) => {
                const isCorrect = option === data.answer;
                const isSelected = option === selectedOption;

                return (
                  <label
                    key={option}
                    className={`flex items-center justify-between border rounded p-2 cursor-pointer transition ${
                      submitted
                        ? isCorrect
                          ? "bg-green-100 border-green-400"
                          : isSelected
                            ? "bg-red-100 border-red-400"
                            : "hover:bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="noteOption"
                        value={option}
                        disabled={submitted}
                        checked={isSelected}
                        onChange={() => setSelectedOption(option)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-gray-800">{option}</span>
                    </div>

                    {submitted && (
                      <span>
                        {isCorrect ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : isSelected && !isCorrect ? (
                          <FaTimesCircle className="text-red-500" />
                        ) : null}
                      </span>
                    )}
                  </label>
                );
              })}
            </form>
          )}

          {/* Action button */}
          <div className="mt-6 text-center">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={difficulty === "god" ? !inputValue : !selectedOption}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
              >
                Submit
              </button>
            ) : (
                difficulty === "god"
                  ? inputValue.trim().toLowerCase() ===
                    data.answer.toLowerCase()
                  : selectedOption === data.answer
              ) ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Next Note
              </button>
            ) : (
              <button
                onClick={handleTryAgain}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NameThatNotePage;
