import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { ButtonExcel } from "../../ReportFrom";

import { CSVLink } from "react-csv";

import dayjs from "dayjs";
import "dayjs/locale/th";

const Excel_import = ({ prod }) => {
  const [data, setdata] = useState(prod);
  if (data !== prod) setdata(prod);
  const headers = [
    { label: "เจ้าของซาก", key: "entrail.imslaughter.namefarmer" },
    { label: "วันที่นำเข้า", key: "importdate" },
    { label: "ทะเบียนขุน", key: "entrail.beeftype.nameTH" },
    { label: "เครื่องใน", key: "entrail.offal" },
    { label: "ปลายเท้า", key: "entrail.toe" },
    { label: "หัว", key: "entrail.head" },
    { label: "หนังสด", key: "entrail.skin" },
    { label: "ตับ", key: "entrail.liver" },
    { label: "ไขมันอุ่น", key: "entrail.fat" },
    { label: "องแคล", key: "entrail.onkale" },
    { label: "หาง", key: "entrail.tail" },
    { label: "ถุงน้ำดี", key: "entrail.gallbladder" },
    { label: "เศษซาก", key: "entrail.scrap" },
    { label: "รหัสบาร์โค้ด", key: "entrail.barcode" },
    { label: "ผู้นำเข้า", key: "user.name" },
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

export default Excel_import;
