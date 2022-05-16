import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";

const ListExport = ({ exchop }) => {
  const [exchopData, SetExChopData] = useState(exchop);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{exchopData.chop.beeftype.nameTH}</td>
      <td>
        {dayjs(exchopData.exportdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(exchopData.exportdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{exchopData.chop.imslaughter.numcow}</td>
      <td>{exchopData.chop.beeftype.code}</td>
      <td>{exchopData.chop.barcode}</td>
      <td>
        <Barcodebuttoncolor>
          <Qrcodebutton />
        </Barcodebuttoncolor>
      </td>
      <td>{exchopData.chop.weight}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{exchopData.storestatus.nameTH}</td>
      <td></td>
      <td>{exchopData.user.name}</td>
    </tr>
  );
};

export default ListExport;
