import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../../utils/button";
import dayjs from "dayjs";

const ListStore = ({ ListStore }) => {
  const [ListStoreData, SetListStoreData] = useState(ListStore);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListStoreData.beeftype}</td>
      <td>{ListStoreData.cownum}</td>
      <td>{ListStoreData.code}</td>
      <td>{ListStoreData.barcode}</td>
      <td></td>
      <td>{ListStoreData.weightwarm}</td>
      <td>{ListStoreData.weight}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{ListStoreData.status}</td>
      <td></td>
      <td></td>
    </tr>
  );
};

export default ListStore;
