import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { Ex } from "../../../utils/Logograde";

import dayjs from "dayjs";
import "dayjs/locale/th";
{/* <Ex prod={data.finalGrade} height="30px" weight="30px" /> */}
function ReportExcel({ prod }) {
  const [data, setdata] = useState(prod);
  if (data !== prod) setdata(prod);
  const headers = [
    { label: "รหัสซากโค", key: "beeftype.code" },
    { label: "บาร์โค้ด", key: "barcode" },
    { label: "น้ำหนักอุ่น Kg.", key: "weightwarm" },
    { label: "วันที่เข้าบ่ม", key: "chill[0].chilldateStart" },
    { label: "วันที่ตัดเกรด", key: "chill[0].chilldateEnd" },
    { label: "ห้องบ่ม", key: "chill[0].chillroom.roomnum" },
    { label: "สายพันธุ์", key: "imslaughter.pun" },
    { label: "เกรดจากระบบ", key: "grade[0].SystemGrade" },
    { label: "เกรดจากผู้เชี่ยวชาญ", key: "grade[0].ExpertGrade" },
  ];
  return (
    <CSVLink
      filename={dayjs().format("Report YYYYMMDDTHHmmss") + ".csv"}
      data={data}
      headers={headers}
    >
      <button style={{border: "none", backgroundColor: "#fff"}}>
      <Ex height="40px" weight="40px" />
      </button>
    </CSVLink>
  );
}

export default ReportExcel;
