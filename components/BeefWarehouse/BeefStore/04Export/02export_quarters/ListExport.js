import React, { useState } from "react";
import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Export/exqqr";
const ListExport = ({ exquarter }) => {
  const [exquarterData, SetExQuarterData] = useState(exquarter);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{exquarterData.quarter.beeftype.nameTH}</td>
      <td>
        {dayjs(exquarterData.exportdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(exquarterData.exportdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{exquarterData.quarter.imslaughter.numcow}</td>
      <td>{exquarterData.quarter.beeftype.code}</td>
      <td>{exquarterData.quarter.barcode}</td>
      <td>
        <Modalqrcode key={exquarterData.id} listquarter={exquarterData} />
      </td>
      <td>{exquarterData.quarter.weight}</td>

      <td>{exquarterData.storestatus.nameTH}</td>
      <td>{exquarterData.exporter}</td>
      <td>{exquarterData.user.name}</td>
    </tr>
  );
};

export default ListExport;
