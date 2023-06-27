import express from "express";
import "dotenv/config";

import userRouter from "./routes/user";
import examRouter from "./routes/exam";
import questionRouter from "./routes/question";
import reportRouter from "./routes/report";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/exams", examRouter);
app.use("/questions", questionRouter);
app.use("/reports", reportRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
