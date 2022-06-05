import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { ButtonExcel } from "../../ReportFrom";

import { CSVLink } from "react-csv";

import dayjs from "dayjs";
import "dayjs/locale/th";

const Excel_export = ({ prod }) => {
  const [data, setdata] = useState(prod);
  if (data !== prod) setdata(prod);
  const headers = [
    { label: "ประเภทซาก", key: "halve.beeftype.nameTH" },
    { label: "วันที่เบิกออก", key: "exportdate" },
    { label: "ทะเบียนขุน", key: "halve.imslaughter.numcow" },
    { label: "รหัสซาก", key: "halve.beeftype.code" },
    { label: "รหัสบาร์โค้ด", key: "halve.barcode" },
    { label: "น้ำหนัก (กก.)", key: "halve.weightwarm" },
    { label: "สถานะ", key: "storestatus.nameTH" },
    { label: "ผู้ขอเบิก", key: "exporter" },
    { label: "ผู้เบิกออก", key: "user.name" },
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

export default Excel_export;
/* "ประเภทซาก",
"วันที่เบิกออก",
"ทะเบียนขุน",
"รหัสซาก",
"รหัสบาร์โค้ด",
"น้ำหนัก",
"สถานะ",
"ผู้เบิกออก",

"halve.beeftype.nameTH",
"exportdate",
"halve.imslaughter.numcow",
"halve.beeftype.code",
"halve.barcode",
"halve.weightwarm",
"storestatus.nameTH",
"user.name", */
