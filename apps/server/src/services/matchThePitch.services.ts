import {
  PIANO_SHORT_KEYS,
  PIANO_SHORT_FILE_EXTENSION,
  PIANO_SHORT_FILE_PATH,
  PIANO_LONG_KEYS,
  PIANO_LONG_FILE_EXTENSION,
  PIANO_LONG_FILE_PATH,
} from "../config/constants";

export type matchThePitchProp = {
  note: string;
  options: string[];
  answer: string;
};

export const getMatchThePitchQuestion = (
  instrument: string,
  difficulty: string,
): matchThePitchProp => {
  if (instrument === "piano short") {
    return getPianoShortQuestion(difficulty);
  } else if (instrument === "piano long") {
    return getPianoLongQuestion(difficulty);
  } else {
    throw new Error("Instrument not supported");
  }
};

const getPianoShortQuestion = (difficulty: string): matchThePitchProp => {
  if (difficulty === "easy") {
    return getPianoShortEasyQuestion();
  }
  if (difficulty === "medium") {
    return getPianoShortMediumQuestion();
  }
  if (difficulty === "hard") {
    return getPianoShortHardQuestion();
  }
  if (difficulty === "master") {
    return getPianoShortMasterQuestion();
  }
  throw new Error("Difficulty not supported");
};

const getPianoShortEasyQuestion = (): matchThePitchProp => {
  const firstIndex = Math.floor(Math.random() * (PIANO_SHORT_KEYS.length - 72));
  const secondIndex = firstIndex + 16 + Math.floor(Math.random() * 9);
  const thirdIndex = secondIndex + 16 + Math.floor(Math.random() * 9);
  const fourthIndex = thirdIndex + 16 + Math.floor(Math.random() * 9);

  const answerIndex = [firstIndex, secondIndex, thirdIndex, fourthIndex][
    Math.floor(Math.random() * 4)
  ]!;

  return {
    note: PIANO_SHORT_KEYS[answerIndex]!,
    options: [
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[firstIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[secondIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[thirdIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[fourthIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
    ],
    answer: `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[answerIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
  };
};

const getPianoShortMediumQuestion = (): matchThePitchProp => {
  const firstIndex = Math.floor(Math.random() * (PIANO_SHORT_KEYS.length - 36));
  const secondIndex = firstIndex + 6 + Math.floor(Math.random() * 7);
  const thirdIndex = secondIndex + 6 + Math.floor(Math.random() * 7);
  const fourthIndex = thirdIndex + 6 + Math.floor(Math.random() * 7);

  const answerIndex = [firstIndex, secondIndex, thirdIndex, fourthIndex][
    Math.floor(Math.random() * 4)
  ]!;

  return {
    note: PIANO_SHORT_KEYS[answerIndex]!,
    options: [
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[firstIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[secondIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[thirdIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[fourthIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
    ],
    answer: `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[answerIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
  };
};

const getPianoShortHardQuestion = (): matchThePitchProp => {
  const firstIndex = Math.floor(Math.random() * (PIANO_SHORT_KEYS.length - 20));
  const secondIndex = firstIndex + 1 + Math.floor(Math.random() * 5);
  const thirdIndex = secondIndex + 1 + Math.floor(Math.random() * 5);
  const fourthIndex = thirdIndex + 1 + Math.floor(Math.random() * 5);

  const answerIndex = [firstIndex, secondIndex, thirdIndex, fourthIndex][
    Math.floor(Math.random() * 4)
  ]!;

  return {
    note: PIANO_SHORT_KEYS[answerIndex]!,
    options: [
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[firstIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[secondIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[thirdIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[fourthIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
    ],
    answer: `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[answerIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
  };
};

const getPianoShortMasterQuestion = (): matchThePitchProp => {
  const firstIndex = Math.floor(Math.random() * (PIANO_SHORT_KEYS.length - 4));
  const secondIndex = firstIndex + 1;
  const thirdIndex = secondIndex + 1;
  const fourthIndex = thirdIndex + 1;

  const answerIndex = [firstIndex, secondIndex, thirdIndex, fourthIndex][
    Math.floor(Math.random() * 4)
  ]!;

  return {
    note: PIANO_SHORT_KEYS[answerIndex]!,
    options: [
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[firstIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[secondIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[thirdIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
      `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[fourthIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
    ],
    answer: `${PIANO_SHORT_FILE_PATH}${PIANO_SHORT_KEYS[answerIndex]!}${PIANO_SHORT_FILE_EXTENSION ?? ""}`,
  };
};

const getPianoLongQuestion = (difficulty: string): matchThePitchProp => {
  if (difficulty === "easy") {
    return getPianoLongEasyQuestion();
  }
  if (difficulty === "medium") {
    return getPianoLongMediumQuestion();
  }
  if (difficulty === "hard") {
    return getPianoLongHardQuestion();
  }
  if (difficulty === "master") {
    return getPianoLongMasterQuestion();
  }
  throw new Error("Difficulty not supported");
};

const getPianoLongEasyQuestion = (): matchThePitchProp => {
  const firstIndex = Math.floor(Math.random() * (PIANO_LONG_KEYS.length - 72));
  const secondIndex = firstIndex + 8 + Math.floor(Math.random() * 9);
  const thirdIndex = secondIndex + 8 + Math.floor(Math.random() * 9);
  const fourthIndex = thirdIndex + 8 + Math.floor(Math.random() * 9);

  const answerIndex = [firstIndex, secondIndex, thirdIndex, fourthIndex][
    Math.floor(Math.random() * 4)
  ]!;

  return {
    note: PIANO_LONG_KEYS[answerIndex]!,
    options: [
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[firstIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[secondIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[thirdIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[fourthIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
    ],
    answer: `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[answerIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
  };
};

const getPianoLongMediumQuestion = (): matchThePitchProp => {
  const firstIndex = Math.floor(Math.random() * (PIANO_LONG_KEYS.length - 36));
  const secondIndex = firstIndex + 6 + Math.floor(Math.random() * 7);
  const thirdIndex = secondIndex + 6 + Math.floor(Math.random() * 7);
  const fourthIndex = thirdIndex + 6 + Math.floor(Math.random() * 7);

  const answerIndex = [firstIndex, secondIndex, thirdIndex, fourthIndex][
    Math.floor(Math.random() * 4)
  ]!;

  return {
    note: PIANO_LONG_KEYS[answerIndex]!,
    options: [
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[firstIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[secondIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[thirdIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[fourthIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
    ],
    answer: `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[answerIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
  };
};

const getPianoLongHardQuestion = (): matchThePitchProp => {
  const firstIndex = Math.floor(Math.random() * (PIANO_LONG_KEYS.length - 20));
  const secondIndex = firstIndex + 1 + Math.floor(Math.random() * 5);
  const thirdIndex = secondIndex + 1 + Math.floor(Math.random() * 5);
  const fourthIndex = thirdIndex + 1 + Math.floor(Math.random() * 5);

  const answerIndex = [firstIndex, secondIndex, thirdIndex, fourthIndex][
    Math.floor(Math.random() * 4)
  ]!;

  return {
    note: PIANO_LONG_KEYS[answerIndex]!,
    options: [
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[firstIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[secondIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[thirdIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[fourthIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
    ],
    answer: `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[answerIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
  };
};

const getPianoLongMasterQuestion = (): matchThePitchProp => {
  const firstIndex = Math.floor(Math.random() * (PIANO_LONG_KEYS.length - 4));
  const secondIndex = firstIndex + 1;
  const thirdIndex = secondIndex + 1;
  const fourthIndex = thirdIndex + 1;

  const answerIndex = [firstIndex, secondIndex, thirdIndex, fourthIndex][
    Math.floor(Math.random() * 4)
  ]!;

  return {
    note: PIANO_LONG_KEYS[answerIndex]!,
    options: [
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[firstIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[secondIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[thirdIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
      `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[fourthIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
    ],
    answer: `${PIANO_LONG_FILE_PATH}${PIANO_LONG_KEYS[answerIndex]!}${PIANO_LONG_FILE_EXTENSION ?? ""}`,
  };
};
