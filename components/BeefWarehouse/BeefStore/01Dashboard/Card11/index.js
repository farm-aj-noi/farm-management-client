import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon9 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { QUERY_EXCHOPDAY } from "../../07Notify/05notify_export/chopday"
import { QUERY_EXENTRAILDAY } from "../../07Notify/05notify_export/entrailday"
import { QUERY_EXHALVEDAY } from "../../07Notify/05notify_export/halveday"
import { QUERY_EXLUMPDAY } from "../../07Notify/05notify_export/lumpday"
import { QUERY_EXQUARTERDAY } from "../../07Notify/05notify_export/quarterday"
import Link from "next/link";

const index = () => {
  const { data: halve } = useQuery(QUERY_EXHALVEDAY);
  const { data: quarter } = useQuery(QUERY_EXQUARTERDAY);
  const { data: lump } = useQuery(QUERY_EXLUMPDAY);
  const { data: chop } = useQuery(QUERY_EXCHOPDAY);
  const { data: entrail } = useQuery(QUERY_EXENTRAILDAY);
  return (
    <DivAlertCard style={{ backgroundColor: "#BF0000" }}>
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
          <Icon9 height="100px" weight="130px" />
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
              ? halve.CardExh.length +
              quarter.CardExq.length +
              lump.CardExl.length +
              chop.CardExc.length +
              entrail.CardExe.length
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
            นำออกซากเนื้อโค
          </a>
        </form>
      </div>
      <Link href="/beefwarehouse/beefstore/notify/notify_export">
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
