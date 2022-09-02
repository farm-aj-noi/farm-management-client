
import { Icon } from "react-icons-kit";
import { DivCenter, TableForm, TableHead } from "../Styleclass/Table";
import { Icon5 } from "../../../utils/Logograde";
import Link from "next/link";
import { DivAlertCard, StyleAlertCardDown } from "./StyleDashboard";
import React from "react";

import { DivBase } from "../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown } from "./StyleDashboard";
import { dashboard } from "react-icons-kit/fa/dashboard";

import System1 from "./System1";
import System2 from "./System2";

function Index() {
      
    return (
      <div>
      <DivCenter
        style={{
          fontSize: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "5px",
          }}
        >
        </div>
        <Icon5 height="70px" weight="70px" />
        การตั้งค่า
      </DivCenter>

      <DivBase style={{ marginTop: "100px" }}>
      <DivFrom style={{width:"650px"}}>
        <DivFromTop>
          <div style={{ margin: "-3px 5px 0px 0px" }}>
            <Icon size={20} icon={dashboard} />
          </div>
          การตั้งค่า
        </DivFromTop>
        <DivFromDown
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr ",
            gridGap: "20px",
          }}
        >
          <System1 />
          <System2 />

        </DivFromDown>
      </DivFrom>
    </DivBase>
    </div>
  );
};


export default Index;
