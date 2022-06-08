import React from "react";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  Searchinput,
} from "../SettingFrom";
import { DivBase } from "../../../../../utils/divBase";
import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { iosSearchStrong } from "react-icons-kit/ionicons/iosSearchStrong";

import {
  Savebuttoncolor,
  Editbuttoncolor,
  Removebuttoncolor,
} from "../../../../../utils/buttonColor";

import Nav_seting from "../Nav_setting";
const index = () => {
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
          gridTemplateColumns: "1fr 200px 400px 1fr",
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
          <Nav_seting />
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
          {" "}
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ตั้งค่าตู้แช่
          </DivFromTop>
          <DivFromDown>
            {" "}
            <div>
              ชื่อตู้แช่ : {}
              <Searchinput
                type="text"
                id="day"
                name="day"
                style={{ width: "150px", textAlign: "center" }}
              />
              <Savebuttoncolor
                style={{
                  height: "38px",
                  width: " 50px",
                  marginLeft: "10px",
                }}
              >
                บันทึก
              </Savebuttoncolor>
            </div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </DivBase>
  );
};

export default index;
