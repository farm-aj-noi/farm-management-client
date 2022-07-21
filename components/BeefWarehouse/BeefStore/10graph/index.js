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

export const index = () => {
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
        <DivFrom>
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

        <Table
          striped
          bordered
          responsive
          hover
        >
          <thead>
            <tr style={{ textAlign: "center", fontSize: "18px" }}>
              <th>ประเภทซาก</th>
              <th>จำนวน</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>

      </DivBase1>
    </div>
  );
};

export default index;
