import React from "react";
import { Table } from "react-bootstrap";
import {
  DivFrom,
  DivFromTop,
  DivFromDown,
  HeaderColor,
  DivBase1,
} from "./GraphFrom";

import { Icon } from "react-icons-kit";
import { list } from "react-icons-kit/fa/list";

import Graphimport from "./graphimport";
import Graphexport from "./graphexport";
import Top10beef from "./Top10"
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const TOP10BEEF = gql`
query Top10beef {
  top10beef {
    nameth
    nameen
    count
  }
}
`


export const index = () => {
  const { data } = useQuery(TOP10BEEF);
  console.log(data)
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <HeaderColor
          style={{
            width: "fit-content",
            height: "fit-content",
            padding: "5px 30px",
          }}
        >
          รายละเอียดข้อมูลสถิติ
        </HeaderColor>
      </div>
      <DivBase1>
        <DivFrom >
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            10 อันดับรายการยอดนิยมเบิกออกซากโค (ประจำเดือน)
          </DivFromTop>
          <DivFromDown>
            <Top10beef />
          </DivFromDown>
        </DivFrom>
        <DivFrom style={{ marginTop: "20px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ราลละเอียดข้อมูลสถิตินำเข้า
          </DivFromTop>
          <DivFromDown>
            <Graphimport />
          </DivFromDown>
        </DivFrom>
        <DivFrom style={{ marginTop: "20px" }}>
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            ราลละเอียดข้อมูลสถิติเบิกออก
          </DivFromTop>
          <DivFromDown>
            <Graphexport />
          </DivFromDown>
        </DivFrom>

      </DivBase1>
    </div>
  );
};

export default index;
