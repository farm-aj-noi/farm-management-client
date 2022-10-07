import React from "react";

import Sidemenu from "../Nav_notify";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import { DivBase } from "../../../../../utils/divBase";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  DivBase1,
} from "../NavFrom";

import { Table } from "react-bootstrap";

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import dayjs from "dayjs";

import Halveday from "./halveday";
import Quarterday from "./quarterday";
import Lumpday from "./lumpday";
import Chopday from "./chopday";
import Entrailday from "./entrailday";

const index = () => {
  return (
    <div style={{ marginTop: "100px" }}>
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
      <DivBase1
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 237.5px 1300px 1fr",
          gridRowGap: "15px",
          gridColumnGap: "50px",
          textAlign: "start",

          /*  width:"950px",
        margin:"auto" */
        }}
      >
        <Sidemenu Sidenumber={4} />
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "3",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Halveday />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "4",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Quarterday />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "5",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Lumpday />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "6",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Chopday />
        </DivFrom>
        <DivFrom
          style={{
            width: "100%",
            gridRowEnd: "7",
            gridColumnStart: "3",
            marginTop: "0px",
          }}
        >
          <Entrailday />
        </DivFrom>
      </DivBase1>
    </div>
  );
};

export default index;
