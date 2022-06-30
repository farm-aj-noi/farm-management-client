import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { ButtonExcel } from "../ReportFrom";

import { CSVLink } from "react-csv";

import dayjs from "dayjs";
import "dayjs/locale/th";

const excel = ({ prod }) => {
  const [data, setdata] = useState(prod);
  if (data !== prod) setdata(prod);
  const headers = [
    { label: "ประเภทสินค้า", key: "producttype" },
    { label: "รหัสสินค้า", key: "code" },
    { label: "รหัสบาร์โค้ด", key: "barcode" },
    { label: "น้ำหนัก (กก.)", key: "weight" },
    { label: "วันที่ผลิต	", key: "MFG" },
    { label: "วันหมดอายุ	", key: "BBE" },
    { label: "ห้อง", key: "productroom" },
    { label: "ตู้แช่", key: "freezer" },
    { label: "ชั้นวาง", key: "pbasket" },
  ];
  return (
    <CSVLink
      filename={dayjs().format("Report YYYYMMDDTHHmmss") + ".csv"}
      data={data}
      headers={headers}
    >
      <ButtonExcel type="button" value="print Excel">
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

export default excel;
