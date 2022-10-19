import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Modalqrcode from "../../12Qrcode/Import/imhqr";

function List_import({ imhalve }) {
  const [imhalveData, SetImhalveData] = useState(imhalve);
  // console.log(imhalveData.id);
  // if (data !== prod) setdata(prod); เก็บไว้ Test
  return (
    <tr style={{ textAlign: "center", fontSize: "16px" }}>
      <td >{imhalveData.halve.imslaughter.namefarmer}</td>
      <td >{imhalveData.halve.beeftype.nameTH}</td>
      <td >
        {dayjs(imhalveData.importdate)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(imhalveData.importdate)
          .locale("th")
          .add(543, "year")
          .format("h:mm:ss A")}
      </td>
      <td>{imhalveData.halve.imslaughter.numcow}</td>
      <td>{imhalveData.halve.beeftype.code}</td>
      <td>{imhalveData.barcode}</td>
      <td>
        <Modalqrcode key={imhalveData.id} listhalve={imhalveData} />
      </td>
      <td>{imhalveData.halve.weightwarm}</td>
      <td>
        {imhalveData.halve.weightcool ? imhalveData.halve.weightcool : "-"}
      </td>
      <td >{imhalveData.beefroom.roomname ? imhalveData.beefroom.roomname : "-"}</td>
      <td >{imhalveData.halve.status.nameTH}</td>
      <td >{imhalveData.user.name}</td>
    </tr>
  );
}

export default List_import;
