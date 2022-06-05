import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";

function List_import({ imlump }) {
  const [imlumpData, SetImhalveData] = useState(imlump);
  console.log(imlumpData);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{imlumpData.lump.imslaughter.namefarmer}</td>
      <td>{imlumpData.lump.beeftype.nameTH}</td>
      <td>
        {dayjs(imlumpData.importdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(imlumpData.importdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{imlumpData.lump.imslaughter.numcow}</td>
      <td>{imlumpData.lump.beeftype.code}</td>
      <td>{imlumpData.lump.barcode}</td>
      <td>
        <Barcodebuttoncolor>
          <Qrcodebutton />
        </Barcodebuttoncolor>
      </td>
      <td>{imlumpData.lump.weight}</td>
      <td>{imlumpData.beefroom.roomname}</td>
      <td>{imlumpData.shelf.shelfname}</td>
      <td>{imlumpData.basket}</td>
      <td>{imlumpData.lump.status.nameTH}</td>
      <td>{imlumpData.user.name}</td>
    </tr>
  );
}

export default List_import;
