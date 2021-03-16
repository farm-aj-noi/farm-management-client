import React,{useState} from "react";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

const printPDF = ({ prod }) => {
  const [data, setdata] = useState(prod);
 const headers = [
    { label: "ใบแจ้งขุน", key: "imslaughter.numkun" },
    { label: "เครื่องใน", key: "offal" },
    { label: "ปลายเท้า", key: "toe" },
    { label: "หัว", key: "head" },
    { label: "ตับ", key: "liver" },
    { label: "ไขมันอุ่น", key: "fat" },
    { label: "องเคล", key: "onkale" },
    { label: "หาง", key: "tail" },
    { label: "ถุงน้ำดี", key: "gallbladder" },
    { label: "เศษซาก", key: "scrap" },
    { label: "หนังสด", key: "skin" },
  ];

  // console.log(data)

  // const data = [
  //   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  //   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  //   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  // ];
  return (
    <CSVLink  filename={dayjs().format('Report YYYYMMDDTHHmmss')+".csv" } data={data} headers={headers}>
      <input
      type="button"
      style={{ float: "right", marginBottom: "5px" }}
      value="print Excel"
    />
    </CSVLink>
  );
};

export default printPDF;
