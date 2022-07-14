import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon6 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CARD2 = gql`
  query CARD2 {
    card8product {
      id
      barcode
    }
  }
`;

const index = () => {
  const { data: datacard2 } = useQuery(CARD2);
  return (
    <DivAlertCard style={{ backgroundColor: "#979797" }}>
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
          <Icon6 height="100px" weight="130px" />
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
            }}
          >
            {datacard2 ? datacard2.card8product.length : "0"}
          </div>
          <a
            style={{
              color: "#ffffff",
            }}
          ></a>
          <a style={{ color: "#ffffff", textAlign: "center" }}>
            จำนวนรายการ
            <br />
            วันใกล้หมดอายุ
          </a>
        </form>
      </div>
      <Link href="/beefwarehouse/beefproduct/notify/notify_date">
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
