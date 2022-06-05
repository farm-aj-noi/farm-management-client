import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";

function List_import({ imhalve }) {
  const [imhalveData, SetImhalveData] = useState(imhalve);
  const [test, settest] = useState("");
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{imhalveData.halve.imslaughter.namefarmer}</td>
      <td>{imhalveData.halve.beeftype.nameTH}</td>
      <td>
        {dayjs(imhalveData.importdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(imhalveData.importdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{imhalveData.halve.imslaughter.numcow}</td>
      <td>{imhalveData.halve.beeftype.code}</td>
      <td>{imhalveData.barcode}</td>
      <td>
        <Barcodebuttoncolor>
          <Qrcodebutton />
        </Barcodebuttoncolor>
      </td>
      <td>{imhalveData.halve.weightwarm}</td>
      <td>{imhalveData.halve.weightcool}</td>
      <td>{imhalveData.beefroom.roomname}</td>
      <td>-</td>
      <td>-</td>
      <td>{imhalveData.halve.status.nameTH}</td>
      <td>{imhalveData.user.name}</td>
    </tr>
  );
}

export default List_import;
