import express, { Request, Response } from "express";
import nameThatNoteRouter from "./controller/nameThatNote.controller";
import matchThePitchRouter from "./controller/matchThePitch.controller";

const app = express();

app.use("/sounds", express.static("sounds"));

app.use("/name-that-note", nameThatNoteRouter);

app.use("/match-the-pitch", matchThePitchRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Learn Music App!");
});

export default app;
