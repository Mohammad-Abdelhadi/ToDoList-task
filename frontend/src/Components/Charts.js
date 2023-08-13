import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Boardinfo from "./Boardinfo";
import Header from "./Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch("/api/board");
        const json = await response.json();

        if (response.ok) {
          setBoards(json);
        }
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, [boards]);

  const todoCount = boards.reduce((count, board) => count + board.do.length, 0);

  const doingCount = boards.reduce(
    (count, board) => count + board.doing.length,
    0
  );

  const doneCount = boards.reduce(
    (count, board) => count + board.done.length,
    0
  );

  const labels = ["Do", "Doing", "Done",];

  const options = {
    scales: {
      x: {
        ticks: {
          stepSize: 1,
        },
      },
    },
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chart Of To Do List",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [todoCount, doingCount, doneCount],
        borderColor: "#fff",
        backgroundColor: "#635dc2",
        hoverBackgroundColor: "#000"
      },
      
    ],
   
  };

  return (
    <>
      <Header />
      <Boardinfo />
      <div style={{ width: "50%" }}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export default Charts;
