import React, { useState } from "react";
import dayjs from "dayjs";
import { Editbutton } from "../../../../utils/button";
import { Editbuttoncolor } from "../../../../utils/buttonColor";
import Qrcode from "./Qrcode";

const liststore = ({ listall }) => {
  const [infoall, setinfoall] = useState(listall);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{infoall.producttype}</td>
      <td>{infoall.code}</td>
      <td>{infoall.barcode}</td>
      <td>
        <Qrcode key={infoall.id} alllist={infoall} />
      </td>
      <td>{infoall.weight}</td>
      <td>
        {dayjs(infoall.MFG).locale("th").add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(infoall.BBE).locale("th").add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>{infoall.productroom}</td>
      <td>{infoall.freezer}</td>
      <td>{infoall.pbasket}</td>
      <td>-</td>
      <td>
        <Editbuttoncolor>
          <Editbutton />
        </Editbuttoncolor>
      </td>
    </tr>
  );
};

export default liststore;
