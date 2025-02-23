const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  res.json({ requestedData: { email, password } });
});

app.listen(4000);
