import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ImportFrom";

const create = () => {
  return (
    <div>
      <from>
        <DivFromInsideLeft>
          บาร์โค้ด :
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 15px",
            }}
          >
            <Searchinput name="barcode" />
          </div>
        </DivFromInsideLeft>
        <DivFromInsideLeft style={{ marginTop: "5px" }}>
          ตำแหน่ง :
          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr 15px",
            }}
          >
            <div style={{ display: "inline", width: "170px" }}>
              <select
                name="beefroom"
                id="beefroom"
                style={{
                  height: "35px",
                  width: "80px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px 0px 0px 4px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <option value="">ตู้แช่</option>
              </select>
              <select
                name="beefroom"
                id="beefroom"
                style={{
                  height: "35px",
                  width: "80px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "0px 4px 4px 0px",
                  borderLeft: "none",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <option value="">ชั้นวาง</option>
              </select>
            </div>
          </div>
        </DivFromInsideLeft>
        <div
          style={{
            display: "inline-block",
            justifySelf: "right",
            float: "right",
            paddingRight: "10px",
            paddingBottom: "10px",
          }}
        >
          <Savebutton1>บันทึก</Savebutton1>
        </div>
      </from>
    </div>
  );
};

export default create;
