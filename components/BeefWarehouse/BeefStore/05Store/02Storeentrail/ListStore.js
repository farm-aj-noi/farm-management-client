import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";

const ListStore = ({ Listentrail }) => {
  const [ListEntrailData, SetListStoreData] = useState(Listentrail);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListEntrailData.namefarmer}</td>
      <td>{ListEntrailData.cownum}</td>
      <td>{ListEntrailData.offal}</td>
      <td>{ListEntrailData.toe}</td>
      <td>{ListEntrailData.head}</td>
      <td>{ListEntrailData.skin}</td>
      <td>{ListEntrailData.liver}</td>
      <td>{ListEntrailData.fat}</td>
      <td>{ListEntrailData.onkale}</td>
      <td>{ListEntrailData.tail}</td>
      <td>{ListEntrailData.gallbladder}</td>
      <td>{ListEntrailData.scrap}</td>
      <td>{ListEntrailData.barcode}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default ListStore;
