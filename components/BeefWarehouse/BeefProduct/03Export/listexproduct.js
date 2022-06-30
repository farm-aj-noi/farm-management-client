import React, { useState } from "react";
import dayjs from "dayjs";
import Qrcode from "./Qrcode";

const listexproduct = ({ listex }) => {
  const [infoexproduct, setinfoexproduct] = useState(listex);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{infoexproduct.beefproduct.producttype.nameTH}</td>
      <td>
        {dayjs(infoexproduct.exportdate)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(infoexproduct.exportdate)
          .locale("th")
          .add(543, "year")
          .format("h:mm:ss A")}
      </td>
      <td>{infoexproduct.beefproduct.producttype.code}</td>
      <td>{infoexproduct.beefproduct.barcode}</td>
      <td>
        <Qrcode key={infoexproduct.id} exlist={infoexproduct} />
      </td>
      <td>{infoexproduct.beefproduct.weight}</td>
      <td>
        {dayjs(infoexproduct.beefproduct.MFG)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(infoexproduct.beefproduct.BBE)
          .locale("th")
          .add(543, "year")
          .format("DD/MM/YYYY")}
      </td>
      <td>{infoexproduct.name}</td>
      <td>{infoexproduct.user.name}</td>
    </tr>
  );
};

export default listexproduct;
