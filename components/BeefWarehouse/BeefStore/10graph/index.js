import React from "react";

import { DivBase } from "../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "./GraphFrom";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";

import Paper_Graph from "./Paper_Graph";

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
      label: "นำเข้า",
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
      label: "เบิกออก",
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
  ],
};

export const index = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          รายละเอียดกราฟ
        </HeaderColor>
      </div>
      <DivBase>
        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ราลละเอียดข้อมูลกราฟคงคลังยอด นำเข้า-นำออก แต่ละเดือน
          </DivFromTop>
          <DivFromDown>
            <div style={{paddingTop:"10px"}}>
              <Line data={data} width={1500} height={500} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "60px",
              }}
            >
              <Paper_Graph />
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </>
  );
};

export default index;
