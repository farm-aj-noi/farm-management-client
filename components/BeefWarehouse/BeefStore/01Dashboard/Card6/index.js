import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon4 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const CARD6 = gql`
  query CARD6 {
    listentrail {
      id
      barcode
      cownum
    }
  }
`;

const index = () => {
  const { data: storedata } = useQuery(CARD6);
  return (
    <DivAlertCard style={{ backgroundColor: "#BB0FBB" }}>
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
          <Icon4 height="100px" weight="130px" />
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
            {storedata ? storedata.listentrail.length : "0"}
          </div>
          <a
            style={{
              color: "#ffffff",
            }}
          ></a>
          <a style={{ color: "#ffffff", textAlign: "center" }}>
            ยอดคงคลัง
            <br />
            ซากเนื้อโค (ส่วนอื่น ๆ)
          </a>
        </form>
      </div>
      <Link href="/beefwarehouse/beefstore/Allstore/store">
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
