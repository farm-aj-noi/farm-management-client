import React, { useState } from "react";
import {
  Editbuttoncolor,
} from "../../../../../utils/buttonColor";
import { Editbutton } from "../../../../../utils/button";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Modalqrcode from "../../12Qrcode/store";

const ListStore = ({ Liststore }) => {
  const [ListStoreData, SetListStoreData] = useState(Liststore);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListStoreData.beeftype}</td>
      <td>{ListStoreData.cownum}</td>
      <td>{ListStoreData.code}</td>
      <td>{ListStoreData.barcode}</td>
      <td>
        <Modalqrcode key={ListStoreData.id} liststore={ListStoreData} />
      </td>
      <td>{ListStoreData.weightwarm ? ListStoreData.weightwarm : "-"}</td>
      <td>{ListStoreData.weight ? ListStoreData.weight : "-"}</td>

      <td>
        {dayjs(ListStoreData.Expdate)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td></td>
      <td>{ListStoreData.beefroom ? ListStoreData.beefroom : "-"}</td>
      <td>{ListStoreData.shelf ? ListStoreData.shelf : "-"}</td>
      <td>{ListStoreData.basket ? ListStoreData.basket : "-"}</td>
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
