import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

//db
import connectDB from "./config/db.js";

//routers
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

//cors
import cors from "cors";

app.use(cors());
//massage data
app.use(express.json());

//api routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/posts", postRouter);

//dummy route
app.get("/api/v1/hello", (req, res) => {
  res.send("hello!!");
});

//if user navigate to a wrong route
app.use(notFoundMiddleware);
//server errors
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
