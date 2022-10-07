import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { ButtonExcel } from "../../ReportFrom";

import { CSVLink } from "react-csv";

import dayjs from "dayjs";
import "dayjs/locale/th";


const Excel_store = ({ prod }) => {
  const [data, setdata] = useState(prod);
  if (data !== prod) setdata(prod);
  const headers = [
    { label: "ทะเบียนขุน", key: "cownum" },
    { label: "เครื่องใน", key: "offal" },
    { label: "ปลายเท้า", key: "toe" },
    { label: "หัว	", key: "head" },
    { label: "หนังสด	", key: "skin" },
    { label: "ตับ", key: "liver" },
    { label: "ไขมันอุ่น", key: "fat" },
    { label: "องแคล (กก.)	", key: "onkale" },
    { label: "หาง", key: "tail" },
    { label: "ถุงน้ำดี", key: "gallbladder" },
    { label: "เศษซาก", key: "scrap" },
    { label: "รหัสบาร์โค้ด", key: "barcode" },
    { label: "วันหมดอายุ", key: "Expdate" },
    { label: "ห้อง", key: "beefroom" },
  ];
  return (
    <CSVLink
      filename={dayjs().format("Report YYYYMMDDTHHmmss") + ".csv"}
      data={data}
      headers={headers}
    >
      <ButtonExcel>
        <Icon
          style={{ verticalAlign: "text-bottom", marginRight: "5px" }}
          icon={printer}
          size={20}
        />
        รายงานExcel
      </ButtonExcel>
    </CSVLink>
  );
};

export default Excel_store;
