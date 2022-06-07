import React from "react";

import Sidemenu from "../Nav_notify";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import { DivFrom, DivFromTop, DivFromDown, HeaderColor } from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Listdate from "./ListDate";

export const QUERYLISTEXDATE = gql`
  query QUERYLISTEXDATE {
    listExpSetting {
      id
      totalday
    }
  }
`;

const index = () => {
  const { data } = useQuery(QUERYLISTEXDATE);
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          การแจ้งเตือน
        </HeaderColor>
      </div>
      <DivBase
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 900px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "50px",
          textAlign: "start",
          /*  width:"950px",
        margin:"auto" */
        }}
      >
        <Sidemenu Sidenumber={1} />
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการใกล้หมดอายุ
          </DivFromTop>
          <DivFromDown>
            <div
              style={{
                margin: "auto",
                minWidth: "100%",
                float: "right",
                marginBottom: "15px",
                height: "400px",
              }}
            ></div>
          </DivFromDown>
        </DivFrom>
      </DivBase>
    </>
  );
};

export default index;
