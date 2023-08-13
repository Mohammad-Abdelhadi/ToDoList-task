import React from "react";
import { Link } from "react-router-dom";
const Boardinfo = () => {
  return (
    <>
      <section className="board-info-bar" style={{ margin: "1.5rem 0" }}>
        <div className="board-controls">
          <button className="board-title btn">
            <h2>
              <Link
                class="personal-btn btn"
                style={{ textDecoration: "none" }}
                to="/"
              >
                Web Development
              </Link>
            </h2>
          </button>
          <button className="personal-btn btn">
            <Link
              class="personal-btn btn"
              style={{ textDecoration: "none" }}
              to="/charts"
            >
              {" "}
              Marketing Plan
            </Link>
          </button>
          <button className="private-btn btn">
            <i
              className="fas fa-briefcase private-btn-icon"
              aria-hidden="true"
            />
            Private
          </button>
        </div>
      </section>
    </>
  );
};

export default Boardinfo;
