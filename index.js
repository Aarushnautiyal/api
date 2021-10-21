const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("connected to db");
  }
);

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("homepage is up");
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("backend is up and running on port:", port);
});
