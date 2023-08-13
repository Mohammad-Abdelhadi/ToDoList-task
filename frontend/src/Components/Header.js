import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [subtasks, setSubtasks] = useState("");
  const [boards, setBoards] = useState([]);

  const handleform = async (e) => {
    e.preventDefault();

    const newTask = { title, status, subtasks };

    try {
      const response = await fetch("/api/board/pushTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardId: "64d9314181e09589e78c1f53",
          task: newTask,
        }),
      });

      if (response.ok) {
        const updatedBoard = await response.json();
        // Refetch the updated board data
        const responseAfterUpdate = await fetch("/api/board/");
        const updatedBoardData = await responseAfterUpdate.json();
        // Update your state with the updated board data
        setBoards(updatedBoardData);
        console.log("Task added successfully");
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <>
      <header className="masthead">
        <div className="boards-menu">
          <button
            className="boards-btn btn"
            style={{
              padding: 0,
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <i className="fab fa-trello boards-btn-icon" />
            <Link to="/" className="boards">
              Boards
            </Link>
          </button>

          <div className="board-search">
            <input
              type="search"
              className="board-search-input"
              aria-label="Board Search"
            />
            <i className="fas fa-search search-icon" aria-hidden="true" />
          </div>
        </div>
        <div className="logo">
          <h1 style={{ marign: "0" }}>
            NixPend
            <i
              class="fa-solid fa-circle"
              style={{ color: "#249ea0", fontSize: "12px" }}
              aria-hidden="true"
            />
          </h1>
        </div>
        <div className="user-settings">
          <Popup
            trigger={
              <button className="add-list-btn btn">
                <i
                  className="fas fa-plus"
                  style={{ padding: "0px 4px" }}
                  aria-hidden="true"
                ></i>
                Add Task
              </button>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <div className="content">
                  <h2>Lets Add New Task!</h2>
                  <form onSubmit={handleform}>
                    <div className="form-group">
                      <label htmlFor="title">Task Title:</label>
                      <br />
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter task title.."
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Task Description:</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter task description.."
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subtasks">Subtasks:</label>
                      <input
                        type="text"
                        id="subtasks"
                        name="subtasks"
                        placeholder="Enter subtasks (comma-separated)..."
                        onChange={(e) => setSubtasks(e.target.value)} // Corrected onChange event
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="status">Task Status:</label>
                      <br />
                      <select
                        id="status"
                        name="status"
                        onChange={(e) => setStatus(e.target.value)} // Corrected onChange event
                        value={status}
                        required
                      >
                        <option value="">Please Select...</option>
                        <option value="todo">todo</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      id="custom-add-btn-style"
                      className="add-list-btn custom-style-add-list-btn btn"
                    >
                      Add Task
                    </button>
                  </form>
                </div>
                <div>
                  <button className="closemodal" onClick={() => close()}>Close modal</button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </header>
    </>
  );
};

export default Header;
