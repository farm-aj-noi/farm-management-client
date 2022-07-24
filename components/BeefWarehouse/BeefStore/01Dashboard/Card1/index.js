import React, { useState, useEffect, useContext } from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Logobeefstore } from "../../../../../utils/image";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import Link from "next/link";

import dayjs from "dayjs";
import "dayjs/locale/th";

const index = () => {
  const [date, setDate] = useState();
  const datetest = () => {
    setDate(
      dayjs()
        .locale("th")
        .add(543, "year")
        .format("วันที่ D MMMM พ.ศ.YYYY เวลา hh:mm น.")
    );
  };

  useEffect(() => {
    const interval = setInterval(datetest, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <DivAlertCard style={{ backgroundColor: "#6db909" }}>
      {/*  <div
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
            marginLeft: "40px",
            marginTop: "15px",
            fontSize: "19px",
            textAlign: "right",
          }}
        >
          {date}
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
      </div> */}
      <div
        style={{
          position: "absolute",
          margin: "110px 0 0 15px",
          width: "90%",
          textAlign: "center",
          background: "#FEF5DB",
          padding: "6px 0px 0px 0",
          color: "#AC4B75",
          borderRadius: "2px",
          height: "32px",
          
        }}
      >
        ยินดีต้อนรับสู่ระบบคลังชิ้นเนื้อ
      </div>
      <div
        style={{
          height: "75%",
          padding: "10px 10px 0px 10px",
          display: "inline-flex",
          width: "100%",
        }}
      >
        <div style={{ width: "fit-content" }}>
          {" "}
          <Logobeefstore height="80px" weight="80px" />
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "20px",
            padding: "15px 10px 0 0",
          }}
        >
          {date}
        </div>
      </div>
    </DivAlertCard>
  );
};

export default index;
