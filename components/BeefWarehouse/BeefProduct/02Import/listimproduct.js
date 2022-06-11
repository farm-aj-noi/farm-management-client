import React, { useState } from "react";
import dayjs from "dayjs";

const listimproduct = ({ listim }) => {
  const [infoimproduct, setinfoimproduct] = useState(listim);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{infoimproduct.beefproduct.producttype.nameTH}</td>
      <td>
        {dayjs(infoimproduct.importdate)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(infoimproduct.importdate)
          .locale("th")
          .add(543, "year")
          .format("h:mm:ss A")}
      </td>
      <td>{infoimproduct.beefproduct.producttype.code}</td>
      <td>{infoimproduct.beefproduct.barcode}</td>
      <td></td>
      <td>{infoimproduct.beefproduct.weight}</td>
      <td>
        {dayjs(infoimproduct.beefproduct.MFG)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>
        {" "}
        {dayjs(infoimproduct.beefproduct.BBE)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>{infoimproduct.productroom.roomname}</td>
      <td>{infoimproduct.freezer.freezername}</td>
      <td>{infoimproduct.pbasket}</td>
      <td>{infoimproduct.user.name}</td>
    </tr>
  );
};

export default listimproduct;
