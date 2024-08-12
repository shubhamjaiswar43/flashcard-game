require('dotenv').config();
const express = require('express');
const app = express();
const hostname = "127.0.0.1";
require('./db/connection');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ extended: true }));

app.get("/", async (req, res) => {
    res.send("Welcome To Flash Card Learning Tool");
})

app.use("/api/auth", require("./routes/auth"));
app.use("/api/flashcard", require("./routes/flashcard"));

app.listen(port, () => {
    console.log(`Server Is Running At http://${hostname}:${port}`);
});