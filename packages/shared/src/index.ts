export const PORT = 3000;

export type nameThatNoteQuestionType = {
  file: string;
  options: string[];
  optionsFiles?: string[];
  answer: string;
};

export type matchThePitchQuestionType = {
  note: string;
  options: string[];
  optionsNotes?: string[];
  answer: string;
};
