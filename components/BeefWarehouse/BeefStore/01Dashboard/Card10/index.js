import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon8 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { QUERY_IMCHOPDAY } from "../../07Notify/04notify_import/chopday"
import { QUERY_IMENTRAILDAY } from "../../07Notify/04notify_import/entrailday"
import { QUERY_IMHALVEDAY } from "../../07Notify/04notify_import/halveday"
import { QUERY_IMLUMPDAY } from "../../07Notify/04notify_import/lumpday"
import { QUERY_IMQUARTERDAY } from "../../07Notify/04notify_import/quarterday"

import Link from "next/link";

const index = () => {
  const { data: halve } = useQuery(QUERY_IMHALVEDAY);
  const { data: quarter } = useQuery(QUERY_IMQUARTERDAY);
  const { data: lump } = useQuery(QUERY_IMLUMPDAY);
  const { data: chop } = useQuery(QUERY_IMCHOPDAY);
  const { data: entrail } = useQuery(QUERY_IMENTRAILDAY);
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
            {halve && quarter && lump && chop && entrail
              ? halve.CardImh.length +
              quarter.CardImq.length +
              lump.CardIml.length +
              chop.CardImc.length +
              entrail.CardIme.length
              : "0"}
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
            นำเข้าซากเนื้อโค
          </a>
        </form>
      </div>
      <Link href="/beefwarehouse/beefstore/notify/notify_import">
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
