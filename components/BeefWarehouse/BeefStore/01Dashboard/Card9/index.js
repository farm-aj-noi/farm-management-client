import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon7 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Link from "next/link";

export const QUERY_CARD9 = gql`
  query QUERY_CARD9 {
    Card9 {
      id
      name
    }
  }
`;

const CARDRE = gql`
query CardProcess {
  CardProcess {
    id
  }
}
`
const index = () => {
  const { data: dataCard9 } = useQuery(QUERY_CARD9);
  const { data: data1 } = useQuery(CARDRE);
  return (
    <DivAlertCard style={{ backgroundColor: "#028410" }}>
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
          <Icon7 height="100px" weight="130px" />
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
            {dataCard9 && data1 ? dataCard9.Card9.length + data1.CardProcess.length : "0"}
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
            จำนวนรายการ (วัน)
            <br />
            คำร้องขอเบิกซาก
          </a>
        </form>
      </div>
      <Link href="/beefwarehouse/beefstore/notify/notify_exportrequest">
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
