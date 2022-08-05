import React,{useState,useEffect} from "react";

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
import dayjs from "dayjs";


const test = [
  {
    "day": "2022-07-27",
    "export": 6,
    "import": 14
  },
  {
    "day": "2022-07-28",
    "export": 2,
    "import": 0
  },
  {
    "day": "2022-07-29",
    "export": 1,
    "import": 0
  },
  {
    "day": "2022-07-30",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-07-31",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-01",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-02",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-03",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-04",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-05",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-06",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-07",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-08",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-09",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-10",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-11",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-12",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-13",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-14",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-15",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-16",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-17",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-18",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-19",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-20",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-21",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-22",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-23",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-24",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-25",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-26",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-27",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-28",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-29",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-30",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-08-31",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-01",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-02",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-03",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-04",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-05",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-06",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-07",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-08",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-09",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-10",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-11",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-12",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-13",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-14",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-15",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-16",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-17",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-18",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-19",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-20",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-21",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-22",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-23",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-24",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-25",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-26",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-27",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-28",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-29",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-09-30",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-01",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-02",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-03",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-04",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-05",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-06",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-07",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-08",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-09",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-10",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-11",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-12",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-13",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-14",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-15",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-16",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-17",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-18",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-19",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-20",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-21",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-22",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-23",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-24",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-25",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-26",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-27",
    "export": 0,
    "import": 0
  },
  {
    "day": "2022-10-28",
    "export": 0,
    "import": 0
  }
];

const data = {
  labels: [
 
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
      data: [],
    },
    {
      label: "นำออก",
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
      data: [],
    },
  
  ],
};

const index = () => {

  const [DataChart, setDataChart] = useState({ labels: [],
    datasets: [
    {
      label: "นำเข้า",
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      data: [10],
    },
    {
      label: "นำออก",
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      data: [5],
    },


  ],})

  const initChart = (data) => {


    let datecheckmonth = null;

    let labels = [];
    let data1 = [];
    let data2 = []
   
    data.forEach(e=> {
      if(datecheckmonth == null ||(dayjs(datecheckmonth).month() != dayjs(e.day).month()) ){
        labels.push(dayjs(e.day).format('MMMM'));
        data1.push(e.import ?? 0);
        data2.push(e.export ?? 0);
        datecheckmonth = dayjs(e.day);
      } else {
        data1[data1.length - 1] += e.import ?? 0;
        data2[data2.length - 1] += e.export ?? 0;
      }
    });
    
    // let labels = [];
    // let data1 = [];
    // let data2 = []
    // data.forEach(e => {
    //   labels.push(e.day ?? '');
    //   data2.push(e.export ?? 0);
    //   data1.push(e.import ?? 0);
    // });
    let newChart =JSON.parse(JSON.stringify(DataChart))  ;
    newChart.labels = labels;
    newChart.datasets[0].data = data1;
    newChart.datasets[1].data = data2;
    setDataChart(newChart);
    // return newChart;
  }

  

  useEffect(()=>{
  initChart(test);

    // setcount(api.data.count) // api.data.count from api after update store
  },[test])

  console.log({DataChart})

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
          <Line data={DataChart} width={400} height={200} />
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
