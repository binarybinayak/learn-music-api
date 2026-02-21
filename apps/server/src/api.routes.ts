import { Router } from "express";
import nameThatNoteRouter from "./controller/nameThatNote.controller";
import matchThePitchRouter from "./controller/matchThePitch.controller";

const router = Router();

router.use("/name-that-note", nameThatNoteRouter);
router.use("/match-the-pitch", matchThePitchRouter);

export default router;
