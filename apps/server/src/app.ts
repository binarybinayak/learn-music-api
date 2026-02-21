import express, { Request, Response } from "express";
import apiRouter from "./api.routes";

const app = express();

app.use("/sounds", express.static("sounds"));
app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Learn Music App!");
});

export default app;
