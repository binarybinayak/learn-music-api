import dotenv from "dotenv";
import app from "./src/app";
import chalk from "chalk";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(
    `\n${chalk.green("➜")}  ${chalk.bold("Local API:")}     ${chalk.cyan(`http://localhost:${process.env.PORT}/`)}\n`,
  );
});
