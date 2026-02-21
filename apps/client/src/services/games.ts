import { api } from "../app/axios";
import { getSoundsBaseUrl } from "../utils/apiHelpers";
import {
  NAME_THAT_NOTE_DIFFICULTIES,
  NAME_THAT_NOTE_INSTRUMENTS,
} from "../app/constants";

// Define a type for the function parameter
type FetchNameThatNoteParams = {
  difficulty: (typeof NAME_THAT_NOTE_DIFFICULTIES)[number];
  instrument: (typeof NAME_THAT_NOTE_INSTRUMENTS)[number];
};

export const fetchNameThatNote = async ({
  difficulty,
  instrument,
}: FetchNameThatNoteParams) => {
  const { data } = await api.get(
    `/name-that-note/${instrument}?difficulty=${difficulty}`,
  );

  // Encode # in the file name
  data.file = getSoundsBaseUrl() + data.file.replace("#", "%23");
  return data;
};
