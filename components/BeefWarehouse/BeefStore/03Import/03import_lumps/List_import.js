import React, { useContext, useState, useRef, useEffect } from "react";
import { qrcode } from "react-icons-kit/icomoon/qrcode";
import { Icon } from "react-icons-kit";
import { ButtonQrcodeColor } from "../../../../utils/Button";
const tdstyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "5px",
  fontSize: "14px",
};

function List_import() {
  return (
    <>
      <tr style={{ textAlign: "center" }}>
        <td style={tdstyle}></td>
        <td style={tdstyle}></td>
        <td style={tdstyle}>{/* prod.halve.beeftype.nameTH */}</td>
        <td style={tdstyle}></td>
        <td style={tdstyle}></td>
        <td style={tdstyle}>{/* prod.halve.cows.cownum */}</td>
        <td style={tdstyle}>{/* prod.halve.beeftype.code */}</td>
        <td style={tdstyle}>{}</td>
        <td style={tdstyle}>
          <ButtonQrcodeColor>
            <Icon
              style={{
                verticalAlign: "text-bottom",
                color: "white",
              }}
              icon={qrcode}
              size={20}
            />
          </ButtonQrcodeColor>
        </td>
        <td style={tdstyle}>1</td>
        <td style={tdstyle}>{}</td>
        <td style={tdstyle}></td>
        <td style={tdstyle}></td>
        <td style={tdstyle}></td>
        <td style={tdstyle}></td>
        <td style={tdstyle}></td>
      </tr>
      
    </>
  );
}

export default List_import;
