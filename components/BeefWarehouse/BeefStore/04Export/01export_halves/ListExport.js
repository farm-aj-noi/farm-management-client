import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";

const ListExport = ({ exhalve }) => {
  const [exhalveData, SetExhalveData] = useState(exhalve);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{exhalveData.halve.beeftype.nameTH}</td>
      <td>
        {dayjs(exhalveData.exportdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(exhalveData.exportdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{exhalveData.halve.imslaughter.numcow}</td>
      <td>{exhalveData.halve.beeftype.code}</td>
      <td>{exhalveData.halve.barcode}</td>
      <td>
        <Barcodebuttoncolor>
          <Qrcodebutton />
        </Barcodebuttoncolor>
      </td>
      <td>{exhalveData.halve.weightwarm}</td>
      <td>{/* exhalveData.beefroom.roomname */}</td>
      <td>-</td>
      <td>-</td>
      <td>{exhalveData.storestatus.nameTH}</td>
      <td>{exhalveData.exporter.name}</td>
      <td>{exhalveData.user.name}</td>
    </tr>
  );
};

export default ListExport;
