const express = require("express");
const app = express();
const cors = require("cors");
const { mongoose } = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const salt = bcrypt.genSaltSync(10);
const secret = "akjsdoaisdbamsdovydtqdwboauwdnalnau";
app.use(cookieParser());
app.listen(4000);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passCheck = bcrypt.compareSync(password, user.password);
  if (passCheck) {
    //login
    jwt.sign({ email, id: user._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: user._id,
        email,
      });
    });
  } else {
    res.status(400).json("Wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});
app.use("/uploads", express.static(__dirname + "/uploads"));

app.post("/post", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      content: content,
      title: title,
      cover: newPath,
      summary: summary,
      author: info.id,
    });
    res.json(postDoc);
  });
});
app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["email"])
    .sort({ createdAt: "desc" })
    .limit(20);
  res.json(posts);
});

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const postInfo = await Post.findById(id).populate("author", ["email"]);
  res.json(postInfo);
});
