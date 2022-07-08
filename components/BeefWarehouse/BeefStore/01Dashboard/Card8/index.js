import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon6 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import Link from "next/link";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const EXPC = gql`
  query EXPC {
    Card8c {
      id
      Expdate
    }
  }
`;
const EXPH = gql`
  query EXPIM {
    Card8h {
      id
      Expdate
    }
  }
`;

const EXPL = gql`
  query EXPL {
    Card8l {
      id
      Expdate
    }
  }
`;

const EXPQ = gql`
  query EXPQ {
    Card8q {
      id
      Expdate
    }
  }
`;

const EXPEN = gql`
  query EXPEN {
    Card8e {
      id
      Expdate
    }
  }
`;

const index = () => {
  const { data: expc } = useQuery(EXPC);
  const { data: exph } = useQuery(EXPH);
  const { data: expl } = useQuery(EXPL);
  const { data: expq } = useQuery(EXPQ);
  const { data: expen } = useQuery(EXPEN);
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
            {expc && exph && expl && expq && expen
              ? expc.Card8c.length +
                exph.Card8h.length +
                expl.Card8l.length +
                expq.Card8q.length +
                expen.Card8e.length
              : "0"}
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
      <Link href="/beefwarehouse/beefstore/notify/notify_date">
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
