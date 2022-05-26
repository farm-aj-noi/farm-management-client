import React from "react";

import { DivFrom, HeaderColor } from "../SettingFrom";

import { DivBase } from "../../../../../utils/divBase";

import Nav_setting from "../Nav_setting";

import Basket from "./basket";
import Room from "./room";
import Shelf from "./shelf";

function index() {
  return (
    <DivBase>
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
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 200px 850px 1fr",
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
            width: "100%",
            gridRowStart: "2",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Room />
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
          <Shelf />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowStart: "4",
            gridRowEnd: "4",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Basket />
        </DivFrom>
      </DivBase>
    </DivBase>
  );
}

export default index;
