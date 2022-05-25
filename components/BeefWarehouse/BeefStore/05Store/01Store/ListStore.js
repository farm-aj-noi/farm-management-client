import React, { useState } from "react";
import {
  Barcodebuttoncolor,
  Editbuttoncolor,
} from "../../../../../utils/buttonColor";
import { Qrcodebutton, Editbutton } from "../../../../../utils/button";
import dayjs from "dayjs";

const ListStore = ({ Liststore }) => {
  const [ListStoreData, SetListStoreData] = useState(Liststore);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListStoreData.beeftype}</td>
      <td>{ListStoreData.cownum}</td>
      <td>{ListStoreData.code}</td>
      <td>{ListStoreData.barcode}</td>
      <td>
        <Barcodebuttoncolor>
          <Qrcodebutton />
        </Barcodebuttoncolor>
      </td>
      <td>{ListStoreData.weightwarm ? ListStoreData.weightwarm : "-"}</td>
      <td>{ListStoreData.weight ? ListStoreData.weight : "-"}</td>

      <td></td>
      <td></td>
      <td>{ListStoreData.beefroom ? ListStoreData.beefroom : "-"}</td>
      <td>-</td>
      <td>-</td>
      <td>{ListStoreData.status}</td>
      <td>-</td>
      <td>
        <Editbuttoncolor>
          <Editbutton />
        </Editbuttoncolor>
      </td>
    </tr>
  );
};

export default ListStore;
