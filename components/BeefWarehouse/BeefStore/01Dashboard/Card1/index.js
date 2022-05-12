import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Logobeefstore } from "../../../../../utils/image";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import Link from "next/link";

const index = () => {
  return (
    <DivAlertCard style={{ backgroundColor: "#0DE9BD" }}>
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
          }}
        >
          <Logobeefstore height="80px" weight="80px" />
        </div>
        <a
          style={{
            color: "#ffffff",
            marginLeft: "30px",
            marginTop: "15px",
          }}
        >
          วันที่ 22 เดือน พฤศจิกายน
          <br /> ปี พ.ศ.2565 เวลา 14.00 น.
        </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        <h
          style={{
            backgroundColor: "#FEF5DB",
            padding: "5px",
            color: "#AC4B75",
            width: "260px",
            textAlign: "center",
          }}
        >
          ยินดีต้อนรับสู่ระบบคลังชิ้นเนื้อ
        </h>
      </div>

      {/*  <Link href="">
        <StyleAlertCardDown>
          แสดงรายละเอียด
          <div style={{ margin: "-3px 0px 0px auto" }}>
            <Icon size={20} icon={fileText} />
          </div>
        </StyleAlertCardDown>
      </Link> */}
    </DivAlertCard>
  );
};

export default index;
