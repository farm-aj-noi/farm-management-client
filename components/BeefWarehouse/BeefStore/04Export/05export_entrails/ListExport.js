import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Export/exeqr";
const ListExport = ({ exportentrail }) => {
  const [exentrailData, SetExEntrailData] = useState(exportentrail);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{exentrailData.entrail.imslaughter.namefarmer}</td>
      <td>
        {dayjs(exentrailData.exportdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(exentrailData.exportdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{exentrailData.entrail.imslaughter.numcow}</td>
      <td>{exentrailData.entrail.offal}</td>
      <td>{exentrailData.entrail.toe}</td>
      <td>{exentrailData.entrail.head}</td>
      <td>{exentrailData.entrail.skin}</td>
      <td>{exentrailData.entrail.liver}</td>
      <td>{exentrailData.entrail.fat}</td>
      <td>{exentrailData.entrail.onkale}</td>
      <td>{exentrailData.entrail.tail}</td>
      <td>{exentrailData.entrail.gallbladder}</td>
      <td>{exentrailData.entrail.scrap}</td>
      <td>{exentrailData.entrail.barcode}</td>
      <td>
        <Modalqrcode key={exentrailData.id} listentrail={exentrailData} />
      </td>
      <td>{}</td>
      <td>{}</td>
      <td>{}</td>
      <td>{exentrailData.user.name}</td>
    </tr>
  );
};

export default ListExport;
