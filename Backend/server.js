require("dotenv").config();
const express = require("express");
const workRoute = require("./routes/workRoute");
const db = require("mongoose");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
// Use cors middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  })
);
app.use("/api", workRoute);

//erro

// Increase payload size limits
app.use(express.json({ limit: "1000mb" })); //
app.use(express.urlencoded({ limit: "1000mb", extended: true }));
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
