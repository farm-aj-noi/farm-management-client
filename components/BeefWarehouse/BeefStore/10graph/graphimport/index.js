import React from "react";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../GraphFrom";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";

import Paper_Graph from "./Paper_Graph";
import { Table } from "react-bootstrap";
import Stat from "./statistics";

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "ซากโคผ่าซีก",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 7,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40, 20, 11, 60, 62, 100],
    },
    {
      label: "ซากโคสี่เสี้ยว",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgb(255,0,0,0.4)",
      borderColor: "rgb(255,0,0)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "	rgb(255,0,0)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 7,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(255,0,0)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [45, 67, 72, 10, 52, 51, 60, 40, 78, 89, 70, 72],
    },
    {
      label: "ก้อนเนื้อ",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#fed48a",
      borderColor: "#ffa60b",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#ffa60b",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 7,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#ffa60b",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [25, 37, 12, 40, 22, 11, 40, 50, 28, 59, 60, 62],
    },
    {
      label: "ชิ้นเนื้อ",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#ad81ff",
      borderColor: "#6a19ff",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#6a19ff",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 7,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#6a19ff",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [15, 47, 62, 33, 22, 55, 32, 21, 38, 69, 80, 92],
    },
    {
      label: "ส่วนอื่น ๆ ",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "#6497ff",
      borderColor: "#0b5bff",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#0b5bff",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 7,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#0b5bff",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [5, 12, 13, 11, 12, 14, 15, 20, 25, 33, 29, 35],
    },
  ],
};

const index = () => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: " 800px 350px",
          gridRowGap: "15px",
          marginTop: "10px",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          <Line data={data} width={400} height={200} />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <Stat />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <Paper_Graph />
      </div>
    </>
  );
};

export default index;
