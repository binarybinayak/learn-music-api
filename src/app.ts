import express, { Request, Response } from "express";
import nameThatNoteRouter from "./controller/nameThatNote.controller";

const app = express();

app.use("/sounds", express.static("sounds"));

app.use("/name-that-note", nameThatNoteRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Learn Music App!");
});

export default app;
