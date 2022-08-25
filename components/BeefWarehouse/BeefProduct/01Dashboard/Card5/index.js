import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon8 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Link from "next/link";

const CARD5 = gql`
  query CARD5 {
    cardImP {
      id
      barcode
    }
  }
`;

const index = () => {
  const { data } = useQuery(CARD5);
  return (
    <DivAlertCard style={{ backgroundColor: "#EF9813" }}>
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
          <Icon8 height="100px" weight="130px" />
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            marginRight: "18px",
          }}
        >
          <div
            style={{
              fontSize: "50px",
              height: "62px",
              fontWeight: 600,
            }}
          >
            {data ? data.cardImP.length : "0"}
          </div>
          <a
            style={{
              color: "#ffffff",
            }}
          ></a>
          <a style={{
            color: "#ffffff", textAlign: "center",
            fontWeight: 600,
            letterSpacing: "1px",
            fontSize: "14px",
          }}>
            ยอดรายการ (วัน)
            <br />
            นำเข้าผลิตภัณฑ์
          </a>
        </form>
      </div>
      <Link href="/beefwarehouse/beefproduct/notify/notify_import">
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
