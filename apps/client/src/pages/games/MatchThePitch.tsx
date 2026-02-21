import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { fetchMatchThePitch } from "../../services/games";
import type { matchThePitchQuestionType } from "@learn-music-app/shared";
import {
  MATCH_THE_PITCH_DIFFICULTIES,
  MATCH_THE_PITCH_INSTRUMENTS,
} from "../../app/constants";
import { getHighScore, saveHighScore } from "../../utils/highScores";

const MatchThePitchPage = () => {
  const [difficulty, setDifficulty] =
    useState<(typeof MATCH_THE_PITCH_DIFFICULTIES)[number]>("easy");
  const [instrument, setInstrument] =
    useState<(typeof MATCH_THE_PITCH_INSTRUMENTS)[number]>("piano_long");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const { data, isLoading, refetch } = useQuery<matchThePitchQuestionType>({
    queryKey: ["matchThePitch", difficulty, instrument],
    queryFn: () => fetchMatchThePitch({ difficulty, instrument }),
  });

  // Update high score when difficulty, instrument, or score changes
  useEffect(() => {
    const updated = getHighScore({
      game: "matchThePitch",
      instrument,
      difficulty,
    });
    setHighScore(updated);
  }, [difficulty, instrument, score]);

  const handleSubmit = () => {
    if (!selectedOption) return;
    setSubmitted(true);
    if (selectedOption === data?.answer) {
      setScore((prev) => {
        const newScore = prev + 1;
        // Save high score if improved
        if (newScore > highScore) {
          saveHighScore(
            {
              game: "matchThePitch",
              instrument,
              difficulty,
            },
            newScore,
          );
        }
        return newScore;
      });
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setSubmitted(false);
    refetch();
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    refetch();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">Match The Pitch</h1>

      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(
                e.target.value as (typeof MATCH_THE_PITCH_DIFFICULTIES)[number],
              );
              setSelectedOption(null);
              setSubmitted(false);
              setScore(0);
              refetch();
            }}
            className="p-2 border rounded"
          >
            {MATCH_THE_PITCH_DIFFICULTIES.map((level) => (
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
            onChange={(e) => {
              setInstrument(
                e.target.value as (typeof MATCH_THE_PITCH_INSTRUMENTS)[number],
              );
              setSelectedOption(null);
              setSubmitted(false);
              setScore(0);
              refetch();
            }}
            className="p-2 border rounded"
          >
            {MATCH_THE_PITCH_INSTRUMENTS.map((inst) => (
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
      <div className="mb-6 text-lg">
        <span className="font-semibold text-gray-700">High Score:</span>{" "}
        <span className="text-blue-600 font-bold">{highScore}</span>
      </div>

      {isLoading && <p>Loading...</p>}

      {data && (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4 text-center text-lg font-medium">
            Identify this note: {data.note}
          </p>

          <form className="flex flex-col gap-3">
            {data.options.map((option) => {
              const isCorrect = option === data.answer;
              const isSelected = option === selectedOption;

              return (
                <div
                  key={option}
                  className={`flex flex-col border rounded p-2 cursor-pointer transition mb-2 ${
                    submitted
                      ? isCorrect
                        ? "bg-green-100 border-green-400"
                        : isSelected
                          ? "bg-red-100 border-red-400"
                          : "hover:bg-gray-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio input */}
                    <input
                      type="radio"
                      name="pitchOption"
                      value={option}
                      disabled={submitted}
                      checked={isSelected}
                      onChange={() => setSelectedOption(option)}
                      className="w-4 h-4 accent-blue-600"
                    />

                    {/* Audio player */}
                    <audio controls className="flex-1">
                      <source src={option} />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Feedback icons */}
                  {submitted && (
                    <div className="mt-2">
                      {isCorrect ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <FaCheckCircle /> Correct!
                        </div>
                      ) : isSelected && !isCorrect ? (
                        <div className="flex items-center gap-1 text-red-600">
                          <FaTimesCircle /> Wrong
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </form>

          {/* Action buttons */}
          <div className="mt-6 text-center">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
              >
                Submit
              </button>
            ) : selectedOption === data.answer ? (
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

export default MatchThePitchPage;
