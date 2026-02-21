import app from "./src/app";
import chalk from "chalk";
import { PORT } from "@learn-music-app/shared";

app.listen(PORT, () => {
  console.log(
    `\n${chalk.green("➜")}  ${chalk.bold("Local API:")}     ${chalk.cyan(`http://localhost:${PORT}/`)}\n`,
  );
});
