require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const listRoutes = require("./routes/list");

app.use(express.json());

//Routes
app.use("/api/board", listRoutes);
app.use("/api/user", listRoutes);

app.use((req, res, next) => {
  console.log(req.path, req.url);
  next();
});

//connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
  //listen for requests
  app.listen(process.env.PORT, () => {
    console.log("Connect to db & listen to port", process.env.PORT);
  });
});
