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
    { label: "ประเภทซาก", key: "chop.beeftype.nameTH" },
    { label: "วันที่เบิกออก", key: "exportdate" },
    { label: "ทะเบียนขุน", key: "chop.imslaughter.numcow" },
    { label: "รหัสซาก", key: "chop.beeftype.code" },
    { label: "รหัสบาร์โค้ด", key: "chop.barcode" },
    { label: "น้ำหนัก", key: "chop.weight" },
    { label: "สถานะ", key: "storestatus.nameTH" },
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
