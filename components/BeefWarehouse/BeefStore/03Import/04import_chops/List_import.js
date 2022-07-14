import React, { useState } from "react";
import dayjs from "dayjs";
import Modalqrcode from "../../12Qrcode/Import/imcqr";

function List_import({ imchop }) {
  const [imchopData, SetImchopData] = useState(imchop);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{imchopData.chop.imslaughter.namefarmer}</td>
      <td>{imchopData.chop.beeftype.nameTH}</td>
      <td>
        {dayjs(imchopData.importdate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(imchopData.importdate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{imchopData.chop.imslaughter.numcow}</td>
      <td>{imchopData.chop.beeftype.code}</td>
      <td>{imchopData.chop.barcode}</td>
      <td>
        <Modalqrcode key={imchopData.id} listchop={imchopData} />
      </td>
      <td>{imchopData.chop.weight}</td>
      <td>{imchopData.beefroom.roomname}</td>
      <td>{imchopData.shelf.shelfname}</td>
      <td>{imchopData.basket}</td>
      <td>{imchopData.chop.status.nameTH}</td>
      <td>{imchopData.user.name}</td>
    </tr>
  );
}

export default List_import;
