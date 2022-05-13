import React from "react";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "./ChillFrom";

const Submit_Chill = () => {
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
          ชื่อผู้บ่ม :
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
          วันที่บ่ม :
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
            ระยะเวลาบ่ม :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <div style={{ display: "inline", width: "170px" }}>
                <select
                  style={{
                    height: "35px",
                    width: "160px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <option value="">7 วันมาตรฐาน</option>
                  <option value="">อื่น ๆ</option>
                </select>
              </div>
            </div>
          </DivFromInsideLeft>
          <DivFromInsideLeft>
            ห้องบ่ม :
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

export default Submit_Chill;
