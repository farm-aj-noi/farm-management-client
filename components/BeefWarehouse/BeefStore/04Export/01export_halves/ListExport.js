import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Modalqrcode from "../../12Qrcode/Export/exhqr";
const ListExport = ({ exhalve }) => {
  const [exhalveData, SetExhalveData] = useState(exhalve);

  return (
    <tr style={{ textAlign: "center" }}>
      <td>{exhalveData.halve.beeftype.nameTH}</td>
      <td>
        {dayjs(exhalveData.exportdate)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(exhalveData.exportdate)
          .locale("th")
          .add(543, "year")
          .format("h:mm:ss A")}
      </td>
      <td>{exhalveData.halve.imslaughter.numcow}</td>
      <td>{exhalveData.halve.beeftype.code}</td>
      <td>{exhalveData.halve.barcode}</td>
      <td>
        <Modalqrcode key={exhalveData.id} listhalve={exhalveData} />
      </td>
      <td>
        {exhalveData.halve.weightwarm ? exhalveData.halve.weightwarm : "-"}
      </td>
      <td>
        {exhalveData.halve.weightcool ? exhalveData.halve.weightcool : "-"}
      </td>
      <td>{exhalveData.storestatus.nameTH}</td>
      <td>{exhalveData.exporter}</td>
      <td>{exhalveData.user.name}</td>
    </tr>
  );
};

export default ListExport;
