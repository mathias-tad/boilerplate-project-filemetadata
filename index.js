require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = 9999;

app.use(express.static(`${process.cwd()}/public`));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

const uploadedFile = multer({ dest: "/api/fileanaluse" });

app.post("/api/fileanalyse", uploadedFile.single("upfile"), (req, res) => {
  const file = req.file;
  res.json({ name: file.originalname, type: file.mimetype, size: file.size });
});

app.listen(PORT, () => {
  console.log(`Listenning to port: ${PORT}`);
});
