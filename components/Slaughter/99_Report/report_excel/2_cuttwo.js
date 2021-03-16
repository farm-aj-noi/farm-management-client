import React,{useState} from "react";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

const printPDF = ({ prod }) => {
  const [data, setdata] = useState(prod);
 const headers = [
    { label: "ใบแจ้งขุน", key: "imslaughter.numkun" },
    { label: "บาร๋โค๊ด", key: "barcode" },
    { label: "ชื่อสมาชิก", key: "imslaughter.namefarmer" },
    { label: "น้ำหนัก (กก.)", key: "weightwarm" },
  ];

  // console.log(data)

  // "ใบแจ้งขุน",
  // "ชื่อสมาชิก",
  // "บาร๋โค๊ด",
  // "ประเภทเนื้อ",
  // "น้ำหนัก (กก.)",
  // "วันเชือด",

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
