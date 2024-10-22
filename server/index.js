const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const usersModel = require("./model/userModel");
const bookModel = require("./model/bookModel");
const writesModel = require("./model/writesModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { env } = require("process");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/public/books", express.static("./public/books"));

mongoose
  .connect(process.env.database_connection)
  .then(console.log("Connection Successful"))
  .catch((err) => console.log(err));

//Register user to mongo database
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const oldUser = await usersModel.findOne({ email });

    if (oldUser) {
      res.send({ error: "User Exists" });
    }

    await usersModel
      .create({ name, email, password: encryptedPassword })
      .then(res.send({ status: 200 }))
      .catch((err) => res.json(err));
  } catch (err) {
    res.send({ status: 404 });
  }
});

//login user to mongo database
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersModel.findOne({ email });
  if (!user) {
    res.send({ error: "User Not Found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token, username: user.name });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Request" });
});

// get user data
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    usersModel
      .findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((err) => res.send({ status: "error", data: err }));
  } catch (error) {
    res.send({ status: "error", error: error });
  }
});

// get location for books and bind
const storageBook = multer.diskStorage({
  destination: (req, fil, callback) => {
    callback(null, "public/books");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadBook = multer({
  storage: storageBook,
});

// upload the book on the server's locations
app.post("/uploadBook", uploadBook.single("book"), async (req, res) => {
  await bookModel
    .create({
      name: req.body.name,
      author: req.body.author,
      publisher: req.body.publisher,
      description: req.body.description,
      book: req.file.filename,
    })
    .then(res.send({ staus: 200 }))
    .catch((err) => console.log(err));
});

// get all books
app.get("/allBooks", async (req, res) => {
  await bookModel
    .find({})
    .then((data) => res.send({ status: 200, data: data }))
    .catch((err) => console.log(err));
});

//get book by id
app.get("/getBook/:id", (req, res) => {
  bookModel
    .findById(req.params.id)
    .then((data) => res.send({ status: 200, data: data }))
    .catch((err) => console.log(err));
});

//post writes as per type
app.post("/uploadWrites", async (req, res) => {
  await writesModel
    .create(req.body)
    .then(res.send({ staus: 200 }))
    .catch((err) => console.log(err));
});

//get writes from categrory
app.get("/getWrites/:type", (req, res) => {
  writesModel
    .find({ type: req.params.type })
    .then((data) => res.send({ status: 200, data: data }))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log("server is running");
});
