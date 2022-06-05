import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon9 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const CARD_EXHALVE = gql`
  query CARD_EXHALVE {
    CardExh {
      id
      barcode
    }
  }
`;

export const CARD_EXQUAR = gql`
  query CARD_EXQUAR {
    CardExq {
      id
      barcode
    }
  }
`;

export const CARD_EXLUMP = gql`
  query CARD_EXLUMP {
    CardExl {
      id
      barcode
    }
  }
`;

export const CARD_EXCHOP = gql`
  query CARD_EXCHOP {
    CardExc {
      id
      barcode
    }
  }
`;

export const CARD_EXENTRAIL = gql`
  query CARD_EXENTRAIL {
    CardExe {
      id
      barcode
    }
  }
`;

import Link from "next/link";
const index = () => {
  const { data: halve } = useQuery(CARD_EXHALVE);
  const { data: quarter } = useQuery(CARD_EXQUAR);
  const { data: lump } = useQuery(CARD_EXLUMP);
  const { data: chop } = useQuery(CARD_EXCHOP);
  const { data: entrail } = useQuery(CARD_EXENTRAIL);
  /*   console.log(entrail); */
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
          <a style={{ color: "#ffffff", textAlign: "center" }}>
            ยอดรายการ (วัน)
            <br />
            เบิกออกซากเนื้อโค
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
