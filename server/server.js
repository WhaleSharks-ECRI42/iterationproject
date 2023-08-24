const express = require("express");
const app = express();
const connectDB = require("./db");
connectDB();
const showRouter = require("./routes/shows");
const favoriteRouter = require("./routes/favorite");
const userRouter = require("./routes/userRouter");
const cookieParser = require('cookie-parser')

app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded());
app.use(cookieParser());

// app.use("/build", express.static(path.join(__dirname, "../build")));

// app.get("/", (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, "../index.html"));
// });

app.use("/TVShow", showRouter);
app.use("/Favorite", favoriteRouter);
app.use("/Auth", userRouter);

app.use("*", (req, res) => res.status(404).send("Not Found"));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000); //listens on port 3000 -> http://localhost:3000/

module.exports = app;
