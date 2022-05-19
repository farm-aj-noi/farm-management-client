import React, { useState } from "react";

import { Icon } from "react-icons-kit";
import { printer } from "react-icons-kit/ikons/printer";

import { CSVLink } from "react-csv";

import { ButtonExcel } from "../../ReportFrom";

import dayjs from "dayjs";
import 'dayjs/locale/th'

const Excel_import = ({ prod }) => {
  const [data, setdata] = useState(prod);
  if (data !== prod) setdata(prod);

  const headers = [
    { label: "เจ้าของซาก", key: "halve.imslaughter.namefarmer" },
    { label: "ประเภทซาก", key: "halve.beeftype.nameTH" },
    { label: "วันที่นำเข้า", key: "importdate" },
    { label: "ทะเบียนขุน", key: "halve.imslaughter.numcow" },
    { label: "รหัสซาก", key: "halve.beeftype.code" },
    { label: "รหัสบาร์โค้ด", key: "halve.barcode" },
    { label: "น้ำหนัก", key: "halve.weightwarm" },
    { label: "สถานะ", key: "halve.status.nameTH" },
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

export default Excel_import;
