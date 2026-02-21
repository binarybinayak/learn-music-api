import { Router } from "express";
import nameThatNoteRouter from "./controller/nameThatNote.controller";
import matchThePitchRouter from "./controller/matchThePitch.controller";
import cors from "cors";

const router = Router();

router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

router.use("/name-that-note", nameThatNoteRouter);
router.use("/match-the-pitch", matchThePitchRouter);

export default router;
