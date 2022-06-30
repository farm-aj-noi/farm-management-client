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
    { label: "ประเภทสินค้า", key: "beefproduct.producttype.nameTH" },
    { label: "วันที่นำเข้า", key: "importdate" },
    { label: "รหัสสินค้า", key: "beefproduct.producttype.code" },
    { label: "รหัสบาร์โค้ด", key: "beefproduct.barcode" },
    { label: "น้ำหนัก (กก.)	", key: "beefproduct.weight" },
    { label: "วันที่ผลิต	", key: "beefproduct.MFG" },
    { label: "วันหมดอายุ", key: "beefproduct.BBE" },
    { label: "ห้อง", key: "productroom.roomname" },
    { label: "ตู้แช่", key: "freezer.freezername" },
    { label: "ชั้นวาง", key: "pbasket" },
    { label: "ผู้นำเข้า", key: "user.name" },
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
