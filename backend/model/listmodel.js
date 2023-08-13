const mongoose = require("mongoose");

const Scehma = mongoose.Schema;

const boardSchema = new Scehma({
  boardName: {
    type: String,
    required: [true,"please Enter Differnet Name"],
    unique: true,
  },
  do: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      subtasks: [String],
      status: {
        type: String,
        enum: ["todo", "doing", "done"],
        default: "todo",
      },
    },
  ],
  doing: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      subtasks: [String],
      status: {
        type: String,
        enum: ["todo", "doing", "done"],
        default: "doing",
      },
    },
  ],
  done: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
      subtasks: [String],
      status: {
        type: String,
        enum: ["todo", "doing", "done"],
        default: "done",
      },
    },
  ],

});

boardSchema.statics.createDefaultBoard = async function (boardName) {
  const board = await this.create({
    boardName,
    doing: [],
    done: [],
    do: [],
  });

  return board;
};

module.exports = mongoose.model("Board", boardSchema);
