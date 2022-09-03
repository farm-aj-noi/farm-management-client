import React from "react";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  DivBase1,
} from "./GraphFrom";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";
import { statsDots } from 'react-icons-kit/icomoon/statsDots'
import { pieChart } from 'react-icons-kit/icomoon/pieChart'



import Graphexport from "./graphexport";
import Top10beef from "./Top10"
import Stat from "./graphexport/statistics";

export const index = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          รายละเอียดข้อมูลสถิติ
        </HeaderColor>
      </div>
      <DivBase1>
        <DivFrom>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={pieChart} />
            </div>
            10 อันดับรายการยอดนิยมเบิกออกซากโค (ประจำเดือน)
          </DivFromTop>
          <DivFromDown>
            <Top10beef />
          </DivFromDown>
        </DivFrom>
        <DivFrom style={{ marginTop: "20px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={statsDots} />
            </div>
            ราลละเอียดข้อมูลสถิติกราฟนำเข้า - เบิกออก
          </DivFromTop>
          <DivFromDown>
            <Graphexport />
          </DivFromDown>
        </DivFrom>
        <DivFrom style={{ marginTop: "20px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ราลละเอียดข้อมูลสถิตินำเข้า - เบิกออก - คงคลัง
          </DivFromTop>
          <DivFromDown>
            <Stat />
          </DivFromDown>
        </DivFrom>
      </DivBase1>
    </div>
  );
};

export default index;
