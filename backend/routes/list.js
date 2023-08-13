const express = require("express");
const router = express.Router();
const {createBoard,pushTask,getboards,getsingleboard} = require("../controllers/listController")

// const bodyParser = require("body-parser"); 

// router.use(bodyParser.json());
// Get All Boards 
router.get("/", getboards);

// Get All single board By id
router.get("/:id", getsingleboard);


// Create Board
router.post("/create", createBoard);

// Push Tasks into the board
router.post("/pushTask", pushTask);

module.exports = router;

