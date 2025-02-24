const express = require("express");
const app = express();
const cors = require("cors");
const { mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://kalyanpanchal1415:mymongodb@cluster0.rfdyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.create({
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.listen(4000);
