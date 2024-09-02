require("dotenv").config();
const express = require("express");
const workRoute = require("./routes/workRoute");
const db = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//middleware
app.use(express.json());
// Use CORS middleware
app.use(cors("http://localhost:5173/"));
app.use("/api", workRoute);

//erro

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
//
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
