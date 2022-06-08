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

const index = () => {
  return (
    <div>
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
          gridTemplateColumns: "1fr 237.5px 1000px 1fr",
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
          <DivFromTop>
            <div style={{ margin: "-3px 5px 0px 0px" }}>
              <Icon size={20} icon={list} />
            </div>
            รายการเบิกผลิตภัณฑ์ (วัน)
          </DivFromTop>
          <DivFromDown>
            {" "}
            <Table striped bordered responsive hover style={{ margin: "auto" }}>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>ประเภทสินค้า</th>
                  <th>วันที่เบิกออก</th>
                  <th>เวลา</th>
                  <th>รหัสสินค้า</th>
                  <th>รหัสบาร์โค้ด</th>
                  <th>คิวอาร์โค้ด</th>
                  <th>น้ำหนัก</th>
                  <th>วันที่ผลิต</th>
                  <th>วันหมดอายุ</th>
                  <th>ผู้ขอเบิก</th>
                  <th>ผู้เบิกออก</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ textAlign: "center" }}>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </Table>
          </DivFromDown>
        </DivFrom>
      </DivBase1>
    </div>
  );
};

export default index;
