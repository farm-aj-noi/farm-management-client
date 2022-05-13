import React from "react";

import { Savebuttoncolor } from "../../../../../utils/buttonColor";

import { DivFromInsideLeft, Searchinput, Savebutton1 } from "../ImportFrom";

const Create_Import = () => {
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
            ตำแหน่ง :
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr 15px",
              }}
            >
              <div style={{ display: "inline", width: "170px" }}>
                <select
                  name="room"
                  id="room"
                  style={{
                    height: "35px",
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "4px 0px 0px 4px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <option value="">ห้อง</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
                <select
                  name="shelf"
                  id="shelf"
                  style={{
                    height: "35px",
                    width: "50px",
                    border: "1px solid #AFAFAF",
                    borderLeft: "none",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  <option value="">ชั้น</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
                <select
                  name="bucket"
                  id="bucket"
                  style={{
                    height: "35px",
                    width: "60px",
                    border: "1px solid #AFAFAF",
                    borderRadius: "0px 4px 4px 0px",
                    borderLeft: "none",
                    textAlign: "center",
                    fontSize: "14px",
                    marginRight: "10px",
                  }}
                >
                  <option value="">ตะกร้า</option>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
              </div>
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

export default Create_Import;
