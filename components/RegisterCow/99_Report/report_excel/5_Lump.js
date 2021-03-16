import React,{useState} from "react";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

const printPDF = ({ prod }) => {
  const [data, setdata] = useState(prod);
 const headers = [
    { label: "บาร์โค๊ด", key: "barcode" },
    { label: "ประเภทเนื้อ", key: "beeftype.nameTH" },
    { label: "เกรด", key: "imslaughter.grade" },
    { label: "น้ำหนัก", key: "weight" },
    { label: "ราคา", key: "price" },
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
