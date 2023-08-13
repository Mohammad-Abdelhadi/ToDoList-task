const Board = require("../model/listmodel");

// Create New Board
const createBoard = async (req, res) => {
  const { boardName } = req.body;

  const newBoard = await Board.createDefaultBoard(boardName);

  res.status(201).json(newBoard);
};

//Get All Boards
const getboards = async (req, res) => {
  const newBoard = await Board.find({});

  try {
    res.status(200).json(newBoard);
  } catch (error) {
    res.status(400).json({ message: "theres No boards!" });
  }
};

//Get single Board (id)
const getsingleboard = async (req, res) => {
  const { id } = req.params; // Use req.params instead of req.body to get the id
  try {
    const board = await Board.findById(id); // Use "id" instead of "{ id: _id }"

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the board" });
  }
};



// Push Task in board depend in the id
const pushTask = async (req, res) => {
  const { boardId, task } = req.body;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    let taskList;

    switch (task.status) {
      case "todo":
        taskList = board.do;
        break;
      case "doing":
        taskList = board.doing;
        break;
      case "done":
        taskList = board.done;
        break;

      default:
        throw new Error("Invalid status for task");
    }

    taskList.push(task);

    await board.save();

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createBoard,
  pushTask,
  getboards,
  getsingleboard
};
