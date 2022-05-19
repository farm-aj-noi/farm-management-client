import React, { useState } from "react";
import { Barcodebuttoncolor } from "../../../../utils/buttonColor";
import { Qrcodebutton } from "../../../../utils/button";
import dayjs from "dayjs";

const List_chill = ({ listchill }) => {
  const [ListChillInfo, SetListChillInfo] = useState(listchill);
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{ListChillInfo.user.name}</td>
      <td>
        {dayjs(ListChillInfo.chilldate).add(543, "year").format("DD/MM/YYYY")}
      </td>
      <td>
        {dayjs(ListChillInfo.chilldate).add(543, "year").format("h:mm:ss A")}
      </td>
      <td>{ListChillInfo.halve.beeftype.nameTH}</td>
      <td>{ListChillInfo.chillday}</td>
      <td>{ListChillInfo.halve.imslaughter.numcow}</td>
      <td>{ListChillInfo.halve.beeftype.code}</td>
      <td>{ListChillInfo.halve.barcode}</td>
      <td>
        <Barcodebuttoncolor>
          <Qrcodebutton />
        </Barcodebuttoncolor>
      </td>
      <td>{ListChillInfo.halve.weightwarm}</td>
      <td>{ListChillInfo.chillroom.roomnum}</td>
      <td>{ListChillInfo.storestatus.nameTH}</td>
    </tr>
  );
};

export default List_chill;
