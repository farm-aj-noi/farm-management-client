import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon1 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const CARD2 = gql`
  query CARD2($beeftype: String, $type: String) {
    liststore(beeftype: $beeftype, type: $type) {
      id
      barcode
      beeftype
    }
  }
`;

import Link from "next/link";
const index = () => {
  const { data: storedata } = useQuery(CARD2, {
    variables: {
      type: "ซากโคผ่าซีก",
    },
  });
  return (
    <DivAlertCard style={{ backgroundColor: "#D25300" }}>
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
          <Icon1 height="100px" weight="130px" />
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
             {storedata ? storedata.liststore.length : "0"}
          </div>
          <a
            style={{
              color: "#ffffff",
            }}
          ></a>
          <a style={{ color: "#ffffff", textAlign: "center" }}>
            ยอดคงคลัง
            <br />
            ซากเนื้อโค (ซ้ายขวา)
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
