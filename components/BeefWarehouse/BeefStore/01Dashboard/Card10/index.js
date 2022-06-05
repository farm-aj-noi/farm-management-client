import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon8 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

export const CARD_IMHALVE = gql`
  query CARD_IMHALVE {
    CardImh {
      id
      barcode
    }
  }
`;

export const CARD_IMQUAR = gql`
  query CARD_IMQUAR {
    CardImq {
      id
      barcode
    }
  }
`;

export const CARD_IMLUMP = gql`
  query CARD_IMQUAR {
    CardIml {
      id
      barcode
    }
  }
`;

export const CARD_IMCHOP = gql`
  query CARD_IMQUAR {
    CardImc {
      id
      barcode
    }
  }
`;

export const CARD_ENTRAIL = gql`
  query CARD_IMQUAR {
    CardIme {
      id
      barcode
    }
  }
`;

import Link from "next/link";

const index = () => {
  const { data: halve } = useQuery(CARD_IMHALVE);
  const { data: quarter } = useQuery(CARD_IMQUAR);
  const { data: lump } = useQuery(CARD_IMLUMP);
  const { data: chop } = useQuery(CARD_IMCHOP);
  const { data: entrail } = useQuery(CARD_ENTRAIL);
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
          <a style={{ color: "#ffffff", textAlign: "center" }}>
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
