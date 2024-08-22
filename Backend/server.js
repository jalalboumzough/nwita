require("dotenv").config();
const express = require("express");
const workRoute = require("./routes/workRoute");
const db = require("mongoose");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());

// Use CORS middleware
app.use(cors());
app.use("/api", workRoute);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes

db.connect(process.env.MongoUri)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("You Connect to database", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

process.env;
