import React, { useState } from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ExportFrom";

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
          ผู้ขอเบิก :
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
                  width: "160px",
                  border: "1px solid #AFAFAF",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                <option value="">รายชื่อผู้ขอเบิก</option>
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
