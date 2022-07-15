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
    { label: "ประเภทซาก", key: "beeftype" },
    { label: "ทะเบียนขุน", key: "cownum" },
    { label: "รหัสซาก", key: "code" },
    { label: "รหัสบาร์โค้ด	", key: "barcode" },
    { label: "น้ำหนักอุ่น	", key: "weightwarm" },
    { label: "น้ำหนักเย็น", key: "weight" },
    { label: "วันหมดอายุ", key: "Expdate" },
    { label: "ห้อง (กก.)	", key: "beefroom" },
    { label: "ชั้น", key: "shelf" },
    { label: "ตะกร้า", key: "basket" },
    { label: "สถานะ", key: "status" },
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
