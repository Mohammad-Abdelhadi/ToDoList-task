import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Boardinfo from "../Components/Boardinfo";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import "./main.css";
const Main = () => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setLoading] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch("/api/board/");
        const json = await response.json();
        setBoards(json);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, [boards]);

  return (
    <div>
      <>
        {/* Masthead */}

        <Header />

        {/* End of masthead */}

        {/* Board info bar */}
        <Boardinfo />

        {/* End of board info bar */}

        {/* Lists container */}
        <section className="lists-container">
          <div className="list">
            {boards.map((board) => (
              <div key={board._id}>
                <ul className="list-items">
                  <h3 className="list-title">Todo </h3>
                  {board.do.map((todo) => (
                    <li>
                      <div className="customize_tasks">
                        <p style={{ marginBottom: "10px" }} key={todo._id}>
                          {todo.title}
                        </p>
                      </div>
                      <span style={{ padding: "7px" }}>
                        0 of {todo.subtasks.length}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="list">
            {boards.map((board) => (
              <div key={board._id}>
                <h3 className="list-title">doing</h3>
                <ul className="list-items">
                  {board.doing.map((doing) => (
                    <li>
                    <div className="customize_tasks">
                      <p style={{ marginBottom: "10px" }} key={doing._id}>
                        {doing.title}
                      </p>
                    </div>
                    <span style={{ padding: "7px" }}>
                      0 of {doing.subtasks.length}
                    </span>
                  </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="list">
            {boards.map((board) => (
              <div key={board._id}>
                <h3 className="list-title">Done</h3>
                <ul className="list-items">
                  {board.done.map((done) => (
                     <li>
                     <div className="customize_tasks">
                       <p style={{ marginBottom: "10px" }} key={done._id}>
                         {done.title}
                       </p>
                     </div>
                     <span style={{ padding: "7px" }}>
                       0 of {done.subtasks.length}
                     </span>
                   </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div></div>
        </section>
        {/* End of lists container */}
      </>
    </div>
  );
};

export default Main;
