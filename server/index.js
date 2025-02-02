const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("Hello Kalyan");
});

app.listen(3001);
