import React from "react";

import { DivAlertCard, StyleAlertCardDown } from "../StyleDashboard";
import { Icon3 } from "../IconStore";

import Icon from "react-icons-kit";
import { fileText } from "react-icons-kit/fa/fileText";

import Link from "next/link";

import { useQuery } from "@apollo/react-hooks";

import { STORELIST } from "../../05Store/01Store/index"

const index = () => {
  const { data } = useQuery(STORELIST, {
    variables: {
      type: "ก้อนเนื้อ"
    }
  })
  return (
    <DivAlertCard style={{ backgroundColor: "#F23403" }}>
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
          <Icon3 height="100px" weight="130px" />
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
            {data ? data.liststore.length : "0"}
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
            ยอดคงคลัง
            <br />
            ซากเนื้อโค (ก้อนเนื้อ)
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
