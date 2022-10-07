import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { ButtonExcel } from "../ReportFrom";

import { CSVLink } from "react-csv";

import dayjs from "dayjs";
import "dayjs/locale/th";

const Excel_chill = ({ prod }) => {
  const [data, setdata] = useState(prod);
  if (data !== prod) setdata(prod);
  const headers = [
    { label: "ผู้บ่มซาก", key: "halve.beeftype.nameTH" },
    { label: "วันที่บ่ม", key: "chilldateStart" },
    { label: "วันที่บ่มเสร็จ", key: "chilldateEnd" },
    { label: "ประเภทซาก", key: "halve.imslaughter.numcow" },
    { label: "จำนวนวันที่บ่ม	", key: "chillday.day" },
    { label: "ทะเบียนขุน	", key: "halve.imslaughter.numcow" },
    { label: "รหัสซาก", key: "halve.beeftype.code" },
    { label: "รหัสบาร์โค้ด", key: "halve.barcode" },
    { label: "น้ำหนักอุ่น (กก.)	", key: "halve.weightwarm" },
    { label: "ห้องบ่ม", key: "chillroom.roomnum" },
    { label: "สถานะ", key: "chillstatus.nameTH" },
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

export default Excel_chill;
