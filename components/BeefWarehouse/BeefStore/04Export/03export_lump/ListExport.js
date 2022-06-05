import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";

const ListExport = ({ exlump }) => {
  const [exlumpData, SetExLumpData] = useState(exlump);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{exlumpData.lump.beeftype.nameTH}</td>
      <td>
        {dayjs(exlumpData.exportdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(exlumpData.exportdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{exlumpData.lump.imslaughter.numcow}</td>
      <td>{exlumpData.lump.beeftype.code}</td>
      <td>{exlumpData.lump.barcode}</td>
      <td>
        <Barcodebuttoncolor>
          <Qrcodebutton />
        </Barcodebuttoncolor>
      </td>
      <td>{exlumpData.lump.weight}</td>

      <td>{exlumpData.storestatus.nameTH}</td>
      <td>{exlumpData.exporter}</td>
      <td>{exlumpData.user.name}</td>
    </tr>
  );
};

export default ListExport;
