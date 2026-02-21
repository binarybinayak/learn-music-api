import { api } from "../app/axios";
import { getSoundsBaseUrl } from "../utils/apiHelpers";
import {
  NAME_THAT_NOTE_DIFFICULTIES,
  NAME_THAT_NOTE_INSTRUMENTS,
  MATCH_THE_PITCH_DIFFICULTIES,
  MATCH_THE_PITCH_INSTRUMENTS,
} from "../app/constants";
import type {
  nameThatNoteQuestionType,
  matchThePitchQuestionType,
} from "@learn-music-app/shared";

// Define a type for the function parameter
type FetchNameThatNoteParams = {
  difficulty: (typeof NAME_THAT_NOTE_DIFFICULTIES)[number];
  instrument: (typeof NAME_THAT_NOTE_INSTRUMENTS)[number];
};

export const fetchNameThatNote = async ({
  difficulty,
  instrument,
}: FetchNameThatNoteParams) => {
  const { data } = await api.get<nameThatNoteQuestionType>(
    `/name-that-note/${instrument}?difficulty=${difficulty}`,
  );

  // Encode # in the file name
  data.file = getSoundsBaseUrl() + data.file.replace("#", "%23");
  // Encode any option audio files returned by the server
  if (data.optionsFiles && Array.isArray(data.optionsFiles)) {
    data.optionsFiles = data.optionsFiles.map(
      (f) => getSoundsBaseUrl() + f.replace("#", "%23"),
    );
  }
  return data;
};

type FetchMatchThePitchParams = {
  difficulty: (typeof MATCH_THE_PITCH_DIFFICULTIES)[number];
  instrument: (typeof MATCH_THE_PITCH_INSTRUMENTS)[number];
};

export const fetchMatchThePitch = async ({
  difficulty,
  instrument,
}: FetchMatchThePitchParams) => {
  const { data } = await api.get<matchThePitchQuestionType>(
    `/match-the-pitch/${instrument}?difficulty=${difficulty}`,
  );

  // Encode # in the audio files
  data.options = data.options.map(
    (f) => getSoundsBaseUrl() + f.replace("#", "%23"),
  );

  data.answer = getSoundsBaseUrl() + data.answer.replace("#", "%23");
  return data;
};
