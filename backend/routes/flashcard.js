const express = require("express")
const routes = express.Router();
const { getFlashCard, addFlashCard, updateFlashCard, deleteFlashCard } = require("../controllers/flashcard.js");
const { fetchuser } = require("../middleware/fetchuser.js")

routes.get('/get', getFlashCard);
routes.post("/add", fetchuser, addFlashCard);
routes.put("/update/:id", fetchuser, updateFlashCard);
routes.delete("/update/:id", fetchuser, deleteFlashCard);

module.exports = routes;