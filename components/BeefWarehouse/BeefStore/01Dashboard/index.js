import React from "react";

import { DivBase } from "../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown } from "./StyleDashboard";

import { Icon } from "react-icons-kit";
import { dashboard } from "react-icons-kit/fa/dashboard";

import Card1 from "./Card1";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Card4 from "./Card4";
import Card5 from "./Card5";
import Card6 from "./Card6";
import Card7 from "./Card7";
import Card8 from "./Card8";
import Card9 from "./Card9";
import Card10 from "./Card10";
import Card11 from "./Card11";
import Card12 from "./Card12";

const index = () => {
  return (
    <DivBase>
      <DivFrom>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={dashboard} />
          </div>
          กระดานแจ้งเตือนแสดงรายละเอียด
        </DivFromTop>
        <DivFromDown
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gridGap: "20px",
          }}
        >
          <Card1 />
          <Card2 />
          <Card3 />
          <Card4 />
          <Card5 />
          <Card6 />
          <Card7 />
          <Card8 />
          <Card9 />
          <Card10 />
          <Card11 />
          <Card12 />
        </DivFromDown>
      </DivFrom>
    </DivBase>
  );
};

export default index;
