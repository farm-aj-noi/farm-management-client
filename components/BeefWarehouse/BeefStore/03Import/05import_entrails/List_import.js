import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Import/imeqr";

const List_import = ({ imentrail }) => {
  const [imentrailData, SetImentrailData] = useState(imentrail);
  console.log(imentrailData);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{imentrailData.entrail.imslaughter.namefarmer}</td>
      <td>
        {dayjs(imentrailData.importdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(imentrailData.importdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{imentrailData.entrail.imslaughter.numcow}</td>
      <td>{imentrailData.entrail.offal}</td>
      <td>{imentrailData.entrail.toe}</td>
      <td>{imentrailData.entrail.head}</td>
      <td>{imentrailData.entrail.skin}</td>
      <td>{imentrailData.entrail.liver}</td>
      <td>{imentrailData.entrail.fat}</td>
      <td>{imentrailData.entrail.onkale}</td>
      <td>{imentrailData.entrail.tail}</td>
      <td>{imentrailData.entrail.gallbladder}</td>
      <td>{imentrailData.entrail.scrap}</td>
      <td>{imentrailData.entrail.barcode}</td>
      <td>
        <Modalqrcode key={imentrailData.id} listentrail={imentrailData} />
      </td>
      <td>{imentrailData.beefroom.roomname}</td>
      <td>{imentrailData.user.name}</td>
    </tr>
  );
};

export default List_import;
