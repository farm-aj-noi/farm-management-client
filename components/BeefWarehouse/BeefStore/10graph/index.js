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
import { Table } from "react-bootstrap";

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

/* const data1 = {
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
}; */

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
            ราลละเอียดข้อมูลสถิติ นำเข้า-นำออก
          </DivFromTop>
          <DivFromDown>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginTop: "10px" }}>
                <Line data={data} width={500} height={300} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "60px",
                  }}
                >
                  <Paper_Graph />
                </div>
              </div>
              <div>
                <h1 style={{ textAlign: "center", fontSize: "24px" }}>
                  สถิติการนำเข้า
                </h1>
                <div style={{ height: "550px", overflowY: "auto" }}>
                  <Table
                    striped
                    bordered
                    responsive
                    hover
                    style={{ margin: "auto" }}
                  >
                    <thead>
                      <tr style={{ textAlign: "center" }}>
                        <th>ลำดับ</th>
                        <th>ประเภท</th>
                        <th>จำนวน</th>
                        <th>น้ำหนัก (กิโลกรัม)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ textAlign: "center" }}>
                        <td>1</td>
                        <td>ซากซ้าย</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>2</td>
                        <td>ซากขวา</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>3</td>
                        <td>ซากซ้ายบน</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>4</td>
                        <td>ซากซ้ายล่าง</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>5</td>
                        <td>ซากขวาบน</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>6</td>
                        <td>ซากขวาล่าง</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>7</td>
                        <td>ก้อนเนื้อ</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>8</td>
                        <td>ชิ้นเนื้อ</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>9</td>
                        <td>ส่วนอื่น ๆ</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
              <div>
                <h1 style={{ textAlign: "center", fontSize: "24px" }}>
                  สถิติการนำเข้า
                </h1>
                <div style={{ height: "550px", overflowY: "auto" }}>
                  <Table
                    striped
                    bordered
                    responsive
                    hover
                    style={{ margin: "auto" }}
                  >
                    <thead>
                      <tr style={{ textAlign: "center" }}>
                        <th>ลำดับ</th>
                        <th>ประเภท</th>
                        <th>จำนวน</th>
                        <th>น้ำหนัก (กิโลกรัม)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ textAlign: "center" }}>
                        <td>1</td>
                        <td>ซากซ้าย</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>2</td>
                        <td>ซากขวา</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>3</td>
                        <td>ซากซ้ายบน</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>4</td>
                        <td>ซากซ้ายล่าง</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>5</td>
                        <td>ซากขวาบน</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>6</td>
                        <td>ซากขวาล่าง</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>7</td>
                        <td>ก้อนเนื้อ</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>8</td>
                        <td>ชิ้นเนื้อ</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>9</td>
                        <td>ส่วนอื่น ๆ</td>
                        <td>0</td>
                        <td>0 / 0</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </DivFromDown>
        </DivFrom>
        {/*  <div style={{ paddingTop: "10px" }}>
          <Line data={data1} width={1500} height={500} />
        </div> */}
      </DivBase>
    </>
  );
};

export default index;
