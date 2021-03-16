import React,{useState} from "react";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

const printPDF = ({ prod }) => {
  const [data, setdata] = useState(prod);
 const headers = [
    { label: "ใบแจ้งขุน", key: "numkun"},
    { label: "เบอร์โค", key: "numcow" },
    { label: "พันธุ์", key: "pun" },
    { label: "รหัสสมาชิก", key: "numfarmer" },
    { label: "ชื่อสมาชิก", key: "namefarmer" },
    { label: "น้ำหนักโค (กก.)", key: "weightstart" },
    { label: "วันรับเข้า", key: "date" },
  ];

  // console.log(data)

  // "รหัสสมาชิก",
  // "ชื่อสมาชิก",
  // "น้ำหนักโค (กก.)",
  // "ราคาประเมิน",
  // "วันที่รับเข้า",

  // const data = [
  //   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  //   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  //   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  // ];
  return (
    <CSVLink filename={dayjs().format('Report YYYYMMDDTHHmmss')+".csv" } data={data} headers={headers}>
      <input
      type="button"
      style={{ float: "right", marginBottom: "5px" }}
      value="print Excel"
    />
    </CSVLink>
  );
};

export default printPDF;
