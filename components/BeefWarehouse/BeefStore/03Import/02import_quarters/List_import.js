import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Import/imqqr";

function List_import({ imquarter }) {
  const [imquarterData, SetImhalveData] = useState(imquarter);
  const tdStyle = {
    fontSize: "16px"
  }
  return (
    <tr style={{ textAlign: "center", fontSize: "16px" }}>
      <td>{imquarterData.quarter.imslaughter.namefarmer}</td>
      <td>{imquarterData.quarter.beeftype.nameTH}</td>
      <td>
        {dayjs(imquarterData.importdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(imquarterData.importdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{imquarterData.quarter.imslaughter.numcow}</td>
      <td>{imquarterData.quarter.beeftype.code}</td>
      <td>{imquarterData.quarter.barcode}</td>
      <td>
        <Modalqrcode key={imquarterData.id} listquarter={imquarterData} />
      </td>
      <td>{imquarterData.quarter.weight}</td>
      <td>{imquarter.beefroom.roomname}</td>
      <td>{imquarterData.quarter.status.nameTH}</td>
      <td>{imquarterData.user.name}</td>
    </tr>
  );
}

export default List_import;
