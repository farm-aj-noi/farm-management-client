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
    { label: "เจ้าของซาก", key: "lump.imslaughter.namefarmer" },
    { label: "ประเภทซาก", key: "lump.beeftype.nameTH" },
    { label: "วันที่นำเข้า", key: "importdate" },
    { label: "ทะเบียนขุน", key: "lump.imslaughter.numcow" },
    { label: "รหัสซาก", key: "lump.beeftype.code" },
    { label: "รหัสบาร์โค้ด", key: "lump.barcode" },
    { label: "น้ำหนัก (กก.)", key: "lump.weight" },
    { label: "ห้อง", key: "beefroom.roomname" },
    { label: "ชั้น", key: "shelf.shelfname" },
    { label: "ตะกร้า", key: "basket" },
    { label: "สถานะ", key: "lump.status.nameTH" },
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
