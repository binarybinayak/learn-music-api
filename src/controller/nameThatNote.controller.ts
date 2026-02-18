import { Router, Request, Response } from "express";
import { INSTRUMENTS } from "../config/constants";
import { getQuestion, questionProp } from "../services/nameThatNote.services";

const router = Router();

// GET /:instrument?difficulty=easy|medium|hard
router.get("/:instrument", (req: Request, res: Response) => {
  const { instrument } = req.params as { instrument: string };

  if (
    !INSTRUMENTS.map((instrument) => instrument.replace(" ", "_")).includes(
      instrument,
    )
  ) {
    return res.status(404).send("Instrument not supported");
  }

  const difficulty = (req.query.difficulty as string) || "medium";
  const level = ["easy", "medium", "hard", "master"].includes(difficulty)
    ? difficulty
    : "medium";

  const question: questionProp = getQuestion(
    instrument.replace("_", " "),
    level,
  );

  res.status(200).json({
    ...question,
    instrument: instrument.replace("_", " "),
    difficulty: level,
  });
});

export default router;
