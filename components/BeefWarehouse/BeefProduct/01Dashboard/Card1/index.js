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
    <DivAlertCard style={{ backgroundColor: "#0DE9BD" }}>
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
          fontWeight: 600,
          letterSpacing: "1px",
        }}
      >
        ยินดีต้อนรับสู่ระบบคลังผลิตภัณฑ์
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
            fontSize: "18px",
            padding: "15px 10px 0 0",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          {date}
        </div>
      </div>
    </DivAlertCard>
  );
};

export default index;
