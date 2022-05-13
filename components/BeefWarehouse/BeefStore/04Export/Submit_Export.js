import React from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ExportFrom";

const Submit_Export = () => {
  return (
    <>
      <div>
        <form>
          <DivFromInsideLeft>
            บาร์โค้ด :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <Searchinput />
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            ผู้ขอเบิก :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <Searchinput />
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            สถานะเบิก :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <Searchinput />
            </div>
          </DivFromInsideLeft>
        </form>
        <div style={{ display: "inline-block", justifySelf: "right" }}>
          <Savebutton1>บันทึก</Savebutton1>
        </div>
      </div>
    </>
  );
};

export default Submit_Export;
