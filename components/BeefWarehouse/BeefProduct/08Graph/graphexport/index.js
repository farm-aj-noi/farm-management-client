import React, { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import Chart from "chart.js/auto";

import Paper_Graph from "./Paper_Graph";


import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import dayjs from "dayjs";

const QUERYDATAGRAPH = gql`
query QUERYDATAGRAPH($startdate: String, $enddate: String) {
  productGraph(startdate: $startdate, enddate: $enddate) {
    day
    export
    import
  }
}
`;

const index = () => {
  const [startdate, setStartdate] = useState();
  const [enddate, setEnddate] = useState();

  const { data: datagraph } = useQuery(QUERYDATAGRAPH, {
    variables: {
      startdate: startdate ? startdate : dayjs().startOf('year').format('YYYY-MM-DD'),
      enddate: enddate ? enddate : dayjs().endOf('year').format('YYYY-MM-DD'),
    }
  })

  const [DataChart, setDataChart] = useState({
    labels: [],
    datasets: [
      {
        label: "นำเข้า",
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
        data: [],
      },
      {
        label: "นำออก",
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
        data: [],
      },
    ],
  })

  const initChart = (data) => {
    // console.log(data)
    let datecheckmonth = null;
    let labels = [];
    let data1 = [];
    let data2 = [];

    data.forEach(e => {
      if (datecheckmonth == null || (dayjs(datecheckmonth).month() != dayjs(e.day).month())) {
        labels.push(dayjs(e.day).format('MMMM'));
        data1.push(e.import ?? 0);
        data2.push(e.export ?? 0);
        datecheckmonth = dayjs(e.day);
      } else {
        data1[data1.length - 1] += e.import ?? 0;
        data2[data2.length - 1] += e.export ?? 0;
      }
    });




    let newChart = JSON.parse(JSON.stringify(DataChart));
    newChart.labels = labels;
    newChart.datasets[0].data = data1;
    newChart.datasets[1].data = data2;
    setDataChart(newChart);
    return newChart;
  }


  const initChartyear = (data) => {
    let datecheckyear = null;
    let labels = [];
    let data1 = [];
    let data2 = [];
    data.forEach(e => {
      if (datecheckyear == null || (dayjs(datecheckyear).year() != dayjs(e.day).year())) {
        labels.push(dayjs(e.day).locale("th").add(543, "year").format('YYYY'));
        data1.push(e.import ?? 0);
        data2.push(e.export ?? 0);
        datecheckyear = dayjs(e.day);

      } else {
        data1[data1.length - 1] += e.import ?? 0;
        data2[data2.length - 1] += e.export ?? 0;
      }
    });
    let newChart = JSON.parse(JSON.stringify(DataChart));
    newChart.labels = labels;
    newChart.datasets[0].data = data1;
    newChart.datasets[1].data = data2;
    setDataChart(newChart);
    return newChart;
  }


  const initChartday = (data) => {

    let labels = [];
    let data1 = [];
    let data2 = [];

    data.forEach(e => {
      labels.push(e.day ?? '');
      data2.push(e.export ?? 0);
      data1.push(e.import ?? 0);
    });


    let newChart = JSON.parse(JSON.stringify(DataChart));
    newChart.labels = labels;
    newChart.datasets[0].data = data1;
    newChart.datasets[1].data = data2;
    setDataChart(newChart);
    return newChart;
  }

  const [selectgraph, setSelectgraph] = useState("");
  // console.log(selectgraph);

  useEffect(() => {
    if (selectgraph == 1) {
      if (datagraph) {
        initChartday(datagraph.productGraph);
      }
    }
    else if (selectgraph == 2) {
      if (datagraph) {
        initChart(datagraph.productGraph);
      }
    }
    else if (selectgraph == 3) {
      if (datagraph) {
        initChartyear(datagraph.productGraph);
      }
    }
    else {
      if (datagraph) {
        initChart(datagraph.productGraph);
      }
    }
    // console.log(selectgraph)
    // setcount(api.data.count) // api.data.count from api after update store
  }, [datagraph])
  // console.log({ DataChart })
  return (
    <>
      <div>
        <div style={{ marginLeft: "10px" }}>
          <form style={{ marginBottom: "20px" }}>
            <label
              for="graph"
              style={{
                textAlign: "center",
                fontSize: "18px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              รูปแบบกราฟ
            </label>
            <select
              name="graph"
              style={{
                height: "35px",
                width: "120px",
                border: "1px solid #AFAFAF",
                borderRadius: "4px",
                textAlign: "center",
                fontSize: "16px",
              }}
              onChange={(event) => setSelectgraph(event.target.value)}
            >
              <option value="">เลือก</option>
              <option value="1">รายวัน</option>
              <option value="2">รายเดือน</option>
              <option value="3">รายปี</option>
            </select>
            <label
              for="date"
              style={{
                textAlign: "center",
                fontSize: "18px",
                marginRight: "10px",
                marginLeft: "10px"
              }}
            >
              วันที่
            </label>
            <input
              type="date"
              name="startdate"
              style={{
                height: "35px",
                border: "1px solid #AFAFAF",
                borderRadius: "4px",
                textAlign: "center",
                fontSize: "16px",
              }}
              onChange={(event) => setStartdate(event.target.value)}
            ></input>
            <label
              for="date"
              style={{
                textAlign: "center",
                fontSize: "18px",
                margin: "10px 10px",
              }}
            >
              ถึงวันที่
            </label>
            <input
              type="date"
              name="enddate"
              style={{
                height: "35px",
                border: "1px solid #AFAFAF",
                borderRadius: "4px",
                textAlign: "center",
                fontSize: "16px",
              }}
              onChange={(event) => setEnddate(event.target.value)}
            ></input>

          </form>
          <Line data={DataChart} height={100} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <Paper_Graph />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
