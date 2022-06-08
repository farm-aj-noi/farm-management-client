import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon10 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import Link from "next/link";
const index = () => {
  return (
    <DivAlertCard style={{ backgroundColor: "#FF57A5" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            marginRight: "20px",
            paddingRight: "5px",
          }}
        >
          <Icon10 height="100px" weight="130px" />
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            marginRight: "18px",
          }}
        >
          <a
            style={{
              color: "#ffffff",
            }}
          ></a>
          <a style={{ color: "#ffffff", textAlign: "center" }}>
            10 อันดับรายการ
            <br />
            ยอดนิยมเบิกออกจำหน่าย
          </a>
        </form>
      </div>
      <Link href="">
        <StyleAlertCardDown style={{ marginTop: "7px" }}>
          แสดงรายละเอียด
          <div style={{ margin: "-3px 0px 0px auto" }}>
            <Icon size={20} icon={fileText} />
          </div>
        </StyleAlertCardDown>
      </Link>
    </DivAlertCard>
  );
};

export default index;
