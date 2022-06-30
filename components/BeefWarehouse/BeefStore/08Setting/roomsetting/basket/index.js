import React from "react";
import { DivFrom, HeaderColor, DivBase1 } from "../../SettingFrom";

import Nav_setting from "../../Nav_setting";

import Basket from "./basket";
import Basket1 from "./basket1";

function index() {
  return (
    <DivBase1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          การตั้งค่า
        </HeaderColor>
      </div>
      <DivBase1
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 700px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "20px",
          textAlign: "start",
        }}
      >
        <DivFrom
          style={{
            width: "100%",
            marginTop: "0",
            gridRowStart: "2",
            gridRowEnd: "5",
            gridColumnStart: "2",
          }}
        >
          <Nav_setting />
        </DivFrom>
        <DivFrom
          style={{
            width: "800px",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Basket />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "3",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Basket1 />
        </DivFrom>
      </DivBase1>
    </DivBase1>
  );
}

export default index;
